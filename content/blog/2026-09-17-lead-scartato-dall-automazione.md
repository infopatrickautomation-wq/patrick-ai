---
title: Il lead che l'automazione ha scartato non te lo dirà nessuno
slug: lead-scartato-dall-automazione
date: 2026-09-17
description: Un filtro che qualifica i lead sbaglia in due modi. Quando fa passare un contatto inutile lo vedi subito. Quando scarta un cliente buono non lo vedi mai, perché l'automazione è costruita per non farlo arrivare da te.
tags: [automazioni, lead, qualificazione, crm, pmi]
image: /blog/lead-scartato-dall-automazione.png
imageAlt: Una ciotola di legno vuota, posata di lato su una stoffa di lino verde scuro
imageAi: true
author: Patrick
---

Un filtro automatico che decide quali contatti meritano una risposta sbaglia in due direzioni.
Quando fa passare un contatto che non valeva niente, lo vedi: ti arriva una notifica, apri la
scheda, perdi dieci minuti e ti lamenti del filtro. Quando scarta una persona che voleva
comprare, non vedi niente. Il contatto non arriva da te, la persona non riceve risposta, e va da
un altro. L'automazione ha funzionato esattamente come era stata costruita, e il cliente che hai
perso non compare in nessun elenco.

Il rimedio è un filtro che non butta via niente. Ogni contatto scartato resta nel CRM con
un'etichetta e con il motivo dello scarto, finisce in una lista che una persona legge, e le
regole del filtro si correggono guardando quella lista invece dei contatti che sono passati. Un
filtro che nessuno può controllare dal lato degli scartati è una porta chiusa di cui non hai la
chiave.

## Perché un lead scartato non lascia traccia

I due errori di un filtro hanno un peso diverso, e il sistema è fatto in modo che tu ne veda uno
solo. Il contatto inutile che passa costa dieci minuti e ti dà fastidio, quindi la tendenza
naturale è stringere le regole. Il contatto buono che viene scartato non costa niente di
visibile, perché nessuno si lamenta: la persona ha scritto, non ha avuto risposta, ha concluso
che non ti interessava. Dal lato tuo, il numero di contatti da gestire è sceso e quelli che
arrivano sono mediamente più buoni. Il filtro sembra migliorato.

Ogni volta che stringi una regola, il numero che guardi migliora e il numero che non puoi
guardare peggiora. Se l'unica misura che hai è quanti contatti passano e quanti di questi
diventano clienti, un filtro che scarta quasi tutto avrà sempre i risultati migliori sulla
carta.

## Dove finiscono i contatti che non passano

In una piattaforma di automazione, il passaggio che decide ha di solito due uscite. Nel nodo If
di n8n, guardato il diciassette settembre di quest'anno, le uscite si chiamano proprio "true" e
"false": la prima per gli elementi che rispettano la condizione, la seconda per quelli che non
la rispettano. Il nodo Filter, sempre in n8n, ha un'uscita sola, e la documentazione dice che se
un elemento non rispetta la condizione il nodo lo omette dal suo output. Sono dettagli che n8n
può cambiare, ma la forma è la stessa in tutti gli strumenti di questo tipo.

All'uscita del no, nella maggior parte dei flussi, non c'è attaccato niente. Chi costruisce il
filtro pensa a cosa deve succedere quando il contatto è buono, collega quel ramo al CRM e alla
risposta automatica, e lascia l'altro ramo vuoto. Un contatto che finisce in un ramo vuoto si
ferma lì. Non è un errore, la piattaforma segna l'esecuzione come riuscita, perché dal suo punto
di vista non è andato storto niente. Il contatto è stato ricevuto, valutato, e messo da nessuna
parte, senza una riga in un registro dove andarlo a cercare.

La qualificazione automatica dei lead si vende mostrando il ramo del sì. L'uscita del no è vuota
per impostazione, e riempirla è un lavoro che va chiesto a parte.

## Il campo vuoto che vale come un no

Le regole di un filtro lavorano su campi. Budget maggiore di una certa cifra, zona uguale a una
certa città, tipo di richiesta uguale a vendita. Le persone però i moduli non li compilano
tutti. Lasciano vuoto il budget perché non lo sanno ancora, scrivono la zona in un campo libero
con un'abbreviazione, mettono il numero con i punti e la sigla dell'euro in un campo che
aspettava solo cifre.

Cosa fa la regola davanti a un campo vuoto dipende dallo strumento e da un'opzione che quasi
nessuno guarda. Nella versione del nodo If guardata il diciassette settembre c'è un'opzione
chiamata "Convert types where required", spenta di suo, che dice: se il tipo del valore non
corrisponde al tipo del confronto, n8n prova a convertirlo. La documentazione del nodo Filter
suggerisce di accenderla quando compare un errore che comincia con "wrong type".

Con l'opzione spenta, un testo dove ci si aspettava un numero ferma il flusso con un errore, e
l'errore lo vedi. Con l'opzione accesa, il flusso va avanti, e il contatto finisce da una parte
o dall'altra senza che nessuno abbia deciso quale parte è giusta per un campo lasciato in
bianco. L'errore era il risultato migliore dei due, perché era visibile. Chi lo spegne per far
tornare verde il flusso sta togliendo l'unico segnale che quel filtro stava decidendo su dati
che non aveva.

La regola giusta per un campo vuoto è una terza uscita, che porta il contatto a una persona
invece di farlo passare o scartarlo. Un filtro con due uscite sole tratta l'assenza di
informazione come se fosse un'informazione, e in quasi tutti i casi la tratta come un no.

## Quando a decidere è un modello

A volte il filtro non è una regola sui campi ma un modello di linguaggio che legge il messaggio
e risponde "interessato" o "non interessato". Sembra risolvere il problema dei campi vuoti,
perché il modello legge il testo libero. Ne apre un altro: il modello decide da solo, sulla base
del testo e di quello che gli hai scritto nel prompt, e se non gli hai dato il listino, le zone
che copri e cosa vuol dire un cliente buono per te, se lo inventa.

Un esempio costruito apposta, per rendere l'idea. Una persona scrive a un'agenzia immobiliare:
"non sto cercando casa, devo prima vendere la mia". Una regola sulla parola "cercare" la scarta.
Un modello a cui hai chiesto di trovare chi vuole comprare la scarta anche lui, e con una
motivazione sensata. Per un'agenzia, chi deve vendere è il contatto più prezioso che esista, e
il filtro lo ha messo nel ramo vuoto con una spiegazione perfetta.

Se usi un modello per decidere, chiedigli sempre di scrivere in una riga il motivo, e salva quel
motivo accanto all'etichetta. Un elenco di scartati con il motivo si legge in cinque minuti. Un
elenco di scartati senza motivo non si legge, e un ramo vuoto non è nemmeno un elenco.

## Come si controlla un filtro dal lato giusto

Il solo modo di sapere quanto sbaglia un filtro è leggere quello che scarta. Basta una volta a
settimana, con una lista che riporta data, nome, messaggio originale e motivo dello scarto. Una
persona la scorre e segna quelli che avrebbero dovuto passare. Se ne trova uno, la regola che lo
ha scartato si cambia, e il contatto viene richiamato, perché sono passati pochi giorni e non è
ancora perso.

Per fare questo servono tre cose che il flusso di partenza quasi mai ha. Il contatto scartato
deve restare nel CRM, con un'etichetta, mai cancellato, perché un filtro che cancella non si può
controllare. Il motivo dello scarto deve essere scritto, sia che venga da una regola sia che
venga da un modello. E la lista deve arrivare a una persona in un posto che quella persona apre
davvero, non in un foglio che nessuno ha nei preferiti.

Cambia anche la misura da guardare, che diventa quanti scartati, riletti da una persona, lo
erano a ragione. Finché quel numero non lo conosci, non sai se il filtro ti sta facendo
risparmiare tempo o ti sta costando clienti.

## Cosa chiedere a chi te lo costruisce

Chiedi di farti vedere il ramo del no, perché il ramo del sì è quello che ti hanno già fatto
vedere in demo. Chiedi cosa c'è attaccato all'uscita dei contatti che non passano. Se la
risposta è "niente, si fermano lì", hai trovato il buco.

Chiedi cosa succede se il campo budget è vuoto. Se la risposta è "lo scarta", chiedi perché una
persona che non ha ancora deciso il budget dovrebbe valere meno di una che lo ha scritto. Se la
risposta è "va avanti lo stesso", chiedi da che parte va, e se nessuno lo sa è la stessa cosa.

Chiedi dove puoi leggere, la settimana prossima, la lista degli scartati con il motivo. Se
quella lista non esiste, il filtro sta lavorando alla cieca e tu con lui.

## Da dove partire domani mattina

Apri l'automazione che riceve i contatti e trova il passaggio che decide. Guarda cosa c'è
collegato al lato del no. Se è vuoto, sai già che da quando è acceso nessun contatto scartato è
finito da qualche parte dove tu possa vederlo.

Se da qualche parte gli scartati ci sono, prendine dieci a caso dell'ultimo mese e leggili con
calma. Ne basta uno buono per capire che il problema non è teorico.

Se hai un filtro acceso sui contatti in arrivo e non hai mai visto la lista di quelli che non
passano, prenota una call di quindici minuti: apriamo il ramo del no insieme e vediamo chi c'è
dentro.
