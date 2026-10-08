---
title: Il cliente contesta un messaggio di un mese fa, e l'automazione non se lo ricorda più
slug: storico-automazione-cancellato
date: 2026-10-08
description: Lo storico delle esecuzioni di un'automazione non è un archivio. Si cancella da solo dopo un certo tempo, e a volte i giri andati bene non vengono nemmeno salvati. Se devi poter dimostrare cosa è partito, a chi e quando, quella traccia va scritta in un posto tuo.
tags: [automazioni, storico, esecuzioni, n8n, pmi]
image: /blog/storico-automazione-cancellato.png
imageAlt: Una clessidra su una scrivania di legno scuro, con gli ultimi granelli di sabbia che cadono
imageAi: true
author: Patrick
---

Lo storico delle esecuzioni di un'automazione non è un archivio. Serve a chi costruisce il flusso
per capire perché un giro è andato storto, e si svuota da solo dopo un certo tempo, oppure quando
i giri salvati diventano troppi. In certe configurazioni i giri andati bene non
vengono salvati per niente.

Se un domani devi poter rispondere a "quel sollecito mi è arrivato davvero?" o "chi ha mandato
questo preventivo?", la risposta non può stare lì. Deve stare in un registro tuo, che il flusso
riempie a ogni giro con una riga corta: quando, a chi, cosa, con quale esito.

## Per quanto tempo un'automazione si ricorda cosa ha fatto

Dipende dalla piattaforma e da come è configurata, e conviene saperlo prima del giorno in cui
serve. Prendo n8n come esempio, perché la regola è scritta nero su bianco nella documentazione.

Nella versione che si installa sui propri server, alla data in cui l'ho verificata (l'otto ottobre
di quest'anno), la pulizia automatica dello storico è accesa per impostazione predefinita. Le
esecuzioni concluse vengono cancellate quando superano le trecentotrentasei ore, cioè quattordici
giorni, oppure quando ce ne sono più di diecimila, partendo dalle più vecchie. Sono valori che chi
gestisce il server può cambiare, e che possono cambiare da una versione all'altra.

Quindi, con le impostazioni di partenza, il messaggio partito tre settimane fa nello storico non c'è
più. E con un flusso che gira spesso il limite delle diecimila esecuzioni può arrivare prima dei
quattordici giorni.

Se usi la versione in cloud, la regola va letta sul tuo piano o chiesta a chi te lo gestisce. Quello
che ho scritto sopra riguarda i valori predefiniti della versione installata, non quella in
abbonamento.

## Perché lo storico può essere vuoto anche se il flusso ha girato

C'è un secondo motivo per cui un giro può mancare, e qui il tempo non c'entra. Ogni flusso in n8n ha
delle impostazioni che decidono quali esecuzioni salvare: quelle finite in errore, quelle riuscite,
quelle lanciate a mano dall'editor. A livello di server c'è anche un'opzione per non salvare
nessuna delle esecuzioni riuscite.

Spegnere il salvataggio dei giri riusciti ha senso per un flusso che parte ogni minuto e riempirebbe
il database di righe tutte uguali. Ma ha una conseguenza che chi lo spegne deve sapere: da quel
momento lo storico mostra solo gli errori. Un sollecito partito correttamente non lascia traccia, e
davanti a un cliente che dice di non averlo ricevuto non hai niente da guardare.

## Quando ti serve sapere cosa è partito, settimane dopo

Una domanda così può arrivare molto dopo l'invio, da qualcuno che nel frattempo ha avuto altro da
fare. Qualche esempio:

- un cliente contesta un sollecito di pagamento e dice che il primo avviso non gli è mai arrivato;
- un contatto scrive che ha compilato il modulo e nessuno lo ha richiamato;
- un collega trova un preventivo con il prezzo vecchio e vuole sapere se è partito prima o dopo
  l'aggiornamento del listino;
- un fornitore chiede quando gli è stato mandato un ordine.

In tutti questi casi vuoi sapere cosa ha fatto il flusso, per chi e in quale giorno. Lo storico
delle esecuzioni lo saprebbe dire, se ci fosse ancora, ma è fatto per chi corregge il flusso e non
per durare.

Il messaggio stesso a volte è recuperabile da un'altra parte. Una mail mandata da una casella Gmail
di solito resta fra gli inviati. Però dipende dal canale e da come il flusso la manda, e cercare a
mano in più posti per ricostruire un singolo giorno è proprio il lavoro che l'automazione
doveva toglierti.

## Cosa deve scrivere il flusso, e dove

La soluzione è che il flusso scriva da sé, a ogni azione che conta, una riga in un posto che non si
svuota. Non serve copiare tutto quello che passa. Bastano poche colonne:

- data e ora;
- a chi è andata l'azione (il nome o l'identificativo del cliente, non tutti i suoi dati);
- cosa è partito: primo sollecito, conferma d'appuntamento, preventivo;
- il canale, cioè mail, WhatsApp o altro;
- l'esito, e se il servizio che ha mandato il messaggio restituisce un codice di conferma, anche
  quello;
- il nome del flusso, perché fra qualche mese i flussi saranno più di uno.

Il posto può essere una scheda di un foglio Google dedicata solo a questo, una nota sull'attività
del cliente nel CRM, una tabella nel gestionale. Conta che sia tuo, che si possa cercare per nome
del cliente, e che le righe si aggiungano soltanto. Se è un foglio, vale quello che vale per ogni
foglio collegato a un'automazione: le intestazioni non si toccano, e chi lavora a mano lavora da
un'altra parte.

Al flusso costa un passaggio in più. Il giorno della domanda cerchi il nome del cliente e trovi la
riga, invece di ricostruire tutto a mano.

## Allora conviene tenere lo storico per sempre?

No. Lo storico salva i dati completi di ogni giro, quindi
anche il testo delle mail e i dati dei clienti che ci passavano dentro. Allungarne la durata fa
crescere il database, e se il disco del server si riempie si fermano anche le automazioni.

Poi c'è la privacy. Il regolamento europeo sulla protezione dei dati chiede di tenere
solo i dati che servono, e solo per il tempo che servono. Uno storico tenuto per anni con dentro
messaggi interi e indirizzi è il contrario. Il registro che ho descritto sopra va nella direzione
giusta proprio perché è leggero: dice che il sollecito è partito e a chi, senza conservare tutto
quello che conteneva. Per quanto tempo tenere anche quello è una decisione da prendere una volta,
con chi ti segue per la privacy.

Quindi le due cose stanno insieme. Lo storico tecnico può restare corto, tanto serve a correggere
gli errori, mentre ai clienti rispondi dal registro, che dura di più.

## Cosa fare domani mattina

Prendi l'automazione che manda qualcosa ai clienti, quella dove una contestazione ti costerebbe di
più. Apri lo storico delle esecuzioni e guarda la data del giro più vecchio che c'è ancora: quella
è la memoria che hai oggi. Poi controlla nelle impostazioni del flusso se le esecuzioni riuscite
vengono salvate.

Se la memoria è più corta del tempo in cui un cliente può farti una domanda, chiedi a chi gestisce
il flusso di aggiungere la riga di registro alla fine di ogni invio.

Se vuoi che guardiamo insieme cosa ricordano oggi le tue automazioni e dove conviene tenere il
registro, prenota una call dalla pagina contatti.
