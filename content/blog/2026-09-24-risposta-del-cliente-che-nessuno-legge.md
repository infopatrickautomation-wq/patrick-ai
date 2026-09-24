---
title: Il cliente ha risposto all'automazione, e la risposta non l'ha letta nessuno
slug: risposta-del-cliente-che-nessuno-legge
date: 2026-09-24
description: Quando un'automazione manda un messaggio decide anche dove finiscono le risposte. Se non lo decidi tu, finiscono in una casella che nessuno apre o in una conversazione che su WhatsApp dopo un giorno non si può più riprendere.
tags: [automazioni, risposte, whatsapp, email, pmi]
image: /blog/risposta-del-cliente-che-nessuno-legge.png
imageAlt: Mezza conchiglia verde chiaro rivolta verso l'alto, appoggiata su un tavolo di legno scuro
imageAi: true
author: Patrick
---

Quando un'automazione manda un messaggio, il messaggio è metà del giro. L'altra metà è la
risposta, e la risposta arriva dove l'hai mandata tu, anche quando non hai scelto niente. Se il
mittente è un indirizzo che nessuno apre, la risposta del cliente resta lì dentro. Se è un numero
collegato a un servizio senza casella in arrivo, la risposta non compare da nessuna parte. Dal
lato del cliente risulta che ha risposto e che sta aspettando. Dal tuo lato non è successo niente.

La regola che ne viene fuori si applica prima di accendere il flusso. Nessun messaggio automatico
esce finché non è scritto chi legge le risposte, dove le legge ed entro quanto tempo. Costa una
riga di configurazione e una persona, e vale quanto il testo del messaggio, su cui invece si
passano i pomeriggi.

## Dove finisce la risposta a una mail mandata da un'automazione

Lo standard che descrive come è fatta una mail si chiama RFC 5322, è di ottobre del duemilaotto,
e sul punto dice una cosa sola. Se nell'intestazione c'è il campo Reply-To, le risposte vanno
all'indirizzo scritto lì. Se quel campo non c'è, vanno all'indirizzo del campo From, cioè al
mittente. Il tasto Rispondi del cliente fa esattamente questo, e non fa niente di più furbo.

Da qui vengono i due modi in cui si perde una risposta, e sono tutti e due banali.

Il primo è il mittente finto. Parecchi strumenti mandano da un indirizzo tipo noreply, oppure da
un indirizzo tecnico del servizio che stai usando. Il cliente risponde, la mail parte davvero, e
va a finire in una casella che nessuno ha mai aperto. Quando quell'indirizzo non accetta posta in
arrivo va anche peggio, perché al cliente torna indietro un avviso di mancato recapito, spesso in
inglese, con dentro il nome di un servizio che lui non conosce.

Il secondo è il mittente giusto ma la casella sbagliata. Il flusso manda dall'indirizzo
dell'azienda, le risposte arrivano nella casella generale, e nella casella generale arriva anche
tutto il resto. La risposta c'è ed è leggibile. Sta in fondo a una lista dove nessuno ha il
compito di guardare entro una certa ora.

La sistemazione è la stessa nei due casi. Il flusso manda da un indirizzo vero, con Reply-To
impostato su una casella che una persona apre davvero, e quella persona sa che ci deve guardare.

## Perché su WhatsApp la risposta ha una scadenza

Se mandi messaggi con la piattaforma WhatsApp Business, cioè quella che si collega alle
automazioni, la documentazione di Meta guardata il ventiquattro settembre di quest'anno funziona
così. Quando una persona scrive a un'azienda parte un timer di ventiquattro ore, che loro
chiamano finestra di assistenza. Finché la finestra è aperta, l'azienda può rispondere con un
messaggio scritto liberamente. Quando la finestra si chiude, l'azienda può mandare solo modelli
di messaggio approvati in anticipo. Se la persona scrive di nuovo prima della scadenza, il timer
riparte. Sono regole di Meta, e Meta le cambia quando vuole, quindi vanno ricontrollate.

Tradotto in giornata di lavoro: il cliente risponde venerdì alle cinque del pomeriggio, nessuno
guarda, e lunedì mattina quella conversazione non si riprende più con una frase normale. Si può
mandargli un modello approvato, che è un testo fisso pensato per altro, oppure aspettare che
scriva di nuovo lui.

La differenza tra una risposta non letta via mail e una non letta su WhatsApp sta qui. La mail
di tre giorni fa si legge ancora, e si risponde ancora con le parole che vuoi tu. La
conversazione WhatsApp di tre giorni fa è chiusa, e riaprirla non dipende più da te.

## Come si controlla se sta già succedendo

Bastano mezz'ora e il tuo telefono, senza mettere in piedi un controllo formale di tutti i
flussi. Prendi l'automazione che manda più messaggi e fatti mandare uno di quei messaggi sul tuo
indirizzo e sul tuo numero. Poi rispondi come risponderebbe un cliente, con una domanda vera e
non con la parola prova. Poi aspetta. Quello che devi vedere è dove è arrivata la risposta e chi se
ne accorgerebbe se non fossi tu a cercarla, e quanto tempo passa prima che qualcuno la guardi
senza che glielo dica tu. Controlla anche se al mittente di prova è tornato indietro un avviso di
mancato recapito.

Se la risposta è arrivata in un posto che hai dovuto cercare, quel flusso va sistemato prima di
aggiungergli qualsiasi altra cosa.

## Chi legge, se non c'è nessuno di dedicato

In un'azienda piccola la risposta onesta è che una persona libera non c'è. Va bene lo stesso,
purché il compito sia assegnato invece che sottinteso.

Il posto giusto di solito non è una casella mail in più. È il posto dove il lavoro viene già
guardato ogni giorno, che nella maggior parte dei casi è il CRM o il gestionale. La risposta del
cliente entra lì come attività assegnata a un nome, con una scadenza corta, e chi la riceve la
vede insieme al resto invece che dentro un altro programma da aprire.

Se il CRM non c'è, funziona anche una casella condivisa, a patto che sia scritto chi la apre e a
che ora. Una casella che possono aprire tutti è una casella che non apre nessuno.

Poi c'è la parte che non costa niente. Nel messaggio automatico, di' al cliente cosa succede se
risponde. Una riga del tipo: se rispondi a questo messaggio ti legge una persona e ti
ricontattiamo entro il giorno lavorativo successivo. Se non è vero non si scrive. Se è vero
cambia il tono di tutto il messaggio, perché smette di sembrare un annuncio.

## Cosa fare domani mattina

Apri l'elenco delle automazioni che mandano messaggi ai clienti. Per ognuna scrivi due cose su un
foglio: da quale indirizzo o numero esce, e chi legge se il cliente risponde. Dove la seconda
casella resta vuota, hai trovato il punto in cui i clienti ti stanno già parlando e tu non li
senti.

Poi parti da quella che manda più messaggi, non da quella che ti sta più antipatica. È quella che
sta accumulando più risposte non lette.

Se vuoi che guardi i tuoi flussi e ti dica dove si perdono le risposte, prenota una call dalla
pagina contatti. Bastano quindici minuti, e spesso il lavoro da fare è una riga di
configurazione più una decisione su chi guarda.
