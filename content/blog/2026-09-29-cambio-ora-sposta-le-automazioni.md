---
title: Il cambio dell'ora sposta anche le tue automazioni
slug: cambio-ora-sposta-le-automazioni
date: 2026-09-29
description: Nella notte tra il 24 e il 25 ottobre si torna all'ora solare. Le automazioni che partono a un orario fisso possono slittare di un'ora, girare due volte o sbagliare il giorno. Cosa controllare prima.
tags: [automazioni, ora legale, fuso orario, n8n, pmi]
image: /blog/cambio-ora-sposta-le-automazioni.png
imageAlt: Una clessidra di vetro con la sabbia chiara che scende, su un tavolo di legno davanti a una parete blu scuro
imageAi: true
author: Patrick
---

Nella notte tra il ventiquattro e il venticinque ottobre si torna all'ora solare, e le automazioni
che partono a un orario fisso non sempre se ne accorgono. Quelle che contano sull'orologio
sbagliato slittano di un'ora da un giorno all'altro. Quelle programmate in piena notte possono
girare due volte, o saltare. E quelle che calcolano "oggi" e "domani" possono assegnare un
appuntamento al giorno sbagliato.

Nessuno di questi errori manda un avviso. Il flusso gira, finisce senza errori, e il messaggio
delle nove arriva alle otto o alle dieci. Il controllo costa poco e va fatto prima del venticinque.
Guarda a che ora sono partite davvero le ultime esecuzioni, non l'ora che hai scritto
nella configurazione, e verifica con quale fuso orario conta la macchina.

## Quando cambia l'ora quest'anno, e cosa succede quella notte

La regola è la stessa per tutta l'Unione europea da una direttiva del duemila. L'ora legale finisce
l'ultima domenica di ottobre, all'una del tempo universale, che in Italia sono le tre di notte. A
quel punto le lancette tornano alle due. Quest'anno la domenica è il venticinque ottobre, e la data
l'ho ricontrollata il ventinove settembre sul database dei fusi orari che usano i computer.

Per una persona è un'ora di sonno in più. Per un'automazione è un'ora che esiste due volte: dalle
due alle tre del venticinque ottobre l'orologio passa due volte dagli stessi minuti. A fine marzo
succede il contrario, e l'ora fra le due e le tre semplicemente non c'è.

Cosa fa un flusso programmato alle due e mezza in una notte così dipende dallo strumento, e non
sempre la documentazione lo dice. Può girare una volta, due volte o nessuna. Nella documentazione
di n8n, alla data di oggi, c'è scritto che per i flussi che girano ogni tot ore o giorni il vecchio
pianificatore in memoria poteva sbagliare di un giro proprio nei passaggi dell'ora legale, e che
quello nuovo li gestisce meglio. Quale dei due stai usando dipende da come è installata la tua
istanza.

La via più semplice è non chiederselo. Niente di importante va programmato fra l'una e le tre di
notte. I lavori notturni, come i salvataggi, le pulizie dei fogli o i riepiloghi del giorno prima,
si spostano mezz'ora prima o dopo quella fascia e quel problema non si pone più.

## Con quale orologio conta il tuo flusso

Ogni automazione che parte a un orario fisso ha un fuso orario, anche quando nessuno l'ha scelto.
Se non l'ha scelto nessuno, lo ha scelto chi ha scritto il programma.

Nel caso di n8n installato sul proprio server il fuso di partenza è quello di New York. È scritto
nella documentazione ufficiale, che ho verificato il ventinove settembre di quest'anno, e può
cambiare con le versioni. Si corregge con una variabile dell'istanza o con l'impostazione del fuso
dentro ogni singolo flusso. Se nessuno ha toccato né l'una né l'altra, il flusso "delle nove" parte
alle nove di New York.

Un esempio, costruito apposta per far vedere il meccanismo. Metti un flusso di solleciti
programmato alle nove, con il fuso lasciato com'era. Oggi quel flusso parte alle tre del pomeriggio
ora italiana. Dal venticinque al trentuno ottobre parte alle due, perché l'Italia ha già
cambiato l'ora e gli Stati Uniti la cambiano una settimana dopo. Dal primo novembre torna alle tre.
Chi ha costruito il flusso probabilmente ha visto partire i messaggi "nel pomeriggio" durante le
prove e non ci ha più pensato.

Qualcosa di simile succede se il server è impostato sul tempo universale. D'estate l'Italia è
avanti di due ore rispetto al tempo universale, d'inverno di una, quindi un flusso che conta su
quell'orologio parte sempre sfasato e il venticinque ottobre lo sfasamento cambia. Se chi l'ha
costruito ha compensato a mano, scrivendo le sette per far partire i messaggi alle nove, da quel
giorno i messaggi arrivano alle otto.

## Perché "domani" per la macchina può essere oggi

Questo errore non si vede dall'orario di partenza, ed è il motivo per cui resta lì a lungo. Molti
flussi fanno un calcolo sulle date: manda il promemoria a chi ha l'appuntamento domani,
sollecita le fatture scadute ieri, riepiloga gli ordini di oggi. Per fare quel calcolo la macchina
deve sapere che giorno è, e lo sa con il suo orologio. Se il suo orologio è sul tempo universale,
a mezzanotte e mezza italiana d'estate per lei sono ancora le dieci e mezza di sera del giorno
prima. Il suo "domani" è il tuo oggi.

Finché il flusso gira alle nove del mattino, la differenza non si vede, perché a quell'ora il giorno
è lo stesso per tutti. Il problema compare quando il flusso gira vicino alla mezzanotte, o quando le
date arrivano da un foglio o da un gestionale che le salva in un fuso diverso da quello in cui le
legge l'automazione. Un appuntamento fissato a mezzanotte e un quarto può finire nel giorno prima.

C'è poi l'effetto sui registri. Se il tuo gestionale scrive gli orari sul tempo universale e tu li
leggi come ora italiana, fino al ventiquattro ottobre li vedi sfasati di due ore e dal giorno dopo di
una. Chi aveva imparato a correggere a mente "sono due ore indietro" dopo il venticinque si sbaglia di un'ora
senza saperlo.

## Cosa chiedere a chi ti ha costruito i flussi

Chiedi con quale fuso orario contano i flussi, e dove è impostato. La risposta buona nomina un
posto preciso, l'istanza o il singolo flusso. "Quello italiano, credo" non è una risposta, e
nemmeno "quello del server", finché nessuno sa dire qual è.

Chiedi anche quali flussi girano di notte fra l'una e le tre e quali calcolano oggi, domani o ieri.
I primi si spostano adesso, non la sera del ventiquattro. Per i secondi, se chi li ha costruiti deve
andare a guardare prima di rispondere è normale. Se non capisce la domanda, hai saputo qualcosa
anche così.

## Da dove partire domani mattina

Apri il registro delle esecuzioni dei flussi che mandano qualcosa ai clienti e guarda l'ora esatta
delle ultime partenze. Confrontala con l'ora che ti aspettavi. Se coincidono e il fuso impostato è
quello di Roma, per l'orario di partenza sei a posto.

Se non coincidono, prima di cambiare qualunque cosa scrivi di quanto sono sfasate e da quando. Poi
imposta il fuso giusto nel flusso e rifai la prova. Correggere a mano, scrivendo un orario diverso
per compensare lo sfasamento, funziona fino al prossimo cambio dell'ora e poi si rompe di nuovo.

Lunedì ventisei ottobre, a metà mattina, riapri lo stesso registro e controlla il fine settimana. È
il giorno in cui un errore di fuso orario si vede meglio, perché ha avuto una notte intera per
succedere.

Se vuoi che guardi i tuoi flussi prima del venticinque e ti dica quali si spostano, prenota una
call dalla pagina contatti. Bastano quindici minuti, e quando il problema è il fuso orario la
correzione è un'impostazione sola.
