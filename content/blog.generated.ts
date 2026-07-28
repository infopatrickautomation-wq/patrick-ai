// FILE GENERATO da scripts/blog-build.mjs — non modificare a mano.
// Sorgente: content/blog/*.md. Rigenera con: npm run blog:build

export interface BlogPost {
  title: string;
  slug: string;
  /** ISO YYYY-MM-DD */
  date: string;
  description: string;
  tags: string[];
  image: string;
  /** testo alternativo; vuoto = immagine decorativa */
  imageAlt: string;
  /** immagine generata con AI: va indicata, AI Act art. 50 */
  imageAi: boolean;
  author: string;
  readingMinutes: number;
  /** corpo dell'articolo già convertito da markdown */
  html: string;
}

export const POSTS: BlogPost[] = [
  {
    "title": "I contatti che non ti hanno risposto non sono persi",
    "slug": "contatti-che-non-rispondono",
    "date": "2026-07-28",
    "description": "Un contatto che non risponde di solito non ha detto di no: ha smesso di leggere. Come si riprende in mano una lista ferma, senza comprare traffico nuovo.",
    "tags": [
      "riattivazione lead",
      "whatsapp",
      "automazioni"
    ],
    "image": "/blog/contatti-che-non-rispondono.png",
    "imageAlt": "Uno smartphone su una scrivania al buio, con la notifica di un messaggio non letto",
    "imageAi": true,
    "author": "Patrick",
    "readingMinutes": 4,
    "html": "<p>Un contatto che non ti ha risposto non ti ha detto di no. Nella maggior parte dei casi ha\nchiesto un preventivo, ha ricevuto la risposta, e poi è successa la vita: un altro\npreventivo, le ferie, un rinvio. Il contatto è ancora lì e il problema che aveva non si è\nrisolto da solo. La lista dei contatti fermi è il posto più economico dove cercare lavoro,\nperché quelle persone ti hanno già cercato una volta.</p>\n<p>La domanda vera non è se riscrivere. È <strong>quando</strong> riscrivere, <strong>cosa</strong> scrivere, e come\nfarlo senza passare la giornata a copiare messaggi.</p>\n<h2>Perché un contatto smette di rispondere</h2>\n<p>Nella pratica vedo quasi sempre tre motivi, e nessuno dei tre è &quot;non mi interessa più&quot;:</p>\n<ol>\n<li><strong>Ha chiesto a più fornitori nello stesso giorno.</strong> Ha risposto al primo che si è fatto\nvivo con qualcosa di concreto, non al più bravo.</li>\n<li><strong>Il momento non era quello.</strong> Voleva capire i costi per decidere fra sei mesi, e sei\nmesi sono passati.</li>\n<li><strong>Il messaggio si è perso.</strong> Mail finita in promozioni, WhatsApp letto in coda alla\ncassa e mai più riaperto.</li>\n</ol>\n<p>In tutti e tre i casi la conversazione si è fermata per inerzia. Non serve convincere\nnessuno: serve tornare a farsi vedere nel momento in cui la persona può leggere.</p>\n<h2>Ogni quanto si può riscrivere senza dare fastidio</h2>\n<p>Non esiste un numero magico, ma esiste un criterio: <strong>riscrivi quando hai qualcosa da\ndire, non quando hai bisogno di vendere.</strong> Un messaggio che dice &quot;ci sono novità sulla\nzona che stavi guardando&quot; è benvenuto. Un messaggio che dice &quot;ci sei ancora?&quot; è un\nsollecito, e i solleciti stancano.</p>\n<p>Nella pratica: un primo messaggio a distanza di qualche settimana dall&#39;ultimo contatto, e\npoi solo quando cambia qualcosa di concreto. Chi chiede di non essere più contattato esce\nsubito dalla lista, senza discutere. Questo non è cortesia, è un obbligo di legge, ed è\nanche il modo per tenere pulita la lista di chi vale la pena ricontattare.</p>\n<h2>Il vincolo tecnico su WhatsApp che quasi nessuno racconta</h2>\n<p>Se la riattivazione la fai su WhatsApp con le API ufficiali di Meta, c&#39;è una regola che\ncambia il modo in cui va costruito tutto: <strong>puoi scrivere quello che vuoi solo entro 24 ore\ndall&#39;ultimo messaggio del cliente.</strong> Fuori da quella finestra puoi mandare soltanto un\nmessaggio da un modello approvato in anticipo da Meta.</p>\n<p>È un dettaglio che sembra burocratico e invece decide l&#39;architettura: il primo messaggio a\nun contatto fermo da mesi sarà sempre un modello approvato. La conversazione libera comincia\nsolo dopo che la persona ha risposto. Chi ti promette un sistema che &quot;manda messaggi\npersonalizzati a tutti quando vuoi&quot; o non usa le API ufficiali, o non te l&#39;ha detto.</p>\n<p>Al momento in cui scrivo, luglio 2026, questa è la regola in vigore. È il tipo di cosa che\nconviene verificare sulla documentazione di Meta prima di firmare qualcosa, perché cambia\nnel tempo.</p>\n<h2>Cosa scrivere nel primo messaggio</h2>\n<p>Tre cose, in questo ordine:</p>\n<ul>\n<li><strong>Chi sei e perché ti stai facendo vivo.</strong> &quot;Ci eravamo sentiti a marzo per l&#39;appartamento\nin zona stazione.&quot;</li>\n<li><strong>Un motivo concreto, non un saluto.</strong> Qualcosa che è cambiato: una disponibilità nuova,\nun prezzo, una data.</li>\n<li><strong>Una domanda sola, facile da rispondere.</strong> &quot;Stai ancora cercando in quella zona?&quot; si\nrisponde con una parola. &quot;Come possiamo aiutarti?&quot; no.</li>\n</ul>\n<p>Quello che non funziona: il messaggio uguale per tutti, riconoscibile a occhio. Se una\npersona capisce di essere in un elenco, smette di leggere. Il messaggio deve contenere\nqualcosa che riguarda solo lei, ed è il motivo per cui la riattivazione parte sempre dai\ndati che hai già: cosa aveva chiesto, quando, e in che zona.</p>\n<h2>Farlo a mano o automatizzarlo</h2>\n<p>Su venti contatti si fa a mano, e conviene farlo a mano: si impara cosa risponde la gente.\nIl problema arriva dopo. Su qualche centinaio di contatti la giornata non basta, i messaggi\ndiventano tutti uguali per stanchezza, e chi risponde di sera non riceve niente fino al\ngiorno dopo.</p>\n<p>Da lì in avanti serve un sistema che faccia tre cose: manda i messaggi uno a uno con dentro\ni dati di quella persona, tiene la conversazione quando qualcuno risponde, e passa la palla\na te quando il contatto è pronto. Il resto (dashboard, statistiche, integrazioni) è\naccessorio. Se il sistema non fa bene queste tre cose, le altre non servono.</p>\n<h2>Da dove partire domani mattina</h2>\n<p>Apri il foglio dove tieni i contatti e filtra quelli fermi da più di tre mesi. Non tutta la\nlista: prendi i venti più recenti fra quelli, che sono i più tiepidi. Scrivi a mano, uno per\nuno, con un motivo concreto per ognuno. Segna chi risponde e cosa risponde.</p>\n<p>Dopo venti messaggi sai due cose che nessun articolo può dirti: quale motivo fa rispondere\nla tua gente, e quanto tempo ti costa. Con quelle due informazioni si decide se ha senso\nautomatizzare, e soprattutto <strong>cosa</strong> automatizzare.</p>\n<p>Se arrivi a quel punto e vuoi vedere come funzionerebbe sulla tua lista, prenota una call\ndi quindici minuti: mi racconti come lavori, ti dico se ha senso o se conviene continuare a\nmano.</p>\n"
  }
];

export const getPost = (slug: string): BlogPost | undefined =>
  POSTS.find((p) => p.slug === slug);
