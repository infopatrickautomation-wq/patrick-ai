/**
 * Invio dei form di contatto.
 *
 * Il sito è statico (Vite su Vercel), quindi non ha un server proprio a cui
 * mandare i messaggi. I form passano da Web3Forms, che inoltra alla casella
 * di Patrick. La chiave è pubblica per progetto e non dà accesso a nulla:
 * serve solo a dire a Web3Forms a quale indirizzo consegnare. Sta nel bundle
 * del browser perché è lì che va usata (il piano gratuito accetta chiamate
 * solo dal client, non da server).
 *
 * PER ATTIVARE: prendere la chiave su https://web3forms.com inserendo
 * info.patrickautomation@gmail.com, e incollarla qui sotto.
 * Finché la chiave non c'è, i form NON dicono che hanno inviato: mostrano
 * l'indirizzo email come alternativa. Meglio un ripiego onesto di un finto
 * "messaggio inviato".
 */
export const WEB3FORMS_ACCESS_KEY = '';

export const CONTACT_EMAIL = 'info.patrickautomation@gmail.com';

export const FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

export const isFormDeliveryConfigured = () => WEB3FORMS_ACCESS_KEY.trim().length > 0;
