# Come funziona il blog

## Scrivere un post

Un file `.md` in questa cartella, con nome `AAAA-MM-GG-slug.md`. Front-matter:

```markdown
---
title: Titolo dell'articolo
slug: titolo-dell-articolo
date: 2026-07-28
description: Una frase, è quella che compare su Google e nell'anteprima social.
tags: [riattivazione lead, whatsapp]
image: /blog/nome-immagine.png
imageAlt: Cosa si vede nell'immagine, in una riga
imageAi: true
author: Patrick
---

Il corpo in markdown.
```

`title`, `slug` e `date` sono obbligatori: se mancano, **il build si ferma**. Lo slug accetta solo
minuscole, numeri e trattini, e non può essere duplicato.

Sulla copertina:

- il file va in `public/blog/<slug>.png`, e in `image` si scrive il percorso **senza** `public`
  (`/blog/<slug>.png`). Finisce anche in `og:image`, cioè è l'anteprima quando il link viene
  incollato su LinkedIn o WhatsApp;
- `imageAlt` è la descrizione per chi non vede l'immagine. Se non c'è niente di sensato da dire,
  lascialo vuoto: l'immagine viene trattata come decorativa, ed è meglio di una descrizione finta;
- `imageAi: true` fa comparire la dicitura "Immagine generata con intelligenza artificiale"
  (AI Act art. 50). **Va messa ogni volta che la copertina è generata con AI**, non è opzionale;
- un articolo senza copertina funziona lo stesso: meglio nessuna immagine che una brutta.

## Cosa succede al build

`npm run build` esegue tre passaggi in fila:

1. `scripts/blog-build.mjs` legge questi `.md`, converte il markdown in HTML e scrive
   `content/blog.generated.ts` (file **generato**, non modificarlo a mano);
2. `vite build` costruisce la SPA come sempre;
3. `scripts/prerender.mjs` scrive l'**HTML statico** di ogni articolo in
   `dist/blog/<slug>/index.html`, più `sitemap.xml`, `robots.txt` e `blog/rss.xml`.

Il terzo passaggio è il motivo per cui esiste tutto questo: il sito è una SPA, e senza HTML statico
Google e i crawler degli LLM su un articolo vedrebbero una pagina vuota.

## Verificare che funzioni davvero

Non basta aprire il browser (lì il JavaScript gira e non dimostra niente). Serve controllare
l'HTML che arriva **prima** del JavaScript:

```bash
npm run build
cd dist && python3 -m http.server 5185 &
curl -s http://localhost:5185/blog/<slug>/ | grep "una frase dell'articolo"
```

Se il grep trova la frase, i crawler vedono l'articolo.

## Dopo ogni deploy

Su Vercel i rewrite scattano **dopo** il controllo del filesystem: verificato online il 2026-07-28,
il catch-all su `index.html` **non** si mangia le pagine statiche del blog e non serve nessuna
esclusione. Il `vercel.json` va lasciato com'è.

⚠️ **Non aggiungere chiavi al `vercel.json`.** Il 2026-07-28 un `cleanUrls: true` messo "per
sicurezza" ha fatto tornare 404 tutte le rotte della SPA (`/chi-sono`, `/prodotti`, `/contatti`, le
pagine prodotto) mentre il blog funzionava. Ogni chiave lì dentro cambia il routing di tutto il sito.

Controllo da fare dopo il deploy, **incluse le pagine che non c'entrano con la modifica**:

```bash
S=https://<dominio>
curl -s $S/blog/<slug> | grep "una frase dell'articolo"          # deve trovarla
for p in / /chi-sono /prodotti /contatti; do
  echo "$p → $(curl -s -o /dev/null -w '%{http_code}' $S$p)"     # devono essere tutte 200
done
```

Se qualcosa è rotto: `git show <commit-precedente>:vercel.json`, rimettere esattamente quel
contenuto e ripushare. Non provare configurazioni alternative con la produzione rotta.
