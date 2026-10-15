---
title: L'assistente AI risponde con il listino vecchio, anche se quello nuovo ce l'ha
slug: assistente-ai-risponde-con-documenti-vecchi
date: 2026-10-15
description: Un assistente AI che legge i documenti aziendali non sa quale versione è quella valida. Prende il testo che somiglia di più alla domanda, e se nella cartella c'è ancora il listino vecchio può rispondere con quello. Come si prepara la cartella perché risponda con i documenti in vigore.
tags: [assistente ai, documenti, chatbot, knowledge base, pmi]
author: Patrick
---
Un assistente AI che risponde leggendo i tuoi documenti non sa quale versione è quella valida.
Quando gli fai una domanda cerca i pezzi di testo che somigliano di più alla domanda, non quelli
più recenti. Se nella cartella ci sono il listino nuovo e quello vecchio, tutti e due parlano di
prezzi, tutti e due somigliano alla domanda, e l'assistente può rispondere con quello sbagliato.
Lo fa con lo stesso tono sicuro con cui risponde quando ha ragione.

Cambiare modello o allungare le istruzioni serve a poco. Quello che decide è la cartella. Dentro
ci deve restare solo quello che vale oggi, ogni documento deve dire da quando vale, e qualcuno deve
controllare le risposte ogni volta che un documento cambia.

## Come fa un assistente AI a trovare la risposta nei tuoi documenti

Gli assistenti che "leggono i documenti aziendali" di solito non leggono tutto a ogni domanda.
Prima tagliano i documenti in pezzi, poi a ogni domanda cercano i pezzi che parlano della
stessa cosa e passano solo quelli al modello, che scrive la risposta partendo da lì. Il nome tecnico
è RAG, e funziona così sia negli strumenti già pronti sia in quelli costruiti su misura.

Il punto delicato è la ricerca. I pezzi vengono scelti per somiglianza di significato con la
domanda. La data del documento, il fatto che sia stato sostituito, il fatto che qualcuno l'abbia
rinominato "VECCHIO", entrano nella scelta solo se chi ha costruito il sistema li ha fatti
entrare. Nella configurazione di partenza di solito non ci sono.

Quindi alla domanda "quanto costa la manutenzione annuale?" la ricerca trova il paragrafo del
listino di quest'anno e quello del listino dell'anno scorso, perché parlano della stessa cosa con
quasi le stesse parole. Il modello li riceve tutti e due e deve scegliere da solo.

## Perché l'assistente sceglie la versione sbagliata

Davanti a due pezzi che si contraddicono, il modello non ha un modo affidabile per sapere quale
vale. Può prendere il primo che gli arriva, quello scritto in modo più chiaro, oppure mescolarli
e mettere il prezzo di uno con le condizioni dell'altro. Nessuna delle tre cose è un errore del
modello in senso stretto: gli hai dato due risposte e gli hai chiesto di dartene una.

Il nome del file aiuta meno di quanto sembri. Che un file si chiami "listino nuovo" lo sai tu, ma
non è detto che il nome del file finisca dentro i pezzi che la ricerca trova. Spesso il
modello vede solo il testo del paragrafo, senza sapere da quale file arriva.

E poi ci sono le versioni che nessuno ricorda di avere: la bozza del regolamento salvata accanto a
quello approvato, la circolare sugli orari estivi che a ottobre non vale più, il PDF mandato a un
cliente con uno sconto concordato solo per lui. Per l'assistente sono tutti documenti aziendali
come gli altri.

## Quando una risposta vecchia diventa un problema

Un assistente interno che sbaglia l'orario di una riunione è un fastidio, niente di più. Il guaio
arriva quando l'assistente risponde ai clienti, o quando chi lo usa in ufficio copia la
risposta in una mail senza ricontrollarla.

Un prezzo vecchio scritto a un cliente diventa una discussione. Una condizione di reso che non
esiste più diventa una promessa che qualcuno dovrà decidere se mantenere. E non te ne accorgi
dall'assistente, perché la risposta sbagliata ha la stessa forma di quella giusta. Te ne accorgi
quando il cliente torna con lo screenshot.

## Come si prepara la cartella che l'assistente legge

La prima regola è la più noiosa e quella che conta di più: nella cartella che l'assistente legge
ci sta solo quello che vale oggi. Le versioni vecchie non si cancellano, si spostano in un archivio
che l'assistente non vede. Se ti servono per ricostruire cosa hai detto a un cliente l'anno
scorso, sono lì. Se non le vede, non le può usare per rispondere.

Poi, un argomento per documento. Se le condizioni di reso stanno nel regolamento, nelle
domande frequenti del sito e in una mail tipo, prima o poi una delle tre resterà indietro quando
le altre vengono aggiornate. Meglio un documento solo che fa da riferimento, e gli altri che
rimandano a quello.

Terza cosa, la data va scritta dentro il testo, non solo nel nome del file. Una riga in cima come
"Valido dal primo settembre, sostituisce il listino precedente" finisce nei pezzi che la ricerca
trova, e il modello la legge insieme al prezzo. Non rende il sistema infallibile, ma gli dà
un'informazione che altrimenti non avrebbe.

E ogni documento deve avere un responsabile. Quando cambia il listino, chi lo cambia sa che deve
anche togliere il vecchio dalla cartella dell'assistente. Se nessuno ha quel compito, il listino
vecchio resta lì per sempre, perché nessuno sa che c'è.

## Come fai a sapere se l'assistente sta usando il documento giusto

Chiedigli di dire da dove ha preso la risposta. Se lo strumento lo permette, fagli indicare il
documento o il passaggio di partenza, anche solo scrivendolo nelle istruzioni. Se
l'assistente cita il file sbagliato, lo vedi subito, senza dover ricontrollare il prezzo a mano.

Poi preparati un elenco di domande di prova con le risposte giuste accanto, scelte fra quelle che
cambiano nel tempo: prezzi, orari, condizioni, scadenze, nomi dei referenti. Ogni volta che
aggiorni un documento, rifai le domande che lo riguardano e confronta. È un controllo che richiede
pochi minuti e che nessuno strumento fa al posto tuo, perché solo tu sai qual è la risposta giusta.

Infine, guarda di tanto in tanto le domande vere che arrivano all'assistente, se lo strumento le
conserva. Sono il posto dove scopri le domande a cui non avevi pensato, e i documenti che non
sapevi di avere ancora nella cartella.

## Basta scrivere nelle istruzioni di usare sempre la versione più recente?

Aiuta poco. Il modello può seguire quella istruzione solo se nei pezzi che riceve c'è scritto quale
versione è più recente. Se riceve due paragrafi senza data, sapere che deve preferire il più
recente non gli dice quale dei due lo è. E se la ricerca gli passa solo il paragrafo vecchio,
perché somiglia di più alla domanda, il nuovo non lo vede proprio.

L'istruzione ha senso insieme alla data scritta nei documenti, non al posto della pulizia della
cartella.

## Cosa fare domani mattina

Apri la cartella, o lo spazio, da cui il tuo assistente prende i documenti, e cerca le coppie:
due file che parlano della stessa cosa. Listini, condizioni, regolamenti, schede prodotto. Per
ogni coppia decidi qual è quello valido e sposta l'altro in un archivio che l'assistente non legge.

Poi fai all'assistente qualche domanda di cui conosci bene la risposta, scegliendo proprio
quelle su cui hai appena trovato un doppione, e chiedigli di citare il documento da cui risponde.

Se vuoi che guardiamo insieme quali documenti legge oggi il tuo assistente e come tenerli in
ordine quando cambiano, prenota una call dalla pagina contatti.
