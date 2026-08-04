---
title: Le automazioni non si rompono con un errore, smettono in silenzio
slug: automazioni-che-smettono-in-silenzio
date: 2026-08-04
description: Quando un'automazione smette di funzionare non arriva nessun avviso, e te ne accorgi settimane dopo dai risultati che mancano. Come farsi avvisare prima, e perché il controllo più diffuso non dimostra niente.
tags: [automazioni, monitoraggio, affidabilità, ai]
image: /blog/automazioni-che-smettono-in-silenzio.png
imageAlt: Una lampadina a filamento accesa, sola, appesa a un cavo in una stanza vuota in penombra
imageAi: true
author: Patrick
---

Se hai un'automazione che raccoglie i contatti dal sito e li scrive nel CRM, e domani
mattina smette di funzionare, non ricevi nessun messaggio. Il sito continua a rispondere, il
modulo continua a dire grazie, il CRM resta aperto dove l'hai lasciato. L'unica cosa che
cambia è che i contatti non arrivano più, e quello lo scopri quando qualcuno ti scrive per
la seconda volta chiedendo se hai ricevuto la prima.

La contromossa non è controllare tutto ogni giorno, perché non lo farai. È rovesciare il
segnale. Invece di aspettare un allarme quando qualcosa si rompe, fai in modo che il sistema
ti dica ogni giorno che ha funzionato, e tratti il silenzio come una cattiva notizia. Quando
una cosa lavora al posto tuo e tu non la vedi lavorare, è l'unico controllo che regge.

## Perché un'automazione che si rompe non ti avvisa

Un programma segnala un errore quando arriva fino al punto in cui sbaglia. Se non parte
proprio, non c'è niente che segnali. E il modo più comune in cui si ferma un'automazione non
è un errore, è un passaggio che non è mai stato eseguito: il servizio che doveva svegliarsi
alle nove e non si è svegliato, oppure il collegamento che riceveva i dati dal modulo, saltato
il giorno che qualcuno ha aggiornato il sito.

In tutti questi casi il registro delle esecuzioni è vuoto, e un registro vuoto assomiglia
moltissimo a una giornata tranquilla. È la parte che rende il problema scivoloso. Quello che
hai davanti ti dice cosa è successo, non cosa doveva succedere e non è successo.

Poi c'è il modo di rompersi che non dipende da te. Le automazioni tengono insieme strumenti
che non sono tuoi, e quegli strumenti cambiano senza chiederti il permesso. Le autorizzazioni
che collegano due sistemi hanno spesso una scadenza, e quanto durano varia da servizio a
servizio: è un dato da controllare sulla documentazione della piattaforma che usi, perché
cambia nel tempo. Il giorno che scade, il tuo lavoro non è cambiato di una riga e ha smesso
di funzionare lo stesso.

## Il controllo che sembra giusto e non dimostra niente

Poi ci sono le automazioni sorvegliate che erano ferme da settimane, ed è il caso che fa più
danni, perché lì qualcuno il controllo se l'era pure messo. Quasi tutti i controlli verificano
però la cosa più facile da misurare, non quella che interessa. "Il sito risponde?" Sì. Ma un sito costruito come applicazione a pagina singola di solito è
configurato per servire la stessa pagina qualunque indirizzo gli venga chiesto, quindi
risponde di sì anche a una pagina che non esiste. Il controllo passa senza aver guardato la
cosa che dovevi controllare. Per sapere se quella pagina esiste davvero bisogna cercare una
frase che sta solo lì dentro.

La stessa forma torna dappertutto, appena la riconosci. "Il flusso ha girato senza errori"
non dice che abbia fatto qualcosa. E "zero richieste oggi" può voler dire che è stata una
giornata fiacca o che il modulo ha smesso di spedire, che dal cruscotto sono la stessa
identica riga.

Ne esce una regola sola, che vale anche lontano dall'informatica. **Controlla la presenza del
risultato, non l'assenza di errori.** Non "nessun problema segnalato", ma "oggi sono entrati
contatti nuovi, e l'ultimo è di questo pomeriggio". Se il tuo controllo dà la stessa risposta
quando tutto funziona e quando tutto è fermo, non è un controllo, è una speranza.

## Cosa cambia quando in mezzo c'è l'AI

Un'automazione tradizionale, quando le arriva qualcosa che non si aspettava, si pianta. Un
modello linguistico no. Risponde comunque, e la risposta sbagliata ha lo stesso tono sicuro
di quella giusta. Non esiste un codice di errore per "ha detto una cosa che non sta in piedi".

Un assistente che risponde ai clienti può quindi passare settimane a dare un orario che non
è più quello, o a citare un servizio che hai smesso di vendere, mentre ogni controllo tecnico
continua a dire che funziona. Perché tecnicamente funziona davvero. Riceve la domanda e
restituisce una frase, che è tutto quello che gli era stato chiesto di fare. Il pezzo rotto
non è il meccanismo, è il contenuto, e il meccanismo non sa guardarci dentro.

Su un pezzo che genera testo l'unico controllo che vale è leggere quel testo. Non tutto, un
campione: qualche conversazione a settimana, presa a caso, letta da una persona che sa cosa
avrebbe dovuto rispondere. Sembra poco tecnologico, e per adesso non c'è niente di meglio,
perché la domanda non è "è andato a buon fine" ma "è la risposta giusta", e quel giudizio il
sistema non ce l'ha.

## Come si costruisce un avviso che serve

- **Il segnale al contrario.** Ogni volta che l'automazione arriva in fondo, lascia una
  traccia da qualche parte, anche solo una riga in un foglio o un messaggio in una chat.
  L'allarme non scatta quando arriva un errore, scatta quando quella traccia manca.
  Così un'automazione che non è nemmeno partita smette di essere invisibile.
- **La soglia, non il singolo caso.** Certe cose vanno guardate nel loro insieme. Se i
  contatti dal sito arrivano tutti i giorni e oggi sono zero, quello è già l'avviso. Un
  conteggio confrontato con il solito prende i guasti che nessun errore segnala.
- **L'avviso deve dire il nome della cosa che manca.** "Errore nel flusso" ti fa perdere
  mezz'ora a cercare dove. "Il collegamento con il gestionale non risponde da stamattina" ti
  dice cosa aprire. Scrivilo immaginando di leggerlo tra due mesi, di sera, sul telefono.
- **Un posto solo dove arrivano.** Se gli avvisi finiscono in cinque canali diversi, il
  quinto non lo legge nessuno.

Niente di tutto questo richiede uno strumento nuovo. Sono decisioni su automazioni che hai
già.

## Da dove partire domani mattina

Serve un foglio e mezz'ora.

Scrivi l'elenco delle automazioni che hai, comprese quelle piccole: il modulo che manda la
mail, il promemoria dell'appuntamento, il messaggio che parte dopo il preventivo. Per ognuna
rispondi a una domanda sola. Se si fermasse stanotte, quanto tempo passerebbe prima che me
ne accorga, e da cosa me ne accorgerei?

Dove la risposta è "me lo direbbe un cliente", hai trovato il punto da sistemare per primo.
Non serve coprirle tutte. Quelle che portano contatti o incassi meritano un avviso, le altre
possono aspettare che qualcuno se ne accorga.

Se in quell'elenco c'è qualcosa che tocca i clienti, prenota una call di quindici minuti:
guardiamo quali sono le automazioni che ti costano davvero quando si fermano, e come mettere
un avviso addosso a quelle, prima delle altre.
