/**
 * Invio dei form di contatto.
 *
 * Il sito è statico (Vite su Vercel) e non ha un backend proprio, quindi il
 * recapito dei messaggi passa da un servizio esterno. Si usa FormSubmit.
 *
 * Perché non Web3Forms (provato prima, 2026-07-25): con la chiave attiva le
 * richieste tornavano "riuscite" ma in casella non arrivava niente, e dal nostro
 * server le chiamate venivano proprio rifiutate come "traffico server-side", il
 * che rendeva impossibile verificare. FormSubmit invece è stato provato davvero:
 * risponde con `access-control-allow-origin: *`, accetta multipart e la mail
 * arriva in casella in una ventina di secondi.
 *
 * L'indirizzo sta nel bundle del browser, ed è una scelta consapevole: è lo
 * stesso indirizzo già scritto in chiaro nel footer e nella sezione contatti del
 * sito, quindi non si espone niente di nuovo. Se in futuro arrivasse spam,
 * FormSubmit fornisce un alias criptato da usare al posto dell'indirizzo: si
 * cambia solo la costante qui sotto.
 */
export const CONTACT_EMAIL = 'info.patrickautomation@gmail.com';

/** Alias FormSubmit (stringa criptata) se un giorno si vuole nascondere l'indirizzo. */
const FORMSUBMIT_TARGET = CONTACT_EMAIL;

export const FORMS_ENDPOINT = `https://formsubmit.co/ajax/${FORMSUBMIT_TARGET}`;
