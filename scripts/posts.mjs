/**
 * Lettura e parsing dei post del blog. Unico punto in cui si legge `content/blog/`:
 * lo usano sia `blog-build.mjs` (genera i dati per l'app) sia `prerender.mjs`
 * (genera l'HTML statico), così i due non possono divergere.
 */
import { readdirSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { marked } from 'marked';

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
export const BLOG_DIR = join(ROOT, 'content', 'blog');
/**
 * Dominio del sito, usato per canonical, sitemap, RSS e og:url.
 * Oggi è il sottodominio Vercel; quando arriva il dominio proprio si cambia qui
 * (o si passa `SITE_URL=https://... npm run build`) e si rigenera tutto.
 */
export const SITE_URL = (process.env.SITE_URL || 'https://patrick-ai-gj5w.vercel.app').replace(/\/$/, '');

/**
 * Front-matter minimale: `chiave: valore`, più le liste in stile `tags: [a, b]`.
 * Niente YAML completo apposta: una dipendenza in meno e il formato dei post
 * resta qualcosa che si scrive a mano senza sbagliare.
 */
function parseFrontMatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { data: {}, body: raw };

  const data = {};
  for (const line of match[1].split(/\r?\n/)) {
    if (!line.trim() || line.trimStart().startsWith('#')) continue;
    const sep = line.indexOf(':');
    if (sep === -1) continue;
    const key = line.slice(0, sep).trim();
    let value = line.slice(sep + 1).trim();
    if (value.startsWith('[') && value.endsWith(']')) {
      value = value
        .slice(1, -1)
        .split(',')
        .map((v) => v.trim().replace(/^["']|["']$/g, ''))
        .filter(Boolean);
    } else {
      value = value.replace(/^["']|["']$/g, '');
    }
    data[key] = value;
  }
  return { data, body: match[2] };
}

/** ~200 parole al minuto, arrotondato per eccesso, minimo 1. */
function readingMinutes(body) {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

function assert(condition, message) {
  if (!condition) {
    console.error(`\n✗ blog: ${message}\n`);
    process.exit(1);
  }
}

export function loadPosts() {
  let files = [];
  try {
    // `_qualcosa.md` = bozza, non pubblicata. README esclusi: la documentazione
    // sta in content/README.md, ma se qualcuno ne rimette uno qui non deve
    // far esplodere il build.
    files = readdirSync(BLOG_DIR).filter(
      (f) => f.endsWith('.md') && !f.startsWith('_') && f.toLowerCase() !== 'readme.md',
    );
  } catch {
    return []; // nessuna cartella content/blog: il blog resta vuoto, non è un errore
  }

  const seen = new Set();
  const posts = files.map((file) => {
    const raw = readFileSync(join(BLOG_DIR, file), 'utf8');
    const { data, body } = parseFrontMatter(raw);

    // Meglio fermare il build che pubblicare un post senza titolo o senza slug:
    // in produzione se ne accorgerebbe Google, non noi.
    assert(data.title, `manca "title" nel front-matter di ${file}`);
    assert(data.slug, `manca "slug" nel front-matter di ${file}`);
    assert(data.date, `manca "date" nel front-matter di ${file}`);
    assert(
      /^\d{4}-\d{2}-\d{2}$/.test(data.date),
      `"date" di ${file} deve essere YYYY-MM-DD, trovato "${data.date}"`,
    );
    assert(
      /^[a-z0-9-]+$/.test(data.slug),
      `"slug" di ${file} può contenere solo minuscole, numeri e trattini`,
    );
    assert(!seen.has(data.slug), `slug duplicato "${data.slug}" (${file})`);
    seen.add(data.slug);

    return {
      title: data.title,
      slug: data.slug,
      date: data.date,
      description: data.description || '',
      tags: Array.isArray(data.tags) ? data.tags : data.tags ? [data.tags] : [],
      image: data.image || '',
      // Testo alternativo: se manca resta vuoto, cioè immagine decorativa. Meglio
      // vuoto che una descrizione finta, che per chi usa lo screen reader è peggio.
      imageAlt: data.imageAlt || '',
      imageAi: String(data.imageAi || '') === 'true', // dicitura AI Act art. 50
      author: data.author || 'Patrick',
      readingMinutes: readingMinutes(body),
      html: marked.parse(body, { async: false }),
      file,
    };
  });

  // più recenti in alto; a parità di data, ordine alfabetico stabile
  return posts.sort((a, b) => (a.date === b.date ? a.slug.localeCompare(b.slug) : b.date.localeCompare(a.date)));
}

export const formatDate = (iso) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString('it-IT', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

export const escapeHtml = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
