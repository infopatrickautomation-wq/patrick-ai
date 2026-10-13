---
title: Il cliente ha chiesto di non essere più contattato, e l'automazione gli ha scritto lo stesso
slug: cliente-chiede-di-non-essere-contattato
date: 2026-10-13
description: Quando un cliente chiede di non ricevere più messaggi, la richiesta arriva in un solo posto e le automazioni che scrivono stanno da un'altra parte. Dove va registrato lo stop, chi lo deve leggere e in quale momento, perché valga per tutti i flussi e tutti i canali.
tags: [automazioni, consenso, disiscrizione, whatsapp, privacy, pmi]
image: /blog/cliente-chiede-di-non-essere-contattato.png
imageAlt: Una serratura di ottone su una porta di legno scuro, in penombra
imageAi: true
author: Patrick
---
Quando un cliente ti chiede di non scrivergli più, la richiesta arriva in un posto solo: una
risposta su WhatsApp, una mail all'ufficio, una telefonata. Le automazioni che gli scrivono invece
possono essere più d'una, ognuna con la sua lista di contatti, e nessuna sa cosa è successo nelle
altre. Per questo un cliente che ha detto basta può ricevere il promemoria il giorno dopo, e la
promozione la settimana seguente.

Perché lo stop valga davvero ci vuole un campo unico, in un posto solo, che dice se quella persona
si può contattare e per cosa. E ogni flusso lo deve leggere subito prima di mandare il messaggio:
leggerlo quando il flusso parte non basta.

## Cosa chiedono il GDPR e WhatsApp quando un cliente dice basta

Ci sono due testi da tenere presenti, e li ho riletti oggi, tredici ottobre.

Il primo è il GDPR. L'articolo ventuno dice che chi riceve comunicazioni di marketing diretto può
opporsi in qualsiasi momento, e che a quel punto i suoi dati non possono più essere usati per
quello scopo. L'articolo sette aggiunge che revocare il consenso deve essere facile quanto darlo.
Se per iscriversi bastava un clic, per uscire non può servire una raccomandata.

Il secondo è la policy di WhatsApp Business, nella versione aggiornata a fine settembre di
quest'anno. Chiede alle aziende di rispettare ogni richiesta di bloccare, interrompere o comunque
smettere di ricevere messaggi, e specifica che vale sia che la richiesta arrivi su WhatsApp sia
che arrivi da un'altra parte. Chiede anche di togliere quella persona dalla lista dei contatti.
Sono regole che Meta cambia, quindi prima di costruirci sopra controlla la versione in vigore.

Quel "da un'altra parte" è il punto che mette in difficoltà le automazioni. Se il cliente lo dice
al telefono a chi risponde in ufficio, per la policy di WhatsApp conta lo stesso, e il flusso che
gli manda messaggi non ne sa niente.

Non sono un avvocato, e su cosa conta come marketing nel tuo caso specifico è meglio sentire chi
ti segue sulla privacy. Quello che posso raccontare è cosa succede dentro i flussi quando la
richiesta arriva.

## Perché la richiesta non arriva a tutte le automazioni

Un'automazione che manda messaggi di solito funziona così. Parte, prende una lista di contatti da
qualche parte (un foglio, il CRM, il gestionale) e scrive a chi c'è dentro. Se lo stop non è
scritto in quella lista, per il flusso il cliente è contattabile. E lo stop non sempre passa da
quella lista.

Se il cliente si disiscrive dalla newsletter, la disiscrizione la registra lo strumento delle
newsletter, dentro la sua lista. Il flusso che manda i promemoria su WhatsApp legge un'altra lista
e non la vede.

Se risponde "non scrivetemi più" a un messaggio automatico, per il flusso quella è una risposta
come le altre. Una frase come "basta così, grazie" non la riconosce nessuna regola che non sia
stata scritta apposta. Se nessuno ha costruito la parte che legge le risposte, il messaggio resta
lì, come ho raccontato nel [pezzo sulle risposte che non legge
nessuno](/blog/risposta-del-cliente-che-nessuno-legge).

Se lo dice a voce, nel migliore dei casi finisce in un appunto sulla scrivania di chi ha risposto.

## Perché il messaggio parte anche dopo lo stop

Un flusso che manda una sequenza (il primo messaggio oggi, il secondo fra una settimana) legge il
contatto quando parte e poi aspetta. Se nel frattempo il cliente chiede di smettere, il flusso ha
ancora in mano i dati di quando è partito, e il secondo messaggio parte lo stesso. È lo stesso
meccanismo del [promemoria che arriva dopo la
disdetta](/blog/promemoria-che-arriva-dopo-la-disdetta), con una conseguenza più seria, perché qui
il cliente ti aveva chiesto in modo esplicito di non farlo.

Per questo il controllo va messo subito prima di ogni invio, non all'inizio del flusso. Il flusso
riapre la scheda del cliente, guarda il campo, e solo se dice che si può scrivere manda il
messaggio. Costa una lettura in più a ogni giro, e in cambio uno stop arrivato stamattina ferma
anche il messaggio che era in coda da martedì scorso.

## Uno stop vale per tutti i messaggi o solo per le promozioni

Chi dice "non mandatemi più offerte" probabilmente vuole ancora sapere che domani ha
l'appuntamento. Chi dice "non scrivetemi più" forse no. Anche la policy di WhatsApp, fra le buone
pratiche, chiede di spiegare come si esce da categorie specifiche di messaggi. Se tratti ogni stop
come uno stop a tutto, il cliente che voleva solo meno offerte non riceve più nemmeno il
promemoria dell'appuntamento.

Quindi il campo non può essere un sì o un no. Serve sapere almeno per cosa vale lo stop (solo le
promozioni o tutto), da quando, da dove è arrivato, chi l'ha registrato. L'ultima parte serve il
giorno in cui il cliente ti chiede perché gli hai scritto: se lo stop è del giorno dopo il
messaggio, lo puoi dimostrare.

Quando la richiesta è ambigua, un flusso non dovrebbe decidere da solo. "Per ora no, grazie" dopo
una promozione e "smettetela" dopo un promemoria non si interpretano con una regola. La cosa
sensata è che il flusso blocchi gli invii di marketing subito, per prudenza, e passi la risposta a
una persona che decide il resto.

## Il contatto che torna dalla porta di servizio

Uno stop si perde anche quando qualcuno importa di nuovo una lista vecchia, per esempio un file di
contatti esportato mesi fa o un foglio ritrovato in una cartella condivisa. Se l'importazione
sovrascrive le schede, oppure crea schede nuove al posto di aggiornare quelle che ci sono, il
cliente che aveva chiesto di uscire rientra nella lista come se niente fosse, e l'automazione
ricomincia a scrivergli.

Un'importazione non deve poter cancellare uno stop, e chi importa deve controllare prima la lista
degli stop. Va deciso una volta e scritto, perché chi fa l'importazione di solito non è chi ha
costruito i flussi.

## Dove va registrato lo stop

Lo stop lo terrei in un posto solo. Di solito è il CRM, o la scheda cliente del gestionale, cioè
il posto che consideri la versione vera dei tuoi clienti. Gli altri strumenti possono avere le
loro liste, ma quella che decide è una.

Tutte le strade che portano uno stop finiscono lì. La disiscrizione dalla newsletter viene copiata
nel campo, la risposta su WhatsApp che sembra uno stop viene segnata e passata a una persona, la
richiesta arrivata a voce la scrive chi l'ha ricevuta, con un modulo semplice che non costringe ad
aprire altri programmi.

Ogni flusso che scrive ai clienti legge quel campo subito prima di mandare. Nessuna eccezione per
il flusso "tanto manda solo promemoria", perché anche i promemoria vanno fermati se il cliente ha
chiesto di non ricevere più niente.

E ogni stop resta scritto con data e provenienza, anche quando il cliente un giorno chiede di
rientrare. In quel caso si aggiunge una riga, non si cancella quella vecchia.

## Cosa fare domani mattina

Fai l'elenco di tutto quello che manda messaggi ai tuoi clienti senza che una persona prema invio:
newsletter, promemoria, solleciti, sequenze dopo un preventivo. Per ognuno chiediti da dove prende
la lista e se lì dentro uno stop arrivato da un altro canale si vede.

Poi fai una prova con te stesso. Inserisciti come cliente, iscriviti a tutto, e chiedi di non
essere più contattato da un canale solo. Aspetta e guarda cosa ti arriva ancora.

Se vuoi che guardiamo insieme dove finiscono oggi gli stop dei tuoi clienti e come farli arrivare
a tutti i flussi, prenota una call dalla pagina contatti.
