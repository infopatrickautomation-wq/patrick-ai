---
title: Come si prova un'automazione senza mandare mail vere ai clienti
slug: provare-automazione-senza-mandare-mail-vere
date: 2026-09-01
description: Sulle piattaforme di automazione il tasto di prova non simula niente, esegue. Quello che si cambia prima di provare è il destinatario, e serve qualcuno che lo rimetta a posto prima di accendere.
tags: [automazioni, prove, errori, pmi]
image: /blog/provare-automazione-senza-mandare-mail-vere.png
imageAlt: Anelli concentrici che si allargano sulla superficie scura dell'acqua dopo la caduta di una goccia
imageAi: true
author: Patrick
---

Su quasi tutte le piattaforme con cui si costruiscono automazioni non esiste una modalità prova.
Quando premi il tasto per testare un passaggio, quel passaggio viene eseguito davvero, e la mail
arriva al cliente che sta scritto nel campo del destinatario. Nella documentazione di Zapier c'è
scritto senza giri di parole, che provando un passaggio di azione la piattaforma compie l'azione per
conto tuo, e che il test è dal vivo e può portare modifiche dentro la tua applicazione.

Da lì viene la regola pratica. Prima di una prova si cambia il destinatario, non la modalità,
perché una modalità che finge non c'è. Ci metti il tuo indirizzo al posto di quello del cliente,
oppure un contatto inventato sul gestionale. Poi qualcuno deve ricordarsi di rimettere a posto quei
campi prima di accendere, e quel passaggio lì nessuna piattaforma lo fa per te.

## Cosa succede quando premi prova

Zapier lo scrive nella pagina su come si provano i passaggi di uno zap. Il test compie l'azione, e
le modifiche restano dentro l'applicazione collegata. Se il passaggio manda una mail, la mail è
partita, e non c'è nessun posto dove annullarla.

Su Make il pulsante che esegue lo scenario una volta serve alla stessa cosa, e nella guida ufficiale
l'esempio si chiude con il messaggio che arriva davvero nel canale, più i numeri sopra ogni modulo
che dicono quante operazioni hai consumato. Anche quelle sono operazioni vere, contate come tutte
le altre.

Le condizioni stanno nella documentazione ufficiale delle piattaforme, guardata all'inizio di
settembre di quest'anno. Le riscrivono quando vogliono, quindi vale la pena riaprire quelle pagine
invece di fidarsi di questa.

## Si può falsificare l'entrata, mai l'uscita

Sull'entrata gli strumenti ci sono. In n8n puoi bloccare il risultato di un passaggio e riusare quei
dati salvati invece di andarli a prendere di nuovo ogni volta, così mentre costruisci non tempesti
di richieste il sistema dall'altra parte. Anche Make ha qualcosa di simile, cioè la possibilità di
rieseguire lo scenario con i dati di una partenza precedente invece di aspettare che arrivi
qualcosa di nuovo.

Nella documentazione di n8n c'è però una riga da leggere due volte. Le esecuzioni di produzione
ignorano i dati bloccati. Il blocco vale nell'editor, mentre stai lavorando, e smette di valere
quando il flusso gira acceso. Quindi quello che hai visto funzionare non è esattamente quello che
partirà. Nell'editor leggeva una copia ferma e pulita; acceso va a prendere il dato vero, e il dato
vero arriva come capita.

Sull'uscita non esiste niente del genere, nessun interruttore che dica alla piattaforma di fare
finta. Se il passaggio manda, manda.

## Come si prova senza toccare i clienti veri

La strada più veloce è mettere il proprio indirizzo nel campo del destinatario, e funziona finché
uno si ricorda di toglierlo. Sulla memoria di una persona il venerdì pomeriggio non si costruisce
niente, quindi dove si può conviene la strada più lunga, cioè lasciare stare il campo e puntare
tutto il ramo verso un posto diverso. Un foglio di prova, o una cartella apposta. Un secondo posto
lo lasci lì e non fa danni, mentre un campo modificato prima o poi qualcuno lo dimentica.

Sul gestionale, un contatto di prova con un nome riconoscibile a colpo d'occhio vale più di uno
scritto bene. Se si chiama come un cliente vero, prima o poi finisce dentro un'esportazione e
qualcuno gli scrive.

Conviene anche mettere i passaggi in ordine. Quelli che leggono si provano quante volte vuoi,
perché non lasciano tracce da nessuna parte. Quelli che scrivono si provano una volta sola, dopo
aver controllato dove andranno a scrivere.

Per l'ultimo passaggio, quello che parla al cliente, la prova migliore è tenerlo spento per i primi
giorni. Il flusso prepara e lascia in bozza, una persona guarda e manda. Quelle bozze in una
settimana dicono quello che in editor non si vede, e intanto al cliente non arriva niente di storto.

## Il caso che non hai provato è quello che ti aspetta

Quando si prova, si prova la giornata normale, cioè il modulo compilato bene e la richiesta che
assomiglia a tutte le altre. Il resto arriva dopo. Il modulo mandato due volte in un minuto perché
la pagina sembrava bloccata, il campo lasciato vuoto, il nome scritto tutto in maiuscolo, la
risposta del cliente che entra quando il flusso aveva già chiuso la pratica.

Aspettare che quelle cose capitino da sole per vedere l'effetto è un piano che si paga in clienti.
Si inventano prima. Si scrive a mano il dato storto e si guarda cosa fa il flusso, e la funzione per
farlo esiste ed è documentata. In n8n i dati bloccati si possono modificare a mano proprio per
provare situazioni diverse senza doverle far succedere davvero nel sistema di partenza.

Quali inventare lo decidi guardando il tuo lavoro. Le stranezze che chi sta al telefono conosce a
memoria sono già la lista giusta, perché sono quelle che entrano dal tuo modulo il martedì mattina.

## Il primo giorno acceso

L'accensione si può dosare. Una sola sorgente, o una fascia oraria, o un tipo di richiesta soltanto,
e si allarga dopo qualche giorno. Nel frattempo si guarda il registro delle esecuzioni, uno per uno
per i primi giri, confrontando cosa è entrato e cosa è uscito.

Prima di allargare c'è una domanda sola, ed è quella che salva il primo giorno. Qualcuno ha rimesso
a posto tutti i campi che erano stati puntati altrove per le prove?

## Cosa chiedere a chi te la costruisce

Fatti far vedere l'ultima esecuzione di prova e dove è finita. Non il racconto di com'è andata, la
riga nel registro, con dentro il destinatario.

Poi chiedi quali campi sono stati cambiati per provare e chi li ha rimessi al loro posto, perché
quella è l'unica parte del lavoro che non lascia traccia da nessuna parte.

L'ultima domanda è quella che quasi nessuno fa. Fatti far vedere il flusso mentre gli arriva un dato
sbagliato, e se la risposta è che con i dati giusti funziona, la prova non c'è stata.

## Da dove partire domani mattina

Prendi l'automazione che manda qualcosa ai tuoi clienti e apri l'elenco delle esecuzioni. Vai
indietro fino al giorno in cui è stata accesa e guarda le prime righe.

Se fra i destinatari trovi il tuo indirizzo o un nome inventato, bene, vuol dire che qualcuno l'ha
provata prima di accenderla. Se invece le prime esecuzioni sono già andate su clienti veri, la prima
cosa che quel flusso ha fatto in vita sua è stata una prova su qualcuno che pagava.

Se hai automazioni accese e non sai come sono state provate, prenota una call di quindici minuti:
apriamo insieme il registro delle esecuzioni e guardiamo da dove è partita la prima.
