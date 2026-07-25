import { useState, type FormEvent } from 'react';
import { CONTACT_EMAIL, FORMS_ENDPOINT } from '../config/forms';

export type FormStatus = 'idle' | 'sending' | 'sent' | 'error';

/**
 * Gestisce l'invio dei form di contatto.
 *
 * Il punto importante è che lo stato "inviato" arriva SOLO dopo che il servizio
 * ha confermato. Prima i form mostravano "Richiesta inviata" sempre, anche senza
 * spedire niente: chi scriveva restava convinto di aver contattato Patrick e il
 * messaggio spariva. Se la consegna fallisce, qui si dice che è fallita e si
 * mostra l'indirizzo email come alternativa.
 *
 * Si invia un FormData e non un JSON di proposito: con `Content-Type:
 * application/json` il browser fa prima una richiesta di preflight, e se quella
 * viene rifiutata il messaggio non parte nemmeno. Il FormData rientra invece
 * nelle richieste "semplici", che partono sempre.
 *
 * Il campo `_honey` è la trappola per i bot di FormSubmit: è nascosto agli
 * occhi, quindi un umano non lo compila mai. Se arriva pieno, il messaggio viene
 * scartato senza avvisare il mittente.
 */
export function useContactForm(subject: string) {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const reset = () => {
    setStatus('idle');
    setErrorMessage('');
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    setStatus('sending');
    setErrorMessage('');

    const data = new FormData(form);
    data.append('_subject', subject);
    data.append('_template', 'table');
    data.append('_captcha', 'false');

    // Così rispondere alla notifica scrive direttamente al lead, invece che al
    // servizio: senza questo il tasto Rispondi porta a un indirizzo inutile.
    const email = data.get('email');
    if (typeof email === 'string' && email) data.append('_replyto', email);

    try {
      const res = await fetch(FORMS_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
      });
      const json = await res.json().catch(() => ({}));

      // FormSubmit risponde con la stringa "true"/"false", non con un booleano
      if (res.ok && String(json.success) === 'true') {
        setStatus('sent');
        form.reset();
        return;
      }

      setStatus('error');
      setErrorMessage(
        `Non sono riuscito a inviare il messaggio. Riprova, oppure scrivimi a ${CONTACT_EMAIL}.`
      );
    } catch {
      // rete assente, offline, blocco del browser
      setStatus('error');
      setErrorMessage(
        `Il messaggio non è partito, controlla la connessione. Se il problema resta, scrivimi a ${CONTACT_EMAIL}.`
      );
    }
  };

  return { status, errorMessage, handleSubmit, reset };
}
