---
title: La fattura partita per sbaglio non si annulla
slug: fattura-partita-per-sbaglio-non-si-annulla
date: 2026-09-22
description: Una mail sbagliata si sistema con una mail di scuse. Una fattura elettronica che ha passato il Sistema di Interscambio è emessa, e si corregge solo con una nota di credito. Cosa cambia quando a mandarla è un'automazione, e cosa non farle fare.
tags: [automazioni, fatture, fatturazione elettronica, errori, pmi]
image: /blog/fattura-partita-per-sbaglio-non-si-annulla.png
imageAlt: Un mezzo guscio d'uovo vuoto, con l'interno verde scuro, posato su un tessuto grigio
imageAi: true
author: Patrick
---

Una fattura elettronica che ha superato i controlli del Sistema di Interscambio è emessa, e da
quel momento non esiste un modo per farla sparire. Se era sbagliata, o non doveva partire, la
strada è una nota di credito che la storna, cioè un secondo documento che passa anche lui dal
Sistema di Interscambio e resta nei registri accanto al primo. Qui sta la differenza tra
automatizzare le mail e automatizzare le fatture. La mail sbagliata costa una mail di scuse, la
fattura sbagliata costa un documento in più e una telefonata al commercialista.

Per questo, se un'automazione tocca le fatture, il passaggio che spedisce va trattato in modo
diverso da tutto il resto del flusso. Il flusso può raccogliere i dati, preparare la bozza,
controllare che ci sia tutto e metterla in fila. La spedizione la conferma una persona, oppure
la fa il flusso, e allora il numero si decide una volta sola, le ricevute vengono lette da
qualcuno, e nessun tentativo automatico riparte da capo.

Per la parte fiscale c'è il commercialista. Qui parlo di cosa deve sapere chi costruisce il
flusso, perché le regole della fattura elettronica sono scritte per chi manda una fattura alla
volta.

## Perché una fattura elettronica non si può cancellare

Il percorso è sempre lo stesso. Il tuo gestionale, o il servizio di fatturazione che usi, manda
un file al Sistema di Interscambio dell'Agenzia delle Entrate. Il sistema fa dei controlli e
risponde con una ricevuta. Nella guida dell'Agenzia, nella versione di dicembre dell'anno scorso
guardata il ventidue settembre di quest'anno, i casi sono tre: ricevuta di scarto se i controlli
falliscono, ricevuta di consegna se la fattura è arrivata al destinatario, ricevuta di
impossibilità di recapito se i controlli sono passati ma il canale del cliente non era
raggiungibile. Sono regole che l'Agenzia può riscrivere.

Con una ricevuta di consegna, la fattura è emessa. Con una ricevuta di impossibilità di
recapito, anche. Solo lo scarto vuol dire che la fattura non è mai esistita.

Una fattura emessa con un errore dentro si corregge con una nota di variazione in diminuzione,
che nel formato elettronico è il documento chiamato nota di credito. Anche quello passa dal
Sistema di Interscambio, anche quello va registrato, e il cliente li riceve tutti e due. Non c'è
un pulsante per ritirare la prima.

## Cosa succede quando l'automazione riprova

Le piattaforme di automazione hanno un'opzione per ritentare un passaggio che ha dato errore.
Serve per le chiamate che vanno in timeout. Se il passaggio manda una mail, il peggio che può
succedere è un doppione, brutto ma si assorbe. Se manda una fattura, tutto dipende dal numero
che il tentativo si porta dietro.

Le specifiche tecniche del Sistema di Interscambio, alla versione in vigore il ventidue
settembre di quest'anno, descrivono un controllo di unicità fatto apposta per impedire il doppio
inoltro di un documento già trasmesso. Il controllo guarda tre dati: chi emette, l'anno della
data fattura e il numero. Se coincidono con quelli di una fattura già elaborata, e per quella
fattura non era stato mandato uno scarto, il nuovo file viene rifiutato come duplicato.

Se il flusso ritenta lo stesso file, con lo stesso numero, il Sistema di Interscambio lo ferma
lui. Il secondo invio torna indietro scartato, e la fattura emessa resta una sola. Se invece il
flusso, a ogni tentativo, chiede al gestionale un numero nuovo e ricompila il documento, il
controllo non scatta, perché i tre dati sono diversi. A quel punto hai due fatture vere per la
stessa prestazione, e la seconda si toglie solo con una nota di credito.

La regola è l'opposto di quella che viene naturale. Il tentativo di riprova deve rimandare la
stessa fattura, mai rifarla. Il numero si assegna una volta, prima del primo invio, si salva
sulla pratica, e ogni tentativo successivo usa quello. Se il flusso non è costruito così,
l'opzione di riprova sul passaggio che spedisce va spenta, e il fallimento va in mano a una
persona.

Lo stesso danno lo fanno due esecuzioni partite insieme che leggono lo stesso ultimo numero e lo
aumentano di uno: escono due fatture con lo stesso numero, il Sistema di Interscambio scarta la
seconda, e la numerazione intanto è andata avanti. Il numero lo deve dare il gestionale, che è
fatto per contare, e il flusso deve solo chiederglielo.

## Lo scarto arriva dopo, e non dove stai guardando

La ricevuta di scarto non è immediata. Per la guida dell'Agenzia i tempi di controllo e consegna
vanno da pochi minuti a un massimo di cinque giorni, quando il sistema ha molte fatture in coda.
Una circolare dell'Agenzia del luglio di otto anni fa dice che la fattura scartata si considera
non emessa e va rimandata, corretta, entro cinque giorni dalla notifica di scarto,
preferibilmente con la stessa data e lo stesso numero del documento originario.

Un'automazione che manda il file, riceve la risposta "preso in carico" e segna la pratica come
fatturata non vedrà mai quello scarto. La ricevuta torna sul canale con cui il file è stato
mandato, cioè sul tuo servizio di fatturazione o sulla sua casella, non nel flusso. Se nessuno
ascolta lì, la fattura risulta fatta nel CRM e non esiste per il fisco, e te ne accorgi quando
il commercialista fa i conti.

Il flusso deve avere un secondo pezzo, separato dal primo, che rilegge le ricevute e aggiorna la
pratica. Gli stati sono almeno tre: inviata, emessa, scartata. Una pratica ferma su "inviata" da
più di qualche giorno va guardata. Una pratica su "scartata" va a una persona con il motivo
dello scarto e con la data, perché i cinque giorni per rimandarla decorrono da lì e nel
frattempo il gestionale può aver assegnato il numero successivo a un'altra fattura.

## Non consegnata non vuol dire non emessa

Con le mail e i messaggi, "non consegnato" vuol dire che il destinatario non ha ricevuto niente.
Con le fatture è il contrario. La ricevuta di impossibilità di recapito dice che i controlli
sono passati e il file non è arrivato al canale del cliente. La fattura è emessa lo stesso per
chi la manda, il documento viene messo a disposizione del cliente nella sua area riservata sul
portale dell'Agenzia, e la guida chiede al fornitore di avvisare il cliente per un'altra via,
con una mail o una telefonata, che la fattura è lì.

Per un'automazione questo cambia la logica del ramo di errore. Se il flusso tratta la ricevuta
di impossibilità di recapito come un fallimento e ritenta, produce un duplicato, o una seconda
fattura se il numero cambia. Va trattata come un esito riuscito con un compito in più, cioè
avvisare il cliente. Quel compito è una mail normale e si automatizza bene, ma in un ramo suo,
separato da quello degli errori.

## Un esempio, costruito apposta

Immagina uno studio che a fine mese fattura le pratiche chiuse. Il flusso legge le pratiche dal
CRM, per ognuna prepara la fattura nel gestionale e la manda. Un mese il servizio di
fatturazione è lento, tre chiamate vanno in timeout, l'opzione di riprova le rifà con tre numeri
nuovi. Le prime tre erano state prese in carico, quindi sono emesse, e le seconde tre anche. Il
lavoro del giorno dopo sono tre note di credito, tre telefonate ai clienti che hanno ricevuto
due fatture, e un mese di registri con sei righe dove ne servivano tre.

Lo stesso flusso con il numero assegnato una volta sola avrebbe prodotto tre fatture emesse e
tre scarti per duplicato, che finiscono in una lista e che una persona archivia in cinque
minuti.

## Cosa far fare all'automazione, e cosa no

Il flusso può fare tutto quello che sta prima della spedizione: raccogliere i dati dalla
pratica, controllare che partita IVA, codice destinatario e importi ci siano, preparare la bozza
nel gestionale, metterla in una lista "pronte da inviare". Su quella lista vale la pena che una
persona guardi e confermi, almeno per i primi mesi. Il tempo che ci vuole a confermare dieci
bozze è meno del tempo che ci vuole a fare una nota di credito.

Se la spedizione la fa il flusso, le tre regole: il numero lo dà il gestionale e si scrive sulla
pratica prima del primo invio; la riprova rimanda lo stesso documento o non esiste; le ricevute
le legge un secondo flusso che aggiorna gli stati e passa scarti e mancati recapiti a una
persona.

Il flusso, invece, non deve decidere da solo se una fattura va emessa. A settembre è girato su
Hacker News un esperimento in cui dei modelli di linguaggio, messi a gestire delle piccole
attività vere, hanno emesso fatture che non corrispondevano a niente. Un modello può compilare
una bozza partendo da una pratica. La decisione che una prestazione è finita e va fatturata
spetta a una persona, e deve restare un campo spuntato a mano, mai qualcosa che un modello
deduce dalle mail.

## Da dove partire domani mattina

Apri il flusso che tocca le fatture, se ce l'hai, e guarda il passaggio che spedisce. Se ha la
riprova accesa, chiediti da dove prende il numero a ogni tentativo. Se la risposta è "lo chiede
al gestionale ogni volta", spegnila oggi.

Poi cerca dove finiscono le ricevute di scarto. Se stanno nel pannello del servizio di
fatturazione e lo apre qualcuno ogni tanto, metti un promemoria settimanale finché non c'è un
flusso che le legge.

Se un flusso così non ce l'hai ancora e stai pensando di costruirlo, prenota una call di
quindici minuti: guardiamo insieme come fattura oggi il tuo gestionale e ti dico quale pezzo
conviene automatizzare per primo e quale invece conviene lasciare a una spunta.
