---
title: L'automazione che non fa niente ti costa lo stesso
slug: automazione-che-non-fa-niente-costa-lo-stesso
date: 2026-08-25
description: Quanto paghi ogni mese per un'automazione dipende dall'unità con cui la piattaforma la conta, non da quanto lavoro ti toglie. Come si legge la pagina dei consumi e cosa conviene spegnere per primo.
tags: [automazioni, costi, abbonamenti, pmi]
image: /blog/automazione-che-non-fa-niente-costa-lo-stesso.png
imageAlt: Una candela accesa su un piattino di ottone, sola su un tavolo di legno scuro in una stanza in penombra
imageAi: true
author: Patrick
---

Quanto paghi ogni mese per tenere accesa un'automazione dipende dall'unità con cui la
piattaforma la conta, e quell'unità cambia da uno strumento all'altro. Lo stesso identico flusso
può costarti una cosa sola per ogni giro completo, oppure una per ogni singolo passaggio che
contiene. Quando compri, la differenza non si vede. Si vede sulla bolletta del terzo mese.

Sul conto pesa anche una cosa che con i risultati non c'entra. Un flusso che va a controllare se
è arrivato qualcosa e non trova niente, su certe piattaforme consuma lo stesso. Quello che paghi
dipende quindi da quante volte la macchina si accende, e ogni quanto si accende l'ha deciso chi
l'ha costruita, in un pomeriggio, senza che dopo nessuno tornasse a guardare.

## In che unità ti stanno contando

Le piattaforme che si usano per queste cose contano in modi diversi, e conviene sapere quale ti
riguarda prima di far costruire qualcosa.

n8n conta le esecuzioni, e un'esecuzione è un giro intero del flusso. Sul loro sito è scritto che
non importa quanti passaggi ci sono dentro né quanti dati vengono elaborati, resta comunque una
sola esecuzione. Zapier conta le azioni riuscite, quindi ogni passaggio che fa qualcosa è una
voce a sé, mentre il primo passaggio, quello che sta in ascolto, non costa niente. Make conta le
operazioni, e nella loro definizione un'operazione è il singolo modulo che gira, sia per
elaborare dati sia per controllare se ce ne sono di nuovi.

Sono condizioni scritte nella documentazione ufficiale delle tre piattaforme, verificate alla
fine di agosto di quest'anno. Le cambiano quando vogliono, quindi la data conta quanto il fatto.

Il risultato pratico è che la forma del flusso decide il prezzo. Un flusso lungo, con molti
passaggi, viene poco dove si paga il giro e parecchio dove si paga il passaggio. Un flusso che
ogni volta si porta dietro tante righe, per esempio tutti i contatti di un elenco, si comporta al
contrario. Chi te lo costruisce sceglie quella forma per motivi tecnici suoi, e la scelta te la
ritrovi addosso ogni mese.

## Perché un'automazione ferma può costare lo stesso

Un flusso parte in due modi. O qualcuno bussa, e cioè un altro programma avvisa che è successa
una cosa nel momento in cui succede. Oppure è il flusso che ogni tanti minuti va a vedere se nel
frattempo è arrivato qualcosa.

Il secondo modo si costruisce quasi sempre, perché funziona con tutto e non richiede di andare a
configurare niente dall'altra parte. Ed è anche quello che gira di notte, alla domenica e a
ferragosto con la stessa frequenza dei giorni pieni.

Dove il controllo è un'unità contata, quel flusso consuma anche nelle settimane in cui non
succede niente. Nella documentazione di Zapier è scritto che i controlli a vuoto non costano e
che a costare sono solo le azioni riuscite. Nella definizione di Make il controllo rientra
nell'operazione. Sono due modi ragionevoli di far pagare un servizio, e a parità di lavoro fatto
portano a bollette diverse.

Da qui non segue che bisogna controllare più di rado. Segue che vale la pena sapere quali dei
tuoi flussi stanno a controllare e quali invece vengono avvisati, perché per molte sorgenti la
seconda strada esiste già e non l'ha attivata nessuno.

## La parte che non è nell'abbonamento

Se dentro il flusso c'è una chiamata a un modello, quella si paga a parte, e si paga a quantità
di testo, quello che entra e quello che esce. Il prezzo di un singolo giro dipende quindi da
quanto è grosso quello che gli arriva davanti, che è la cosa su cui hai meno controllo di tutte.

Una mail con sotto tutto lo scambio delle settimane precedenti costa più della stessa mail
scritta da zero, e un documento passato per intero quando ne servivano due righe si paga per
intero. Il caso peggiore è il flusso che a ogni passaggio rimanda al modello la conversazione da
capo, perché ogni volta paga di nuovo anche quello che aveva già pagato al giro prima.

È la voce che cresce senza che nessuno abbia toccato niente, perché basta che i tuoi clienti
comincino a scrivere messaggi più lunghi.

## Quale crescita del costo va bene e quale no

Un costo che sale perché sono arrivati più ordini è una buona notizia con la fattura attaccata.
Un costo che sale mentre il lavoro fatto resta lo stesso è un guasto che non ha ancora dato
segnali.

Un flusso che fallisce e riprova consuma a ogni tentativo, e se fallisce sempre nello stesso
punto sta pagando ogni volta il pezzo di strada che viene prima dell'errore. Uno partito due
volte per lo stesso evento fa il doppio del lavoro, e ogni tanto manda anche due messaggi allo
stesso cliente.

Poi ci sono i flussi rimasti accesi dopo che il processo è cambiato, che continuano a girare per
una cosa che in azienda non si fa più. Sono la voce più facile da togliere e quella che nessuno
guarda, perché spegnere una cosa che non dà fastidio non è mai urgente.

## Con cosa va confrontata la bolletta

Non con quella di un'altra piattaforma, ma con quanto ti costava fare quella cosa a mano.

Prendi la spesa del mese di quel flusso e dividila per quante volte la cosa che fa è successa
davvero. Quello che esce è il prezzo di una pratica gestita, ed è l'unico dato che si può
appoggiare accanto a quanto ti costa la stessa pratica quando la fa una persona.

Se alla domanda su quante volte è successa non sai rispondere, il prezzo è l'ultimo dei
problemi. Vuol dire che quel flusso non ti sta dicendo cosa ha fatto, e una cosa che non dice
cosa ha fatto non la puoi né difendere né tagliare.

## Cosa guardare oggi nel tuo pannello

Ogni piattaforma ha una pagina dei consumi e non è nascosta. La prima cosa da leggere è in che
unità ti stanno contando e quante ne hai incluse nel piano.

Poi guarda quali flussi consumano di più. Se quello in cima alla lista non è anche quello che
produce di più, hai già trovato la voce da sistemare.

Ultima cosa, quali flussi girano a orario e ogni quanto. Quella frequenza l'ha scelta qualcuno
una volta sola, mentre stava costruendo, e vale la pena chiedersi se quel ritmo serve ancora.

Se il flusso gira su un server tuo il conto funziona diversamente, perché paghi la macchina e non
i giri. Il ragionamento resta identico, con una voce in più da mettere in conto, che è chi la
aggiorna.

## Da dove partire domani mattina

Apri la pagina dei consumi e scrivi due righe su un foglio: in che unità ti contano e quale
flusso è primo nella lista. È roba di cinque minuti, e da lì in poi le domande che fai a chi ti
costruisce le automazioni cambiano.

Poi spegni quelli che nessuno usa più. È l'intervento che costa meno fatica di tutti, ed è quasi
sempre l'ultimo che viene in mente.

Se hai automazioni accese e non sai quanto ti costa ognuna, prenota una call di quindici minuti:
guardiamo insieme la pagina dei consumi e decidiamo quale voce conviene toccare per prima.
