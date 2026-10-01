---
title: L'automazione che legge le tue fatture può anche cancellarti la posta
slug: automazione-legge-fatture-puo-cancellare-la-posta
date: 2026-10-01
description: Quando colleghi Gmail o Drive a un'automazione, il permesso che concedi spesso vale per tutta la casella o tutto il Drive, anche se al flusso serve una cartella sola. Come vedere cosa hai concesso e come restringerlo.
tags: [automazioni, permessi, gmail, google drive, sicurezza, pmi]
image: /blog/automazione-legge-fatture-puo-cancellare-la-posta.png
imageAlt: Una chiave di ottone con il suo anello appoggiata su un tavolo di legno scuro, in una luce calda laterale
imageAi: true
author: Patrick
---

Quando colleghi la tua casella Gmail a un'automazione, il permesso che dai può coprire molto più
di quello che il flusso deve fare. Se il flusso legge le fatture in arrivo, il permesso concesso
può valere anche per scrivere, spedire e cancellare definitivamente qualunque mail della casella.
Lo stesso succede con Google Drive: il flusso deve salvare un PDF in una cartella, e il permesso
copre tutti i file del Drive.

Il flusso non usa quei poteri finché nessuno glieli chiede. Però li ha, e può usarli qualunque cosa
passi da quella connessione: un passaggio scritto male, un modello AI che interpreta
male un'istruzione, una persona che entra nell'account dello strumento. Il rimedio è dare al flusso
solo il permesso che gli serve, e controllare una volta cosa hai già concesso.

## Cosa autorizzi davvero quando clicchi "Consenti"

Ogni collegamento con un account Google passa da una schermata in cui Google elenca cosa l'app potrà
fare. Dietro quell'elenco ci sono degli ambiti di accesso, che Google chiama scope, ognuno con un
nome e una descrizione precisa.

Per Gmail la differenza fra un ambito e l'altro è grande. Nella documentazione di Google, che ho
verificato il primo ottobre di quest'anno, l'ambito più largo è descritto così: leggere, comporre,
inviare ed eliminare definitivamente tutte le mail. Google stessa scrive di chiederlo solo se
l'applicazione deve cancellare messaggi in modo immediato e permanente, saltando il cestino.
Accanto ci sono ambiti molto più stretti: uno permette solo di leggere i messaggi e le
impostazioni, uno solo di inviare, uno vede soltanto le intestazioni e le etichette senza il testo
delle mail.

Per Drive vale lo stesso discorso. L'ambito largo permette di vedere e gestire tutti i file. Quello
stretto riguarda solo i file creati dall'applicazione o aperti con lei, e la documentazione di
Google consiglia in generale di scegliere l'ambito più ristretto possibile.

La schermata di consenso questo lo dice, in una riga che è facile saltare quando stai cercando di
far funzionare un collegamento e hai fretta.

## Perché gli strumenti chiedono il permesso più largo

Chi scrive uno strumento di automazione vuole che il nodo Gmail funzioni per tutte le operazioni
che offre, dalla lettura alla cancellazione. Il modo più semplice è chiedere tutto subito, una volta
sola, così nessuno resta bloccato a metà.

Prendo n8n come esempio perché il codice è pubblico. Ho guardato il primo ottobre la definizione
della connessione Gmail nel repository ufficiale: fra gli ambiti richiesti di base c'è anche quello
completo, quello che permette la cancellazione definitiva. Per Drive, fra quelli di base c'è
l'accesso a tutti i file. In entrambi i casi esiste un'opzione per scegliere gli ambiti a mano, con
un avviso che dice che cambiandoli il nodo potrebbe non funzionare. Sono scelte che il progetto può
cambiare con le versioni, quindi vale la pena ricontrollarle sulla tua.

Chiedere tutto subito è la scelta comoda, ed è scritta in chiaro nel codice. Vuol dire però che, se nessuno ci ha pensato,
il flusso che archivia le fatture ha in mano le chiavi dell'intera casella.

## Cosa può andare storto con un permesso troppo largo

Il flusso che fa il suo lavoro non cancella niente da solo. Il guaio più banale è un errore di
costruzione. Un filtro che doveva selezionare le mail di un fornitore e invece le prende tutte, collegato a un passaggio che sposta o elimina, fa danni in proporzione al
permesso che ha. Con il permesso di sola lettura lo stesso errore non può fare niente.

Più delicati sono i flussi con dentro un modello AI che decide cosa fare. Se il modello legge il
testo delle mail in arrivo e può scegliere quale azione eseguire, una mail scritta apposta per
confonderlo diventa un modo per dargli istruzioni. Quello che riesce a fare dipende da quali azioni
gli hai messo a disposizione e da quali permessi ha la connessione sotto. I permessi sono
l'ultimo limite: anche se il modello sbaglia e il flusso è configurato male, Google non lascia fare
alla connessione più di quello che le hai concesso.

Poi c'è l'accesso allo strumento stesso. Chi entra nell'account dello strumento di automazione,
con una password rubata o perché è un ex collaboratore che nessuno ha tolto, usa le connessioni già
fatte senza bisogno di conoscere la password della tua mail.

In ogni caso la domanda da farsi è la stessa: nel caso peggiore, cosa può fare questa
connessione. Se la risposta è "tutto", c'è un problema di permessi, anche se finora non è successo
niente.

## Come si vede cosa hai già concesso

Per gli account Google c'è una pagina apposta, quella dei collegamenti con terze parti, che trovi
dentro il tuo account Google alla voce sull'accesso all'account. Ogni app collegata ha la sua scheda
con i dettagli di cosa può fare, e da lì si toglie l'accesso. Il percorso è quello indicato dalla
guida di Google al primo ottobre, e Google ogni tanto lo sposta.

Aprila con l'account che usano le tue automazioni, non solo con il tuo. Ci puoi trovare app che
nessuno ricorda di aver collegato, prove fatte mesi fa e mai tolte, e strumenti che hanno l'accesso
completo alla posta per fare una cosa piccola.

Prima di togliere un accesso, però, scopri quale flusso lo usa. Se lo togli a un'app che serve, il
flusso si ferma, e lo fa nel modo descritto in un altro pezzo: senza dirlo a nessuno.

## Come si restringe senza rompere il flusso

Il lavoro si fa un flusso alla volta, partendo da quelli che toccano la posta.

Per ogni flusso scrivi cosa fa davvero con la casella. Se legge le mail e salva gli allegati, gli
basta la sola lettura. Se deve anche segnare le mail come lette o spostarle in un'etichetta, serve
l'ambito che permette di modificare, che secondo Google non consente la cancellazione definitiva
saltando il cestino. Se deve solo mandare messaggi, basta l'ambito di invio. L'accesso completo,
sempre secondo Google, serve solo a chi deve cancellare in modo definitivo, e se un flusso lo chiede
va capito perché.

Poi crea una connessione nuova con gli ambiti giusti, invece di modificare quella esistente. La
colleghi al flusso, fai una prova su una mail di test e controlli che ogni passaggio funzioni. Solo
dopo togli la vecchia connessione dalla pagina dei collegamenti. Se la prova fallisce con un errore
di permessi, l'ambito era troppo stretto per quell'operazione, e lo allarghi di un gradino solo.

Una soluzione che aiuta parecchio è non usare la casella principale. Le fatture dei fornitori
possono arrivare a un indirizzo dedicato, e il flusso si collega solo a quello. Così anche il
permesso più largo, se proprio serve, vale per una casella che contiene solo fatture.

Lo stesso vale fuori da Google. Molti gestionali e CRM permettono di creare chiavi di accesso con
permessi scelti invece di usare quella dell'amministratore. Quando lo strumento lo permette, una
chiave per flusso con il minimo indispensabile è quella da preferire.

## Cosa chiedere a chi ti ha costruito i flussi

Chiedi con quale account è collegato ogni flusso e con quali ambiti. La risposta buona è un elenco,
flusso per flusso. "Ho dato i permessi che servivano" va bene solo se chi lo dice sa anche nominarli.

Chiedi poi quali flussi hanno un modello AI che sceglie le azioni, e quali azioni ha a disposizione.
Un modello che legge le mail e può solo scrivere una bozza da approvare è una cosa. Uno che legge le
mail e può spedire, spostare o cancellare è un'altra, e merita un permesso stretto e un controllo
umano prima delle azioni che non si annullano.

## Da dove partire domani mattina

Apri la pagina dei collegamenti con terze parti dell'account Google che usano le tue automazioni.
Per ogni app con accesso alla posta o al Drive, scrivi accanto quale flusso la usa e cosa fa. Quelle
a cui non sai associare un flusso sono le prime da capire.

Poi prendi il flusso che legge la posta e chiediti di quale ambito ha bisogno davvero. Se gli basta
leggere, rifai la connessione in sola lettura, provala su una mail di test e togli quella vecchia.
Basta farlo su un flusso solo per vedere se fra il permesso che serviva e quello che avevi dato
c'era differenza, e quanta.

Se vuoi che guardi insieme a te i permessi dei tuoi flussi e ti dica quali si possono stringere,
prenota una call dalla pagina contatti. In quindici minuti si capisce quale stringere per primo.
