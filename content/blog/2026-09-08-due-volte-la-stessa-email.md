---
title: Perché il tuo cliente ha ricevuto due volte la stessa email
slug: due-volte-la-stessa-email
date: 2026-09-08
description: Un messaggio arrivato due volte quasi mai è un errore di configurazione. È un'automazione che non ha nessun posto dove leggere se quella cosa l'aveva già fatta.
tags: [automazioni, errori, email, pmi]
image: /blog/due-volte-la-stessa-email.png
imageAlt: Due sassi verdi identici appoggiati uno accanto all'altro su una superficie scura
imageAi: true
author: Patrick
---

Se un cliente ti scrive che ha ricevuto due volte la stessa mail, quasi mai è perché l'automazione
si è rotta. È partita due volte perché qualcosa le ha detto due volte di partire, e lei non aveva
modo di sapere che quella cosa l'aveva già fatta. Un'automazione non si ricorda niente di ieri, se
non gliela costruisci tu quella memoria.

E la memoria non va messa dentro la piattaforma di automazione, va messa accanto al dato del
cliente. Prima di mandare, il flusso deve poter leggere da qualche parte, sulla scheda del
contatto o sulla riga del foglio, che a quella persona quel messaggio è già stato mandato. Chi non
ha quel segno si sta affidando al fatto che il flusso parta una volta sola, e le piattaforme non
lo promettono da nessuna parte. Anzi, alcune scrivono nero su bianco il contrario.

## Perché un'automazione parte due volte

Zapier tiene una pagina che elenca i motivi per cui uno zap crea dati doppi, ed è un elenco che
vale anche per le altre piattaforme. Ci sono più automazioni attaccate allo stesso punto di
partenza, impostazioni di partenza così larghe da far entrare più roba di quella che serve, un
valore fisso messo dove andava un valore che cambia, e gli anelli, cioè l'automazione che con le
sue azioni fa scattare se stessa. In fondo all'elenco ci sono i tentativi di rigiocare un'azione
finita in errore, ed è il caso che vale la pena tenere per ultimo.

Il primo caso è il più comune ed è anche quello che nessuno vede arrivare. La documentazione di
Zapier dice che il controllo sui doppioni guarda solo dentro lo stesso zap: se due zap partono
dallo stesso modulo, partono tutti e due. Se ne aggiungi una seconda sulla stessa fonte, quello
che hai aggiunto è un secondo lettore che del primo non sa niente. Succede sempre per una buona
ragione, tipo che il commerciale voleva una notifica sul telefono, e il giorno dopo il cliente
riceve due mail di benvenuto.

## Cosa ricorda davvero la piattaforma di quello che ha già fatto

La parola memoria fa pensare a qualcosa di più solido di quello che c'è davvero sotto.

Su Zapier le partenze che controllano una fonte a intervalli regolari funzionano così: alla prima
accensione la piattaforma chiama il sistema esterno, si prende quello che c'è e conserva
l'identificativo di ogni elemento. Poi a ogni giro confronta gli identificativi nuovi con quelli
già visti e fa partire il flusso solo su quelli che non conosceva. La documentazione è esplicita
su cosa serve perché il meccanismo regga: quel campo identificativo deve esserci sempre ed essere
unico fra tutti gli elementi della risposta. Se il sistema che ti manda i dati cambia
identificativo alla stessa cosa, per Zapier quella è una cosa nuova.

Nella stessa pagina c'è la riga che conta di più. Quando lo zap viene spento, quell'elenco viene
svuotato. Quella memoria è legata all'interruttore, non ai tuoi dati. Non è un posto dove
appoggiarsi per decidere se una persona è già stata contattata.

Su n8n esiste un nodo che fa esattamente questo mestiere, cioè confrontare quello che sta passando
adesso con quello che era già passato nelle esecuzioni precedenti. Vale la pena leggere due
dettagli. Il primo è dove tiene lo storico, cioè nel database, a scelta per singolo nodo oppure
condiviso a livello di flusso, con un'operazione apposta per cancellarlo. Il secondo è più sottile
e sta scritto nella pagina del nodo. In quella modalità il confronto è solo con le esecuzioni
passate, quindi due elementi identici arrivati insieme nello stesso giro passano tutti e due.

Sono pagine ufficiali di Zapier e n8n guardate all'inizio di settembre di quest'anno. Le
riscrivono quando vogliono, quindi vale la pena riaprirle invece di fidarsi di questa.

## Un errore non vuol dire che non è successo niente

I doppioni più fastidiosi arrivano proprio nei giorni in cui qualcosa non stava funzionando.

Quando un'azione va in timeout, non vuol dire che l'azione non è avvenuta. Vuol dire che non è
tornata indietro la conferma. La mail può essere partita benissimo e la risposta essersi persa per
strada. Zapier lo scrive nella sua pagina sui dati doppi: se nei registri trovi un errore di
timeout, i tentativi di rigiocare quell'azione potrebbero star creando dati doppi.

E i tentativi non sempre li fai tu a mano. Zapier ha una funzione che rigioca da sola le
esecuzioni finite in errore, fino a cinque volte, distanziando i tentativi a cinque minuti,
mezz'ora, un'ora, tre ore e sei ore dal primo errore. Make fa una cosa simile con le esecuzioni
rimaste a metà per limiti di frequenza, errori di connessione e timeout dei moduli, riprovando con
attese che si allungano di volta in volta. Sono funzioni utili, e nella maggior parte dei casi
fanno il loro mestiere. Solo che ognuno di quei tentativi è un'occasione di rifare una cosa che
forse era già riuscita.

Lo stesso vale in entrata. Meta, nella documentazione delle notifiche verso il tuo server, scrive
che se una consegna fallisce riprova subito e poi ancora qualche volta nell'arco delle trentasei
ore successive, e aggiunge che i doppioni li devi gestire tu. In pratica la piattaforma che ti
manda i dati ti sta avvisando per iscritto che la stessa cosa potrebbe arrivarti più di una volta,
e che il problema è tuo.

Il doppione, quindi, è il comportamento normale di sistemi costruiti per preferire una ripetizione
a una perdita. Non lo sistemi una volta e via. Preferire la ripetizione alla perdita è anche la
scelta giusta, per come la vedo. Fra un messaggio in più e un cliente dimenticato, il danno più
grosso è il secondo. Solo che quella scelta ha un prezzo, e il prezzo si paga a valle, con un
controllo prima di ogni invio.

## Prima o dopo l'invio, e perché non c'è una risposta giusta

Il segno che dice "a questa persona è già partito" va scritto in un momento preciso, e la scelta
di quel momento non è neutra.

Se lo scrivi prima di mandare, un invio fallito lascia una persona marcata come già contattata che
non ha ricevuto niente, e nessuno la contatterà mai più. Se lo scrivi dopo che l'invio è stato
accettato, un timeout ti lascia con la mail partita e il segno mancante, quindi al tentativo
successivo quella persona la ricevi due volte.

Non esiste un ordine giusto in assoluto. Si sceglie guardando quale dei due errori fa più danno
con quel messaggio specifico. Per una mail di benvenuto il doppione è una figura mediocre e il
silenzio è peggio, quindi il segno si scrive dopo. Per una fattura o un rimborso il doppione costa
soldi veri, quindi il segno si scrive prima e ci si tiene un controllo per recuperare a mano
quelli rimasti indietro. Chi ti costruisce un'automazione dovrebbe farti questa domanda. Se non te
la fa, ha scelto per te senza dirtelo.

Sul resto le regole sono più semplici. Il segno deve avere un nome che identifica la cosa fatta a
quella persona, non il tipo di messaggio, altrimenti la seconda campagna dell'anno non parte più.
E va scritto dove stanno i dati del cliente, nel gestionale o nel foglio, non dentro la
piattaforma di automazione: la piattaforma prima o poi la cambi, e quel giorno la memoria di cosa
era già partito non deve andarsene con lei.

## Cosa chiedere a chi te lo costruisce

Dove è scritto che a questa persona il messaggio è già partito, e chi lo legge prima di mandare.
Se la risposta è che ci pensa la piattaforma, hai appena scoperto che nessuno lo legge.

Cosa succede se il flusso si ferma a metà e viene rigiocato, e quale delle azioni già fatte viene
rifatta dall'inizio.

Quante automazioni leggono da questa stessa fonte in questo momento. Se ti rispondono con un
forse, vuol dire che nessuno lo sa.

## Da dove partire domani mattina

Apri i registri delle esecuzioni degli ultimi giorni e cerca due partenze ravvicinate con lo
stesso contatto. Non serve un'analisi, si vedono a occhio perché stanno una sotto l'altra.

Poi chiedi a chi risponde al telefono e alla casella di posta. Il doppio invio quasi mai arriva
come segnalazione formale, arriva come battuta di un cliente che dice "ne ho ricevute due", e si
ferma lì senza che nessuno lo scriva da nessuna parte.

Se hai automazioni che scrivono ai clienti e non sai dove sia il segno di quello che è già
partito, prenota una call di quindici minuti: apriamo i registri insieme e guardiamo se si sono
già ripetute.
