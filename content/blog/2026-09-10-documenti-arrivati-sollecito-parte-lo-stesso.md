---
title: I documenti sono arrivati, ma il sollecito parte lo stesso
slug: documenti-arrivati-sollecito-parte-lo-stesso
date: 2026-09-10
description: Una sequenza di solleciti sa benissimo quando scrivere e quasi mai quando smettere. Come si costruisce la parte che si accorge che il cliente ha già risposto.
tags: [automazioni, solleciti, documenti, pmi]
image: /blog/documenti-arrivati-sollecito-parte-lo-stesso.png
imageAlt: Clessidra di vetro su un tavolo di legno, con la sabbia gia tutta scesa nella parte bassa
imageAi: true
author: Patrick
---

Un'automazione che chiede i documenti a un cliente continua a chiederli finché qualcosa non le
dice di smettere. Che il cliente li abbia già mandati, per lei non è un fatto. È una cosa che deve
poter leggere da qualche parte. Se quel posto non esiste, il sollecito parte lo stesso, e
parte a qualcuno che il suo lavoro lo ha già fatto.

Quindi prima di costruire una sequenza di solleciti si decide un posto solo dove viene scritto che
la roba è arrivata, e si fa in modo che ogni strada da cui può arrivare finisca per scrivere lì.
Anche a mano. Una casella da spuntare sulla scheda del cliente, che chiunque in ufficio può
spuntare, regge meglio di un riconoscimento automatico che funziona su un canale su tre.

## Perché il flusso non si accorge che il documento è arrivato

Un'automazione che sollecita è fatta di due pezzi, e di solito ne viene costruito bene solo uno.
Il pezzo che scrive è la parte facile, si sceglie ogni quanto e si scrive il testo. Il pezzo che
si accorge di dover smettere dipende invece da cosa il flusso riesce davvero a vedere, che è quasi
sempre molto meno di quello che vedi tu.

Quello che vede è un canale solo, per giunta filtrato. La casella di posta che gli hai collegato,
oppure la cartella che gli hai indicato. Il cliente risponde dove gli viene comodo: allega il file
rispondendo a una mail vecchia di tre mesi, lo manda su WhatsApp, lo passa in mano alla persona
che gli risponde al telefono, lo carica sul portale ma nella pratica dell'anno scorso. Per il
flusso non è successo niente. Il giorno dopo scrive di nuovo, e la mail che scrive dice che stiamo
ancora aspettando.

Il danno non è tecnico. Il cliente ha fatto la sua parte e riceve un messaggio che gli dice di
non averla fatta, quindi o pensa che tu abbia perso i suoi documenti, oppure smette di leggere
quello che gli mandi. Nei due casi la prossima volta risponde più tardi.

## Cosa vede davvero un flusso che guarda la posta

Quello che vede davvero sta scritto nella documentazione del nodo che legge la posta.
Quelli qui sotto sono i valori guardati il dieci settembre di quest'anno sulla documentazione di
n8n, e sono cose che le piattaforme riscrivono quando vogliono, quindi il modo giusto di usarli è
andare a guardare i tuoi.

Il nodo che parte sulla posta in arrivo di Gmail non sta in ascolto, controlla ogni tanto a un
intervallo che scegli tu. Puoi dirgli di partire solo sui messaggi con una certa etichetta, solo
su quelli che arrivano da un mittente, o solo su quelli che rispondono a una ricerca scritta con
la sintassi di Gmail. Puoi dirgli se guardare anche in spam e cestino, e di suo non ci guarda.
Ogni giro ne prende un numero limitato, dieci di base e al massimo cinquanta, e il resto lo lascia
in coda per i giri dopo.

La voce che conta di più per un sollecito è quella sullo stato di lettura. Le scelte sono tre:
messaggi già letti e non letti, solo non letti, solo letti. Di base sono solo quelli non letti.
Vuol dire che se la mail del cliente con i documenti allegati
la apre una persona prima che scatti il controllo, per l'automazione quella mail non è mai
arrivata. La condizione che doveva fermare il sollecito è appena stata cancellata da qualcuno che
stava facendo il suo lavoro, cioè leggere la posta.

Lo stesso vale per lo spam. Un allegato pesante mandato da un cliente che ti scrive due volte
l'anno è esattamente il tipo di mail che finisce lì, e finché non accendi tu quella voce il flusso
in spam non guarda.

## Cosa vede un flusso che guarda una cartella

Cambia poco. Anche il nodo che sorveglia Google Drive controlla a intervalli, di suo una volta al
minuto, e nella sua pagina dei problemi noti c'è scritta una cosa che conviene sapere prima. Se
nell'intervallo succedono più cambiamenti, arriva un evento solo che se li porta dentro tutti
insieme. Se il tuo flusso è scritto pensando che ogni caricamento sia una partenza a sé, tre file
caricati di fila dallo stesso cliente possono diventare una partenza sola.

Poi c'è la parte che nessuna documentazione ti risolve. La cartella la guardi tu, il cliente
carica dove gli capita.

## Dove si scrive che il documento è arrivato

Il segno va messo accanto ai dati del cliente, sulla riga della pratica nel gestionale o nel
foglio che usate. Non nella piattaforma di automazione, che prima o poi la cambi, e nemmeno nella
casella di posta, che serve a leggere e non tiene il conto di niente.

Quel campo deve essere scrivibile da tutti e due i lati. Lo scrive il flusso quando riconosce il
documento da solo, e lo scrive a mano la persona che i documenti se li è visti arrivare su
WhatsApp. La parte manuale non è un ripiego da togliere quando l'automazione sarà più brava.
Alcuni canali non saranno mai leggibili da un flusso, e quel campo è il punto dove tutti i canali
si incontrano.

## Arrivato e utilizzabile sono due cose diverse

L'altro modo di sbagliare è opposto e fa meno rumore. Il flusso vede che è arrivato qualcosa,
spegne il sollecito, e quello che è arrivato è la fattura sbagliata o una foto di un documento in
cui non si legge niente. Da quel momento non solleciterà più nessuno, e la cosa viene fuori il
giorno della scadenza.

Per questo di stati ne servono due e non uno: ricevuto e buono. Il primo lo può scrivere
l'automazione, perché vuol dire soltanto che è arrivato un file. Il secondo lo scrive una persona
che lo ha aperto. Il sollecito si ferma sul primo e la pratica va avanti sul secondo, e in mezzo
resta una lista di cose arrivate e mai guardate, che è poi la lista che serve avere.

## Il sollecito deve anche potersi arrendere

Una sequenza che riparte all'infinito finché non riceve risposta è un modo lento per farsi
mettere tra la posta indesiderata. Si decide prima quante volte scrive, e cosa succede quando ha
finito i tentativi.

La risposta giusta quasi mai è che si spegne in silenzio. Quando ha finito, la cosa deve passare a
una persona con scritto sopra da quanto è ferma e quante volte è stato chiesto. Un'automazione che
molla senza dirlo a nessuno lascia una pratica appesa che nessuno sta più guardando, ed è un
peggioramento rispetto alla cartellina sulla scrivania, che almeno stava lì in mezzo.

## Cosa chiedere a chi te lo costruisce

Dove è scritto che questo cliente ha già mandato la roba, e chi lo legge prima di far partire il
sollecito. Se la risposta è che il flusso guarda la posta, chiedi cosa succede quando la mail la
apre qualcuno per primo.

Quali sono i canali da cui un cliente può consegnare, e quale di questi il flusso non vede. Non
per coprirli tutti, ma per sapere quali dipendono da una persona che spunta una casella.

Quante volte scrive prima di fermarsi, e a chi arriva la pratica quando si è fermato.

## Da dove partire domani mattina

Prendi le ultime pratiche chiuse e guarda da dove sono arrivati i documenti davvero. Se più di
qualcuna è arrivata da una strada che la tua automazione non guarda, il problema non è il testo
del sollecito.

Poi chiedi a chi risponde al telefono se qualche cliente si è lamentato di ricevere richieste per
roba già mandata. Non arriva quasi mai come segnalazione, arriva come una frase detta di sfuggita
mentre si parla d'altro.

Se hai una sequenza di solleciti accesa e non sai dove sia scritto che il cliente ha già
risposto, prenota una call di quindici minuti: guardiamo insieme da dove entrano i documenti e
dove andrebbe messo quel segno.
