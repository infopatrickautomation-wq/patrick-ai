---
title: Hai rinominato una colonna e l'automazione ha smesso di scriverci
slug: colonna-rinominata-automazione-foglio-google
date: 2026-10-06
description: Se un'automazione scrive in un foglio Google, il foglio fa parte dell'automazione. Rinominare una colonna, spostarla o cambiare nome alla scheda può farla scrivere nel posto sbagliato senza nessun errore. Cosa si può toccare e cosa no.
tags: [automazioni, google sheets, fogli di calcolo, n8n, pmi]
author: Patrick
---

Se un'automazione scrive i contatti o gli ordini in un foglio Google, quel foglio fa parte
dell'automazione, e cambiarne la struttura è come cambiare il flusso senza aprirlo.
Può bastare rinominare "Telefono" in "Cellulare" perché i numeri smettano di arrivare in quella
colonna. E può non comparire nessun errore: il flusso continua a girare e scrive da un'altra parte, oppure
non scrive quel dato e basta.

La regola pratica è dividere il foglio in due zone. Le intestazioni delle colonne e il nome della
scheda sono la parte che il flusso legge, e si toccano solo insieme al flusso. Le righe sotto sono
dati, e lì si può lavorare come sempre. Chi apre il foglio deve sapere dove passa il confine.

## Perché cambiare il nome di una colonna rompe l'automazione

Un'automazione non vede il foglio come lo vedi tu. Tu leggi "Cellulare" e capisci che è il telefono
del cliente. Il flusso cerca una colonna con un nome preciso, scritto lettera per lettera, e se non
la trova non ha modo di indovinare che è la stessa cosa con un altro nome.

Prendo come esempio n8n, ma il ragionamento vale per qualunque strumento che abbina i dati alle
colonne in base al nome. Nella definizione del nodo Google Sheets di n8n, che ho controllato il sei ottobre di quest'anno, la riga delle intestazioni è descritta
così: i dati in arrivo vengono abbinati ai nomi delle colonne, e l'abbinamento distingue le
maiuscole dalle minuscole. Quindi anche "telefono" al posto di "Telefono" è un nome diverso.

Il nodo ha due modi di lavorare. Nel primo, che è quello predefinito, chi costruisce il flusso
sceglie colonna per colonna cosa scriverci. Nel secondo il nodo prende i campi in arrivo e li
abbina da solo alle colonne con lo stesso nome, e accanto all'opzione compare un avviso che dice di
assicurarsi che i dati abbiano esattamente i nomi delle colonne del foglio.

È il secondo modo che fa il danno più silenzioso. C'è un'impostazione che decide cosa fare con i
campi che non corrispondono a nessuna colonna, e alla data in cui l'ho verificata il valore
predefinito è inserirli in colonne nuove. Le alternative sono ignorarli o fermarsi con un errore.
Con il valore predefinito, se rinomini "Telefono" in "Cellulare", il flusso non trova più
"Telefono", crea una colonna nuova con quel nome in fondo al foglio e scrive lì. La colonna
"Cellulare" resta vuota dal giorno del cambio in poi, senza che il flusso segnali niente. Sono dettagli
che possono cambiare da una versione all'altra, quindi vanno ricontrollati sulla versione che usi.

## Cosa si può fare sul foglio senza rompere niente

La maggior parte del lavoro quotidiano sul foglio non tocca la parte che il flusso legge. Scrivere,
correggere o cancellare il contenuto di una cella, colorare le righe, aggiungere un commento,
filtrare per vedere solo i clienti di una città: sono tutte cose che non cambiano le intestazioni.

Le operazioni da trattare con attenzione sono poche, e conviene averle scritte:

- rinominare una colonna, anche solo per correggere un errore di battitura o una maiuscola;
- cambiare nome alla scheda, se il flusso la cerca per nome invece che con il suo identificativo;
- spostare o inserire colonne, se il flusso scrive per posizione (la colonna C, la colonna D) e
  non per nome;
- mettere righe sopra le intestazioni, un titolo o una legenda, perché il flusso si aspetta i
  nomi delle colonne su una riga precisa, di solito la prima;
- unire celle o mettere due intestazioni uguali, che rendono ambiguo dove scrivere.

Non tutte rompono tutti i flussi. Dipende da come è stato costruito il collegamento, e chi usa il
foglio ogni giorno di solito non lo sa. Non ha motivo di saperlo, finché qualcuno non glielo scrive.

## Come fa il flusso a trovare la scheda giusta

Un foglio Google può avere più schede, e il flusso deve sapere in quale scrivere. Nel nodo di n8n
la scheda si può indicare in quattro modi: scegliendola da un elenco, incollando il link, con il
suo identificativo numerico oppure con il nome.

La differenza conta il giorno in cui qualcuno rinomina la scheda da "Foglio1" a "Clienti" per
mettere ordine. L'identificativo numerico è quello che compare nel link dopo la scritta gid, e
Google lo assegna alla scheda quando la crei: cambiando il nome della scheda resta lo stesso. Il
nome invece cambia. Se il flusso cerca la scheda "Foglio1" e quella scheda non esiste più,
al prossimo giro non sa dove scrivere.

Se ti stanno costruendo un flusso che scrive in un foglio, chiedi come trova la scheda. Se la
risposta è "per nome", chiedi se si può passare all'identificativo. È una modifica piccola.

## Il foglio è un posto adatto per i dati di un'automazione?

Per molte piccole attività il foglio Google è il posto giusto. Lo sanno usare tutti, si vede subito
cosa c'è dentro e non costa niente in più. Però è fatto apposta per essere cambiato, e lo può
cambiare chiunque abbia il link in modifica.

Un gestionale o un CRM, invece, hanno campi che un utente normale non può rinominare per sbaglio.
Quando il foglio diventa il punto da cui partono fatture, promemoria o messaggi ai clienti, vale
la pena chiedersi se non sia arrivato il momento di spostare i dati in uno strumento con campi
fissi. Finché il foglio è una lista di appoggio, invece, bastano le regole di sopra.

Ci sono anche delle vie di mezzo che non costringono a cambiare strumento:

- proteggere la riga delle intestazioni. Google Sheets permette di proteggere un intervallo di
  celle e di scegliere chi può modificarlo. Con la prima riga protetta, chi lavora sul foglio può
  scrivere i dati ma non rinominare le colonne;
- tenere una scheda solo per il flusso, dove scrive l'automazione e nessuno lavora a mano, e
  fare i propri filtri e ordinamenti su un'altra scheda che riprende i dati da quella con una formula;
- far fermare il flusso quando una colonna non torna, invece di lasciargli creare colonne nuove.
  In n8n è l'opzione che dice cosa fare con i campi che non corrispondono: impostata sull'errore, il
  giro si ferma e lo vedi. Ma un flusso fermo va comunque notato da qualcuno, quindi serve anche un
  avviso che arrivi a una persona.

## Cosa fare domani mattina

Apri l'elenco delle tue automazioni e segna quelle che leggono o scrivono in un foglio Google. Per
ognuna, guarda il foglio e fatti due domande: cosa succede se qualcuno rinomina una colonna, e cosa
succede se qualcuno rinomina la scheda. Se non lo sai, chiedilo a chi ha costruito il flusso.

Poi, nello stesso foglio, proteggi la riga delle intestazioni e aggiungi una nota alla prima cella
di quella riga, con il comando che Google Sheets mette nel menu del tasto destro: "Le intestazioni e
il nome di questa scheda li usa un'automazione. Prima di cambiarli, avvisa chi la gestisce." Chi
apre il foglio per mettere ordine la trova proprio sulla riga che non deve toccare.

Se vuoi che guardiamo insieme le automazioni che passano dai tuoi fogli e capiamo quali reggono un
cambio di nome e quali no, prenota una call dalla pagina contatti.
