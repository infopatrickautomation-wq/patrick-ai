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

## Da controllare al primo deploy

Su Vercel i rewrite scattano **dopo** il controllo del filesystem, quindi il catch-all su
`index.html` non dovrebbe mangiarsi le pagine statiche del blog. È l'unica cosa che non si può
verificare in locale. Appena il sito è online:

```bash
curl -s https://<dominio>/blog/<slug> | grep "una frase dell'articolo"   # deve trovarla
curl -s -o /dev/null -w "%{http_code}\n" https://<dominio>/chi-sono      # deve restare 200
```

Se il primo comando non trova la frase, la pagina è stata riscritta sulla SPA: in quel caso si
escludono le rotte del blog dal rewrite in `vercel.json`, con
`"source": "/((?!blog|sitemap\\.xml|robots\\.txt).*)"`. Il secondo comando serve a controllare che
quella modifica non abbia rotto le altre pagine.
