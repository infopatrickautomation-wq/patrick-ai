---
title: Un'automazione che devi ricontrollare tutta non ti ha tolto il lavoro
slug: automazione-che-devi-ricontrollare-tutta
date: 2026-08-06
description: La domanda giusta prima di automatizzare un compito con l'AI non è quanto spesso ci azzecca, ma quanto lavoro puoi davvero smettere di fare. Come si progetta un'automazione che chiede aiuto solo quando serve.
tags: [automazioni, ai, processi, controlli]
image: /blog/automazione-che-devi-ricontrollare-tutta.png
imageAlt: Una clessidra con la montatura di legno scuro su un piano ruvido, la sabbia chiara che scende nell'ampolla in basso
imageAi: true
author: Patrick
---

Prima di automatizzare un compito con l'AI la domanda utile non è quanto spesso ci azzecca.
È quanto lavoro puoi smettere di fare davvero. Sono due cose diverse, e se le confondi
finisci con un sistema che sbaglia pochissimo e non ti libera un minuto, perché ogni volta
che produce qualcosa devi comunque guardarlo, e guardare cento risultati per trovare quelli
storti costa quasi quanto farli.

Il rimedio non è un modello più preciso. È costruire la cosa in modo che sappia dividere i
casi su cui è tranquilla da quelli su cui non lo è, e che chiami una persona solo per i
secondi. Non è una funzione che si attiva, è una decisione di progetto, e si prende prima di
scegliere gli strumenti.

## Perché la percentuale di precisione non dice quanto tempo risparmi

I numeri che seguono me li sto inventando, servono solo a far vedere la forma del problema.
Quelli veri dipendono dal tuo caso e li scopri misurando.

Metti che su cento pratiche il sistema ne sbagli cinque. Sembra ottimo. Il punto è che non
sai quali cinque. Per trovarle devi aprire tutte e cento, e a quel punto il tempo che hai
risparmiato è la differenza fra fare una pratica e controllarla: su certi compiti è tanta,
su molti altri è quasi zero, perché per capire se un dato è giusto devi andare a cercare lo
stesso il dato giusto. Il lavoro non è sparito, ha cambiato nome. Da "compilare" a
"verificare".

Il numero che conta è un altro, ed è scomodo perché è più difficile da far bello in una
presentazione: **quanti casi arrivano in fondo senza che nessuno li tocchi.** Un sistema che
gestisce da solo sei pratiche su dieci e passa le altre quattro a una persona, dicendo per
ognuna perché non se l'è sentita, ti ha tolto sei pratiche. Un sistema che le fa tutte e
dieci e va ricontrollato tutto te ne ha tolte zero, anche se sbaglia meno del primo.

## Dove conviene mettere l'AI, e dove no

Prima di mettere qualcosa in mano a un sistema automatico, guarda il singolo errore da due
lati: quanto costa, e quanto è visibile.

Dove l'errore costa poco e si vede subito, puoi lasciar correre. La bozza di una risposta che
avresti riletto comunque, lo smistamento di una richiesta nella categoria sbagliata, una
proposta di appuntamento che il cliente corregge rispondendo. Se sbaglia, se ne accorge
qualcuno entro pochi minuti e si sistema.

Dove costa e non si vede, invece, è lì che arrivano i
guai: un prezzo dentro un preventivo, un IBAN copiato in un pagamento, una scadenza scritta
in un contratto, una quantità in un ordine. Quelle cose passano, sembrano normali, e vengono
fuori settimane dopo quando qualcuno le usa.

Questo non vuol dire lasciare stare. Vuol dire smettere di ragionare per compiti interi.
Dentro "fare un preventivo" ci sono sei passaggi: recuperare i dati del cliente, capire cosa
ha chiesto, scegliere le voci, applicare i prezzi, scrivere il documento, mandarlo. I prezzi
li prende una tabella, non un modello. Il resto può girare da solo. Quello che era sbagliato
non era automatizzare, era prendere il compito tutto intero.

## Come si fa a far dire a un sistema "questa non la so"

Un modello linguistico, per come è fatto, risponde sempre. E risponde con lo stesso tono
sicuro sia quando il dato ce l'ha davanti sia quando lo sta ricostruendo a naso. Il dubbio
non lo produce da solo, perché non sta misurando quanto sa: sta scrivendo la continuazione
più plausibile. L'errore pericoloso non è quello assurdo, che salta all'occhio. È quello
verosimile, che ha la forma giusta.

Quindi il dubbio glielo devi costruire attorno, e si fa in due mosse.

La prima è chiedergli una risposta strutturata invece di un testo libero: non "scrivimi la
mail", ma un risultato con dentro i campi che ti servono, più un campo esplicito che dice se
il caso è chiaro o va guardato, e una riga sul perché. Serve, ma da solo non basta, perché
anche quella valutazione se la sta dando da solo. Trattala come un indizio per mettere in
ordine la coda, non come una garanzia.

La seconda mossa è quella che regge il peso, e sono **i controlli che non dipendono dal
modello.** Regole scritte a mano, noiose, che si limitano a chiedere se il risultato ha
senso: il campo obbligatorio è pieno, la data esiste ed è nel futuro, il totale torna con la
somma delle righe, l'importo sta dentro un intervallo ragionevole per quel tipo di ordine, il
nome del cliente corrisponde a uno già in anagrafica. Quando una di queste salta, il caso non
passa e finisce nella pila delle persone.

Sono controlli che sembrano poca cosa e prendono proprio l'errore che il modello non
segnalerebbe mai, perché a lui sembra normale. Un numero di partita IVA inventato è scritto
benissimo. Confrontarlo con un elenco è l'unica cosa che lo smaschera.

## Come si capisce se sta funzionando

Il primo numero da tenere è quante pratiche sono arrivate in fondo senza che nessuno le
aprisse, contate su una settimana di lavoro vero e non su una prova fatta con tre casi
scelti bene.

Il secondo è quello che tiene onesto il primo: di quelle passate da sole, quante si sono
rivelate sbagliate dopo. Per saperlo devi continuare a guardarne un campione
a caso, anche quando tutto sembra a posto. Poche, ogni settimana, prese senza scegliere. È
la parte che si smette di fare per prima, ed è quella che ti direbbe se il primo numero sta
salendo perché il sistema è migliorato o perché avete smesso di controllare.

C'è un terzo costo che non compare in nessuna delle due misure e va tenuto d'occhio lo
stesso: il tempo di chi tiene in piedi la cosa. Se ogni settimana qualcuno passa mezza
giornata a sistemare istruzioni, aggiustare casi strani e rimettere in fila quello che si è
incastrato, quella mezza giornata va sottratta a quello che hai risparmiato. Un'automazione
che richiede una persona dedicata per funzionare non ha tolto lavoro, ha creato un mestiere
nuovo.

## Da dove partire domani mattina

Prendi il compito che avevi in mente di automatizzare e, per una settimana, segna due cose
soltanto: quanti casi sono arrivati, e per quanti di quelli avresti dovuto comunque metterci
gli occhi anche con un sistema che funziona bene.

Se la risposta è "tutti", il primo lavoro non è l'AI. È spezzare il compito e trovare il
pezzo che può passare da solo, di solito quello dove l'errore costa poco e si vede subito.
Quello lo automatizzi adesso. Il resto resta a mano finché non hai i controlli automatici
per farlo passare senza fidarti.

Se ti trovi con qualcosa che gira già e non sai dire quanto ti sta togliendo, prenota una
call di quindici minuti: guardiamo il compito, dove sta l'errore che costa, e quale pezzo
può camminare da solo senza che tu debba ricontrollare tutto.
