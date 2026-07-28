/**
 * Genera l'HTML STATICO delle pagine del blog, dopo `vite build`.
 *
 * Perché serve: il sito è una SPA. Senza questo passaggio Google e i crawler degli
 * LLM (che spesso non eseguono JavaScript) su /blog vedrebbero `<div id="root">`
 * vuoto, e l'articolo per loro non esisterebbe.
 *
 * Come funziona: prende `dist/index.html` prodotto da Vite, ci sostituisce il
 * <head> (title, description, canonical, OpenGraph, JSON-LD) e riempie `#root`
 * con il contenuto dell'articolo già in HTML. Quando il browser carica il bundle,
 * React monta sopra e la pagina diventa quella vera.
 *
 * ⚠️ Il markup statico qui sotto è scritto a mano e NON è lo stesso JSX di
 * `pages/BlogPostPage.tsx`: sono due sorgenti per lo stesso contenuto. È voluto —
 * renderizzare i componenti veri con renderToString significherebbe far girare
 * fuori dal browser Navbar, CustomCursor e canvas, che usano window. Il vincolo
 * da rispettare: **il testo dell'articolo deve essere identico**, l'impaginazione
 * no. Le classi usate (`prose-blog`) sono le stesse, quindi si vede uguale.
 *
 * Genera anche sitemap.xml, robots.txt e il feed RSS.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { loadPosts, formatDate, escapeHtml, ROOT, SITE_URL } from './posts.mjs';

const DIST = join(ROOT, 'dist');
const template = readFileSync(join(DIST, 'index.html'), 'utf8');
const posts = loadPosts();

/** Pagine "a mano" del sito, per la sitemap. */
const STATIC_ROUTES = ['/', '/chi-sono', '/prodotti', '/contatti', '/flux-agent', '/nova-agent', '/axis-partner'];

const CTA_URL = 'https://cal.com/patrick-boccia-uo1b33/chiamata-15-minuti';

/** Sostituisce <title> e inserisce i meta nel <head> del template di Vite. */
function buildHtml({ title, description, canonical, bodyHtml, headExtra = '', image = '' }) {
  // og:image vuole un URL assoluto: è l'anteprima quando il link finisce su
  // LinkedIn o WhatsApp, ed è il motivo per cui la copertina conta anche fuori dal sito.
  const absoluteImage = image ? (image.startsWith('http') ? image : `${SITE_URL}${image}`) : '';
  const imageTags = absoluteImage
    ? `    <meta property="og:image" content="${absoluteImage}" />
    <meta name="twitter:image" content="${absoluteImage}" />\n`
    : '';
  const head = `
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <link rel="canonical" href="${canonical}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="PatrickAI" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:locale" content="it_IT" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(title)}" />
    <meta name="twitter:description" content="${escapeHtml(description)}" />
${imageTags}${headExtra}`;

  return template
    .replace(/<title>[\s\S]*?<\/title>/, '')
    .replace('</head>', `${head}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${bodyHtml}</div>`);
}

/** Intestazione e chiusura comuni alle pagine statiche: link veri, così sono percorribili. */
const staticShell = (inner) => `
<div style="min-height:100vh;background:var(--bg)">
  <header style="max-width:46rem;margin:0 auto;padding:28px 24px">
    <a href="/" style="color:var(--title);font-weight:700;text-decoration:none">PatrickAI</a>
    <a href="/blog" style="color:var(--accent);margin-left:20px;text-decoration:none">Blog</a>
  </header>
  <main style="max-width:46rem;margin:0 auto;padding:24px 24px 96px">${inner}</main>
  <footer style="max-width:46rem;margin:0 auto;padding:32px 24px 64px;color:var(--body);font-size:14px">
    <a href="/" style="color:var(--body)">Home</a> ·
    <a href="/chi-sono" style="color:var(--body)">Chi sono</a> ·
    <a href="/contatti" style="color:var(--body)">Contatti</a> ·
    <a href="${CTA_URL}" style="color:var(--body)">Prenota 15 minuti</a>
  </footer>
</div>`;

function writePage(relDir, html) {
  const dir = join(DIST, relDir);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), html, 'utf8');
}

/* ── /blog ─────────────────────────────────────────────────────────────────── */
const indexDescription =
  'Quello che imparo costruendo automazioni per attività vere: cosa funziona, cosa no, e i vincoli tecnici che nessuno racconta prima di firmare.';

const listHtml = posts.length
  ? posts
      .map(
        (p) => `
    <article style="margin-top:34px">
      <p style="color:var(--body);font-size:13px;margin:0">${formatDate(p.date)} · ${p.readingMinutes} min</p>
      <h2 style="margin:6px 0 0"><a href="/blog/${p.slug}" style="color:var(--title);text-decoration:none">${escapeHtml(p.title)}</a></h2>
      <p style="color:var(--body);margin:8px 0 0">${escapeHtml(p.description)}</p>
    </article>`,
      )
      .join('')
  : '<p style="color:var(--body)">Il primo articolo sta arrivando.</p>';

writePage(
  'blog',
  buildHtml({
    title: 'Blog | PatrickAI',
    description: indexDescription,
    canonical: `${SITE_URL}/blog`,
    headExtra: `    <link rel="alternate" type="application/rss+xml" title="Blog PatrickAI" href="${SITE_URL}/blog/rss.xml" />
    <script type="application/ld+json">${JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: 'Blog PatrickAI',
      url: `${SITE_URL}/blog`,
      description: indexDescription,
      blogPost: posts.map((p) => ({
        '@type': 'BlogPosting',
        headline: p.title,
        url: `${SITE_URL}/blog/${p.slug}`,
        datePublished: p.date,
      })),
    })}</script>`,
    bodyHtml: staticShell(`
      <h1 style="color:var(--title);font-size:44px;line-height:1.05;letter-spacing:-0.03em;margin:0">Come lavoro, spiegato.</h1>
      <p style="color:var(--body);font-size:18px;margin-top:18px">${escapeHtml(indexDescription)}</p>
      ${listHtml}`),
  }),
);

/* ── /blog/<slug> ──────────────────────────────────────────────────────────── */
for (const post of posts) {
  const canonical = `${SITE_URL}/blog/${post.slug}`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: 'it-IT',
    author: { '@type': 'Person', name: post.author },
    publisher: { '@type': 'Organization', name: 'PatrickAI', url: SITE_URL },
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
    keywords: post.tags.join(', '),
    ...(post.image ? { image: post.image.startsWith('http') ? post.image : `${SITE_URL}${post.image}` } : {}),
  };

  writePage(
    `blog/${post.slug}`,
    buildHtml({
      title: `${post.title} | PatrickAI`,
      description: post.description,
      canonical,
      image: post.image,
      headExtra: `    <meta property="article:published_time" content="${post.date}" />
    <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`,
      bodyHtml: staticShell(`
      <article>
        <p style="color:var(--body);font-size:13px;margin:0">${formatDate(post.date)} · ${post.readingMinutes} min di lettura</p>
        <h1 style="color:var(--title);font-size:44px;line-height:1.05;letter-spacing:-0.03em;margin:10px 0 0">${escapeHtml(post.title)}</h1>
        <p style="color:var(--body);font-size:20px;margin-top:18px">${escapeHtml(post.description)}</p>
        ${post.image ? `<img src="${post.image}" alt="${escapeHtml(post.imageAlt)}" style="width:100%;border-radius:16px;margin-top:28px" />` : ''}
        ${post.image && post.imageAi ? '<p style="color:var(--body);font-size:12px;margin-top:8px">Immagine generata con intelligenza artificiale.</p>' : ''}
        <div class="prose-blog" style="margin-top:36px">${post.html}</div>
        <p style="margin-top:44px"><a href="${CTA_URL}" style="color:var(--accent);font-weight:700">Prenota una call di 15 minuti</a></p>
      </article>`),
    }),
  );
}

/* ── sitemap.xml ───────────────────────────────────────────────────────────── */
const today = new Date().toISOString().slice(0, 10);
const urls = [
  ...STATIC_ROUTES.map((r) => ({ loc: `${SITE_URL}${r === '/' ? '' : r}`, lastmod: today })),
  { loc: `${SITE_URL}/blog`, lastmod: posts[0]?.date || today },
  ...posts.map((p) => ({ loc: `${SITE_URL}/blog/${p.slug}`, lastmod: p.date })),
];

writeFileSync(
  join(DIST, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u.loc}</loc><lastmod>${u.lastmod}</lastmod></url>`).join('\n')}
</urlset>
`,
  'utf8',
);

/* ── robots.txt ────────────────────────────────────────────────────────────── */
writeFileSync(
  join(DIST, 'robots.txt'),
  `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`,
  'utf8',
);

/* ── RSS ───────────────────────────────────────────────────────────────────── */
const rssItems = posts
  .map(
    (p) => `    <item>
      <title>${escapeHtml(p.title)}</title>
      <link>${SITE_URL}/blog/${p.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/blog/${p.slug}</guid>
      <pubDate>${new Date(`${p.date}T09:00:00Z`).toUTCString()}</pubDate>
      <description>${escapeHtml(p.description)}</description>
    </item>`,
  )
  .join('\n');

mkdirSync(join(DIST, 'blog'), { recursive: true });
writeFileSync(
  join(DIST, 'blog', 'rss.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Blog PatrickAI</title>
    <link>${SITE_URL}/blog</link>
    <description>${escapeHtml(indexDescription)}</description>
    <language>it-IT</language>
${rssItems}
  </channel>
</rss>
`,
  'utf8',
);

console.log(
  `blog: HTML statico → dist/blog/ (${posts.length} articoli) + sitemap.xml + robots.txt + blog/rss.xml`,
);
