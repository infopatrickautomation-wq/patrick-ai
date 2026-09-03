---
title: Il promemoria che arriva dopo che il cliente ha già disdetto
slug: promemoria-che-arriva-dopo-la-disdetta
date: 2026-09-03
description: Un'automazione che si mette in attesa manda quello che era vero quando è partita, non quello che è vero adesso. Come si costruisce un promemoria che rilegge l'agenda nel momento in cui scrive.
tags: [automazioni, appuntamenti, promemoria, pmi]
image: /blog/promemoria-che-arriva-dopo-la-disdetta.png
imageAlt: Corda chiara con un nodo stretto a un capo, appoggiata su un piano di legno scuro
imageAi: true
author: Patrick
---

Se il promemoria di un appuntamento parte da un'automazione che si mette in attesa, prima o poi
arriva a qualcuno che quell'appuntamento lo ha già spostato o disdetto. Non c'è niente di rotto e
non c'è niente da riparare. Il flusso ha fatto quello che gli era stato chiesto, cioè aspettare
fino al giorno prima e poi mandare il messaggio che teneva in mano da quando era partito.

Tutto il problema sta in quel tenere in mano. Un'automazione che si ferma ad aspettare porta con sé
una copia dei dati del momento in cui è cominciata, e quando si risveglia manda quella. Se intanto
il cliente ha telefonato per spostare al pomeriggio, il messaggio con l'orario del mattino parte lo
stesso. La strada che toglie il problema alla radice è non far aspettare niente a nessuno. Un
flusso che parte a orari fissi, guarda l'agenda come è in quel momento e scrive solo a chi domani
ha davvero un appuntamento.

## Cosa fa la piattaforma mentre aspetta

Mentre il flusso aspetta, quello che aveva in mano deve restare da qualche parte. Ogni
piattaforma lo tiene a modo suo, e il modo in cui lo tiene decide cosa puoi fare nel frattempo.

In n8n il nodo che mette in pausa lo scrive apertamente nella documentazione. Quando il flusso si
ferma, i dati dell'esecuzione vengono scaricati nel database, e quando arriva il momento di
ripartire quei dati vengono ricaricati e l'esecuzione riprende da lì. C'è anche una soglia, perché
sotto il minuto scarso l'attesa resta in memoria e nel database non ci passa nemmeno. Sopra, quella
che aspetta è una riga parcheggiata da qualche parte con dentro la fotografia di com'era il mondo
quando è partita.

Su Zapier ci sono due righe nella pagina sui ritardi che da sole decidono come va costruita la
cosa. La prima dice che lo zap deve restare acceso perché il ritardo funzioni, e che le azioni
programmate mentre era spento non partono quando lo riaccendi. La seconda dice che se cambi una
parte qualsiasi dello zap durante un'attesa, quello zap non riprende. Nella stessa pagina stanno
anche i limiti, cioè che un compito può restare appeso al massimo un mese e che il ritardo più
corto impostabile è di un minuto.

Su Make il modulo che fa dormire lo scenario arriva fino a cinque minuti. Basta leggere quel numero
per capire che lì un promemoria a un giorno di distanza non si fa aspettando, si fa con uno
scenario che parte da solo a orari stabiliti, che poi è già la strada giusta.

Sono condizioni lette sulla documentazione ufficiale delle tre piattaforme all'inizio di settembre
di quest'anno. Le riscrivono quando vogliono, quindi vale la pena riaprire quelle pagine invece di
fidarsi di questa.

## Un'automazione in attesa è un'automazione che non puoi toccare

Quelle due righe di Zapier hanno una conseguenza che si scopre sempre nel momento peggiore. Se hai
dei promemoria in attesa e devi correggere il testo del messaggio, nell'istante in cui salvi la
modifica quelli che stavano aspettando non arriveranno.

Un flusso pieno di attese lunghe, quindi, non si può sistemare mentre sta lavorando. Se ti
accorgi di un refuso il lunedì, o aspetti che la coda si svuoti da sola o accetti che chi era in
coda resti senza messaggio. E siccome nessuno tiene il conto di quante attese sono appese in quel
momento, quella scelta la fai senza sapere quanti clienti stai lasciando scoperti.

Lo stesso vale per lo spegnimento. Spegnere un'automazione sembra la cosa più reversibile del
mondo, quella che si fa quando qualcosa non torna e la si vuole guardare con calma. Con le
attese dentro non lo è, perché mentre sta spenta le scadenze continuano a passare, e quando la
riaccendi sono passate davvero.

## Il flusso che aspetta e il flusso che guarda

Ci sono due modi di costruire la stessa identica cosa, e cambiano tutto.

Il primo è quello che viene in mente subito. Quando l'appuntamento viene preso parte il flusso,
che aspetta fino al giorno prima e poi manda. Si costruisce in un pomeriggio e funziona benissimo
finché nessuno sposta niente.

Il secondo non aspetta mai. Parte da solo ogni ora, chiede all'agenda chi ha un appuntamento nelle
prossime ventiquattro ore, toglie quelli che sono già stati avvisati e scrive a quelli che restano.
Non ha niente in pancia, perché ogni volta che parte rilegge la situazione da capo.

Nel secondo modo la disdetta non è un caso da gestire. Un appuntamento disdetto semplicemente non
compare più nella risposta dell'agenda, quindi non riceve niente senza che nessuno abbia scritto
una riga apposta per quel caso. Lo spostamento si comporta uguale. Se l'appuntamento è passato al
pomeriggio, quando il flusso legge trova il pomeriggio.

È la differenza fra un flusso che si ricorda e un flusso che guarda. Quello che si ricorda ha
bisogno che qualcuno gli venga a dire ogni volta che il mondo è cambiato, e quel qualcuno prima o
poi si dimentica. Quello che guarda non ha niente da ricordare.

## Dove si scrive che il promemoria è già partito

Il secondo modo ha un punto delicato, ed è l'unico che ha. Se il flusso gira ogni ora e non sa a
chi ha già scritto, scrive alla stessa persona tutte le ore fino all'appuntamento.

Serve quindi un posto dove segnare che il messaggio è partito, e quel posto deve stare accanto
all'appuntamento, non dentro l'automazione. Un campo sulla scheda dell'appuntamento nel gestionale,
o una colonna nel foglio se l'agenda vive lì. Se domani cambi piattaforma di automazione,
quell'informazione deve restare dov'è.

Chi la tiene dentro la piattaforma si ritrova con due verità sullo stesso appuntamento e nessuna
delle due che vince sull'altra. E il giorno che il flusso viene rifatto da capo, che è una cosa che
succede, la memoria di chi era già stato avvisato si azzera e quelle persone ricevono il promemoria
una seconda volta.

Conta anche il momento in cui quel segno viene scritto. Va scritto dopo che il messaggio è stato
accettato da chi lo manda, non prima. Se lo scrivi prima e l'invio fallisce, quel cliente risulta
avvisato senza esserlo, e nessuno se ne accorgerà più.

## L'ora della macchina non è la tua

Un promemoria che nella testa di chi lo ha costruito parte alle sette del mattino può arrivare nel
cuore della notte a chi lo riceve. Nella documentazione di n8n c'è scritto che per le attese viene
sempre usata l'ora del server, indipendentemente da come è impostato il fuso. Il fuso orario scritto
nel flusso e l'ora con cui la macchina conta le attese sono due cose separate.

Il controllo si fa una volta sola e dura poco. Guarda l'ora esatta a cui sono partiti gli ultimi
messaggi nel registro delle esecuzioni, non l'ora che avevi scritto nella configurazione. Se le due
non coincidono, la distanza fra loro si sposta da sola il giorno del cambio dell'ora legale.

## Cosa chiedere a chi te lo costruisce

La prima domanda è se il flusso aspetta o guarda, ma va fatta in modo che si capisca dalla
risposta. Quando un cliente disdice, chi si accorge che il promemoria non deve più partire?

Se ti rispondono che c'è un altro pezzo di automazione che intercetta la disdetta e ferma quello in
attesa, chiedi di vederlo funzionare. Quel pezzo è più difficile da costruire di tutto il
resto messo insieme, e se non c'è, il flusso funziona lo stesso in ogni dimostrazione, perché nelle
dimostrazioni nessuno disdice.

La seconda domanda riguarda la memoria. Dove sta scritto che il promemoria è già partito, e cosa
succede a quell'informazione se un giorno il flusso viene rifatto.

La terza non è una domanda. Fatti mandare un promemoria a te, poi sposta l'appuntamento e guarda
cosa arriva.

## Da dove partire domani mattina

Prendi gli appuntamenti spostati o disdetti dell'ultima settimana e controlla se a quelle persone è
arrivato lo stesso un promemoria dopo che avevano chiamato. Se non riesci a saperlo dai tuoi
registri, la risposta ce l'hanno loro, e di solito la dicono al telefono la volta dopo con una
battuta.

Poi apri l'elenco delle esecuzioni della tua automazione e guarda quante risultano in attesa in
questo momento. Quel numero è la quantità di messaggi già decisi che partiranno comunque,
qualunque cosa succeda da qui a domani.

Se hai dei promemoria automatici e non sai se aspettano o guardano, prenota una call di quindici
minuti: apriamo il flusso insieme e guardiamo cosa ha in pancia adesso.
