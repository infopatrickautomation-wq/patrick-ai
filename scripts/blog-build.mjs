/**
 * Genera `content/blog.generated.ts`, cioè i post già trasformati in HTML e pronti
 * per l'app. Gira PRIMA di `vite build` (e prima di `vite dev`, vedi package.json).
 *
 * Perché un file generato invece di leggere i .md a runtime: i post finiscono nel
 * bundle come dati, quindi la pagina non deve fare nessuna fetch e il markdown non
 * arriva mai nel browser. Il file è rigenerabile: NON va modificato a mano.
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { loadPosts, ROOT } from './posts.mjs';

const posts = loadPosts();
const out = join(ROOT, 'content', 'blog.generated.ts');

mkdirSync(join(ROOT, 'content'), { recursive: true });

writeFileSync(
  out,
  `// FILE GENERATO da scripts/blog-build.mjs — non modificare a mano.
// Sorgente: content/blog/*.md. Rigenera con: npm run blog:build

export interface BlogPost {
  title: string;
  slug: string;
  /** ISO YYYY-MM-DD */
  date: string;
  description: string;
  tags: string[];
  image: string;
  /** testo alternativo; vuoto = immagine decorativa */
  imageAlt: string;
  /** immagine generata con AI: va indicata, AI Act art. 50 */
  imageAi: boolean;
  author: string;
  readingMinutes: number;
  /** corpo dell'articolo già convertito da markdown */
  html: string;
}

export const POSTS: BlogPost[] = ${JSON.stringify(
    posts.map(({ file, ...post }) => post),
    null,
    2,
  )};

export const getPost = (slug: string): BlogPost | undefined =>
  POSTS.find((p) => p.slug === slug);
`,
  'utf8',
);

console.log(`blog: ${posts.length} post → content/blog.generated.ts`);
