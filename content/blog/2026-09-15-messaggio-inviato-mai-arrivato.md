---
title: Il messaggio risulta inviato, ma al cliente non è mai arrivato
slug: messaggio-inviato-mai-arrivato
date: 2026-09-15
description: Per un'automazione "inviato" vuol dire che la piattaforma ha preso in carico il messaggio, non che il cliente lo ha ricevuto. La consegna arriva dopo, per un'altra strada, e quasi nessun flusso la sta guardando.
tags: [automazioni, whatsapp, email, consegna, pmi]
image: /blog/messaggio-inviato-mai-arrivato.png
imageAlt: Una freccia di legno con le penne verdi, posata di traverso su una stoffa verde scuro
imageAi: true
author: Patrick
---

Quando un'automazione segna un messaggio come inviato, vuol dire solo che la piattaforma lo ha
preso in carico. Che sia arrivato sul telefono o nella casella del cliente è
un'altra cosa, che si sa dopo, e che arriva per una strada diversa da quella dell'invio. Se il
flusso non guarda quella strada, per lui ogni messaggio è arrivato, anche quelli finiti contro un
numero che non esiste.

Il rimedio sta nel tenere due stati separati sulla scheda del contatto, uno per "preso in carico"
e uno per "consegnato", e nel far partire i passaggi successivi dal secondo. Un sollecito che
parte perché il cliente non ha risposto ha senso solo se il primo messaggio gli è arrivato.
Altrimenti stai insistendo con qualcuno che non ha mai sentito parlare di te, e la tua scheda
cliente racconta una storia che non è successa.

## Cosa vuol dire "inviato" per un'automazione

Un passaggio di invio, in qualunque piattaforma di automazione, si considera riuscito quando il
servizio dall'altra parte risponde bene. La casella spunta di verde, il flusso va avanti, e se
c'è un campo "stato" sul CRM ci finisce scritto "inviato". Il servizio però ha risposto a una
domanda molto più piccola di quella che ti interessa. Ha detto che il messaggio è formato bene,
che il mittente è autorizzato e che lo mette in coda. Non ha detto niente sul destinatario,
perché in quel momento non lo sa ancora nemmeno lui.

Dal punto di vista di chi legge la scheda del cliente, invece, "inviato" suona come "ricevuto".
È lì che nasce il problema, in un campo che dice la verità su un pezzo del percorso e viene letto
come se la dicesse su tutto.

## Cosa dice WhatsApp quando un messaggio parte

Sul canale WhatsApp la distinzione è scritta nero su bianco, e conviene leggerla perché vale per
tutte le piattaforme che si appoggiano sopra. Nella documentazione dell'API ufficiale di Meta,
guardata il quindici settembre di quest'anno, la risposta a una richiesta di invio riuscita viene
descritta così: indica solo che la richiesta è stata accettata, non che il messaggio è stato
consegnato. La consegna arriva dopo, attraverso delle notifiche separate, e quelle notifiche
hanno quattro stati. Partito dai server di Meta, arrivato sul dispositivo della persona, aperto in
una chat, fallito. L'ultimo porta con sé un codice che spiega il motivo.

Tra le ragioni elencate per un messaggio che non si può consegnare c'è che il numero non è un
numero WhatsApp. Un'altra, con un codice a parte, è che sono passate più di ventiquattro ore
dall'ultima risposta della persona, e quindi si poteva mandare solo un messaggio con un modello
approvato. Una terza, sempre con un suo codice, dice con parole loro che il messaggio non è stato
consegnato per mantenere l'ecosistema in salute, che è il modo in cui Meta limita quanti messaggi promozionali una
stessa persona può ricevere. In tutti e tre i casi il tuo flusso, se guarda solo la risposta
all'invio, ha visto un successo. Meta questi dettagli li riscrive quando vuole, quindi vanno
ricontrollati prima di costruirci sopra. La forma del problema però è la stessa da anni, l'invio
e la consegna sono due eventi separati e il secondo arriva per un'altra strada.

## Dove finisce l'errore di una mail che non arriva

Con la posta elettronica la situazione è più vecchia e più scomoda. Quando mandi una mail a un
indirizzo che non esiste, la piattaforma di invio risponde bene lo stesso, perché la mail l'ha
presa in carico. Il rifiuto arriva dopo, a volte minuti, a volte ore, sotto forma di un'altra mail. Nella guida di Gmail
sui messaggi respinti, letta sempre il quindici settembre, viene descritta come una mail del
Mail Delivery Subsystem con dentro un messaggio di errore che spiega perché non è stata
consegnata. Tra i motivi ci sono l'indirizzo scritto male, prima o dopo la chiocciola, la casella
del destinatario piena, un server momentaneamente fermo, e qualcosa nel testo o negli allegati che
ha fatto scattare il filtro antispam dall'altra parte.

Quella mail di ritorno arriva nella casella del mittente. Non torna nel flusso che ha mandato la
mail, perché il flusso ha finito il suo giro da un pezzo. Finisce in una casella che magari nessuno
apre, o che viene aperta da una persona che la vede, capisce che è roba tecnica e la archivia. Se
c'è un'automazione che legge quella casella, c'è una buona probabilità che stia filtrando solo i
messaggi non letti, e a quel punto basta che qualcuno ci abbia cliccato sopra perché la prova che
la mail non è arrivata sparisca dal suo campo visivo.

Il risultato è un sistema dove ogni singola mail risulta inviata, e dove la lista degli indirizzi
sbagliati esiste, solo che sta sparsa in una casella di posta sotto forma di rimbalzi che nessuno
conta.

## Perché il sollecito peggiora le cose

Le sequenze di follow-up che si costruiscono di solito hanno una logica semplice, se il contatto
non risponde entro qualche giorno si riscrive. Quella logica dà per scontato che il primo
messaggio sia arrivato. Su un indirizzo sbagliato non arriva né il primo né
il secondo né il terzo, il flusso li segna tutti come inviati, e alla fine della sequenza il
contatto viene classificato come freddo, o disinteressato, e messo da parte.

Dentro ci finisce chi ha scritto il numero di fretta sul modulo del sito, o ha messo il fisso in
un campo che pretendeva un cellulare, e chi ha una mail aziendale che nel frattempo è cambiata.
Sono persone che ti hanno cercato e a cui hai risposto in una stanza vuota, e la tua
scheda cliente dice che le hai contattate tre volte senza esito. Su quella scheda ci costruisci la
lettura di quanto rende il tuo canale, e il numero che ne esce è più basso del vero senza che
nessuno possa capire perché.

## Cosa deve scrivere il flusso accanto al contatto

Servono due stati. Il primo lo scrive il flusso subito dopo l'invio, e dice che la
piattaforma ha preso in carico il messaggio. Il secondo lo scrive un altro pezzo del flusso, quando
arriva la conferma di consegna, oppure quando arriva il fallimento con il suo motivo. Finché il
secondo stato è vuoto, il contatto è in una zona grigia e nessun passaggio automatico dovrebbe
trattarlo né come raggiunto né come perso.

Su WhatsApp questo vuol dire ricevere le notifiche di stato e scriverle accanto al contatto,
almeno "consegnato" e "fallito" con il codice. Sulla mail vuol dire leggere i rimbalzi in modo
sistematico, riconoscere che sono rimbalzi, capire a quale invio si riferiscono e segnare il
contatto. È un lavoro noioso, ed è il motivo per cui gli strumenti fatti per le newsletter di
solito lo fanno di mestiere e tolgono da soli gli indirizzi che rimbalzano. Un flusso costruito a
mano quel pezzo non ce l'ha finché qualcuno non lo scrive.

Con quei due stati il sollecito può partire da "consegnato e senza risposta" invece che da
"inviato e senza risposta", che è la differenza tra insistere con chi ti ha ricevuto e insistere con
nessuno. Il fallimento poi non deve chiudere il contatto in silenzio. Deve finire in una lista che
una persona guarda, perché un numero sbagliato di una persona interessata si sistema con una telefonata o con un'occhiata al modulo originale, e vale molto più di dieci
contatti freddi.

## Cosa chiedere a chi te lo costruisce

Chiedi cosa succede nel flusso se il numero non è su WhatsApp. Se la risposta è che il messaggio
non parte, la persona non ha guardato come funziona la consegna. Il messaggio parte, viene
accettato, e fallisce dopo. La risposta giusta comincia con "ricevo la notifica di stato e".

Chiedi dove finiscono i rimbalzi delle mail e chi li legge. Chiedi di farti vedere, sulla scheda
di un contatto vero, il campo che dice "consegnato" e quello che dice "fallito", e di farti vedere
un fallimento reale, non uno di prova. Se nel CRM esiste solo "inviato", la sequenza di follow-up
che ti hanno costruito sta insistendo anche con chi non ha mai ricevuto niente.

## Da dove partire domani mattina

Apri la casella da cui partono i messaggi automatici e cerca le mail del Mail Delivery Subsystem
dell'ultimo mese. Contale. Poi prendi qualche contatto che il tuo sistema ha classificato come
freddo e controlla se il suo indirizzo o il suo numero compaiono in uno di quei rimbalzi.

Se usi WhatsApp per i messaggi automatici, chiedi a chi ha costruito il flusso se le notifiche di
stato vengono ricevute e dove vengono scritte. Se la risposta è un silenzio, hai già la risposta.

Se hai una sequenza di follow-up accesa e l'unico stato che vedi sui contatti è "inviato",
prenota una call di quindici minuti: guardiamo insieme quanti messaggi stanno partendo verso il
nulla e cosa serve per accorgersene.
