---
title: Dove finiscono i dati dei tuoi clienti quando li fai leggere a un'AI
slug: dove-finiscono-i-dati-dei-tuoi-clienti
date: 2026-08-27
description: Quando un'automazione fa leggere una mail a un modello, quel testo esce dalla tua azienda. Cosa ne viene fatto dipende dal contratto che hai, non dallo strumento con cui è stato costruito il flusso.
tags: [automazioni, dati, privacy, ai, pmi]
image: /blog/dove-finiscono-i-dati-dei-tuoi-clienti.png
imageAlt: Un soffione controluce su fondo blu scuro, con alcuni semi che si staccano e volano via
imageAi: true
author: Patrick
---

Quando un'automazione fa leggere a un modello la mail di un cliente, quel testo esce dalla tua
azienda. Arriva sui server di chi fornisce il modello, ci resta per un po', e cosa ne viene fatto
lo decide il contratto che hai con quel fornitore, non lo strumento con cui è stato costruito il
flusso. È la parte che nelle dimostrazioni non si vede, ed è l'unica che ti riguarda davvero se in
quei messaggi ci sono nomi, indirizzi e numeri di telefono di persone vere.

Sui contratti da azienda e sulle interfacce di programmazione due fra i fornitori più usati
dichiarano di non usare quel testo per addestrare i loro modelli. Sui piani per persone singole,
quelli che si comprano con la carta in due minuti, la stessa frase non vale. Lì dipende da
un'impostazione dell'account, e per non farlo bisogna spegnerla. Stesso modello, stesso schermo,
condizioni diverse.

## Cosa esce davvero dall'azienda quando parte il flusso

Il contenuto che esce non lo decidi il giorno in cui decidi di usare l'AI. Lo decide chi costruisce
il flusso, nel momento in cui sceglie quale campo passare al modello, e quel momento non lo vede
nessuno.

"Fai riassumere l'ultima mail del cliente" sembra una richiesta precisa. Dentro il flusso diventa
un campo, e quel campo quasi sempre contiene il corpo del messaggio più la firma, più tutto il
testo citato sotto, cioè le risposte precedenti con dentro le condizioni dell'offerta e il
cellulare di chi ha scritto. Nessuno ha deciso di mandare via quella roba. È venuta dietro, perché
in quel campo c'era.

Vale uguale per la scheda del cliente. Chi costruisce passa il contatto intero, che è la cosa più
comoda da fare, e nel contatto ci sono le note che avete scritto voi negli anni. Quelle non le
scrivi pensando che le leggerà qualcun altro.

Da qui viene la domanda da fare a chi te lo costruisce, e non è se usa l'AI. È di farti vedere il
testo esatto che parte. Si può guardare davvero, sta scritto nei registri di esecuzione della
piattaforma, e si capisce in fretta se stai mandando fuori una riga o mezzo archivio. Se poi il
flusso funziona lo stesso passando solo la parte che serve, tutto il resto era uscito dall'azienda
per niente.

## Lo stesso modello può avere due contratti diversi

Nella documentazione di OpenAI per gli sviluppatori è scritto che i dati mandati alla loro
interfaccia di programmazione non vengono usati per addestrare o migliorare i loro modelli, a meno
che tu non scelga esplicitamente di condividerli. Anthropic scrive che, per impostazione
predefinita, non useranno gli input e gli output dei loro prodotti commerciali per addestrare i
modelli.

Sui piani per persone singole il quadro è un altro. OpenAI dichiara che i contenuti dei piani
consumer possono essere usati per migliorare i modelli a seconda delle impostazioni dell'account, e
che chi non vuole trova un interruttore nelle impostazioni sui dati. Non c'è niente di nascosto, è
semplicemente un altro prodotto, comprato dalla stessa azienda e con lo stesso logo davanti.

Anthropic scrive anche che, se qualcuno preme il pollice in su o in giù su una risposta, quella
conversazione può finire fra i dati usati per addestrare. L'eccezione arriva da un gesto che
chiunque in ufficio può fare senza pensarci, perché quel pulsante sembra un like.

Sono condizioni verificate sulla documentazione ufficiale dei due fornitori a fine agosto di
quest'anno. Le riscrivono quando vogliono, e la data qui conta quanto il fatto.

Il caso pratico è quello di chi apre la chat sul telefono e ci incolla dentro il messaggio del
cliente per farsi scrivere la risposta. Nessuno ha configurato niente, quindi vale il contratto del
piano personale.

## Quanto tempo restano lì

Cancellare una conversazione dal proprio schermo e togliere quei dati dai server sono due cose
diverse, e la seconda non succede solo perché hai fatto la prima.

Sempre nella documentazione di OpenAI: i registri tenuti per il controllo degli abusi vengono
conservati fino a trenta giorni, se la legge non impone di tenerli più a lungo, e per chi ha
bisogno di condizioni diverse esistono programmi che tolgono del tutto quella conservazione. Va
chiesto, non arriva da solo.

Per un'azienda normale questo serve a decidere in anticipo quali cose passano dal modello e quali
no, e non è un motivo di allarme. Un preventivo può passare. L'estratto conto di
qualcuno o un documento d'identità scansionato meritano una decisione presa apposta, non presa per
inerzia il giorno in cui il flusso è stato acceso.

## Dove girano fisicamente i dati

Chi lavora in Europa la domanda su dove stiano i server prima o poi se la sente fare, di solito da
un cliente più grande o da chi si occupa di conformità.

OpenAI offre ai clienti che ne hanno diritto di far girare le richieste in Europa. La regione però
si sceglie **quando si crea il progetto**, e un progetto già esistente non si può convertire. Chi
ha costruito tutto dentro un progetto fatto al volo il primo giorno, quando serviva solo provare,
quella scelta non ce l'ha più, e per averla si rifà da capo rimettendo le chiavi in ogni flusso
che le usa.

Costa niente sistemarla il primo giorno e diventa un lavoro qualche mese dopo. Se stai per far
partire qualcosa adesso, è fra le poche cose che conviene decidere prima ancora di sapere se il
progetto funzionerà.

## Cosa deve esserci scritto e con chi

Chi fa girare il modello sta trattando dati per conto tuo. Il regolamento europeo, all'articolo
ventotto, chiede che quel rapporto stia in un contratto scritto, anche in forma elettronica, e che
chi tratta i dati per te non possa passare il lavoro a un altro senza una tua autorizzazione
scritta.

In pratica si controllano due cose in un pomeriggio. Che il contratto con il fornitore del modello
esista e sia intestato all'azienda, non alla mail personale di chi ha fatto la prova. E che tu
sappia chi altro c'è dietro, perché fra te e il modello di solito c'è anche la piattaforma di
automazione, che è un fornitore a sé e tratta gli stessi dati.

Niente di tutto questo sostituisce un parere legale. È la lista delle carte che prima o poi
qualcuno ti chiederà, e averle pronte costa meno che cercarle di corsa.

## Da dove partire domani mattina

Fai l'elenco delle automazioni accese che parlano con un modello. Per ognuna scrivi su una riga
quale testo esce, verso quale fornitore e con quale tipo di contratto. Se una riga non riesci a
completarla, hai già trovato quella da guardare per prima.

Poi apri un'esecuzione qualsiasi e leggi il contenuto che è stato mandato davvero. Non quello che
c'è scritto nelle istruzioni, quello che è partito. Se è più di quello che ti aspettavi, hai anche
la prima cosa da sistemare.

Se hai automazioni che leggono mail o schede clienti e non sai dire cosa esce dalla tua azienda,
prenota una call di quindici minuti: guardiamo insieme cosa passa davvero e cosa si può togliere
senza rompere quello che funziona.
