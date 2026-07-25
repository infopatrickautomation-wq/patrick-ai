import { useState, type FormEvent } from 'react';
import {
  CONTACT_EMAIL,
  FORMS_ENDPOINT,
  WEB3FORMS_ACCESS_KEY,
  isFormDeliveryConfigured,
} from '../config/forms';

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
 * Il campo `botcheck` è una trappola per i bot: è nascosto agli occhi, quindi un
 * umano non lo compila mai. Se arriva pieno, Web3Forms scarta il messaggio.
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

    if (!isFormDeliveryConfigured()) {
      setStatus('error');
      setErrorMessage(
        `L'invio dal sito non è ancora attivo. Scrivimi direttamente a ${CONTACT_EMAIL} e ti rispondo io.`
      );
      return;
    }

    setStatus('sending');
    setErrorMessage('');

    const data = new FormData(form);
    data.append('access_key', WEB3FORMS_ACCESS_KEY);
    data.append('subject', subject);
    data.append('from_name', 'Sito PatrickAI');

    try {
      const res = await fetch(FORMS_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
      });
      const json = await res.json().catch(() => ({ success: false, message: '' }));

      if (res.ok && json.success) {
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
