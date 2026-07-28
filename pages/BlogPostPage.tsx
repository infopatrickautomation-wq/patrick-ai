import React, { useEffect } from 'react';
import { CalendarDays, Clock, ArrowLeft, ArrowRight } from 'lucide-react';
import Navbar from '../sections/Navbar';
import Footer from '../sections/Footer';
import CustomCursor from '../components/CustomCursor';
import { navigate } from '../hooks/useRoute';
import { getPost, POSTS } from '../content/blog.generated';
import { formatDate } from './blogFormat';
import { BLOG_CTA_URL, BLOG_CTA_LABEL } from './blogConfig';

/**
 * Articolo del blog.
 *
 * Il corpo arriva già in HTML da `content/blog.generated.ts` (markdown convertito
 * al build), quindi `dangerouslySetInnerHTML` qui è sicuro: la sorgente sono i
 * nostri file .md nel repo, non input di utenti.
 *
 * Stessa pagina generata in HTML statico da `scripts/prerender.mjs`: quello che
 * vede il crawler deve dire le stesse cose di quello che vede il browser.
 */
const BlogPostPage: React.FC<{ slug: string }> = ({ slug }) => {
  const post = getPost(slug);

  useEffect(() => {
    if (!post) return;
    document.title = `${post.title} | PatrickAI`;
    const meta = document.querySelector('meta[name="description"]');
    if (meta && post.description) meta.setAttribute('content', post.description);
  }, [post]);

  if (!post) {
    return (
      <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
        <CustomCursor />
        <Navbar forceSolid />
        <main className="pt-40 pb-32 max-w-3xl mx-auto px-6 text-center">
          <h1 className="text-3xl font-bold" style={{ color: 'var(--title)' }}>
            Questo articolo non esiste.
          </h1>
          <p className="mt-4" style={{ color: 'var(--body)' }}>
            Forse è stato spostato, o il link è incompleto.
          </p>
          <a
            href="/blog"
            onClick={(e) => {
              e.preventDefault();
              navigate('/blog');
            }}
            className="mt-8 inline-flex items-center gap-2 text-sm font-semibold"
            style={{ color: 'var(--accent)' }}
          >
            <ArrowLeft size={16} strokeWidth={2.5} />
            Torna al blog
          </a>
        </main>
        <Footer />
      </div>
    );
  }

  const others = POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <CustomCursor />
      <Navbar forceSolid />

      <main className="pt-32 md:pt-40 pb-24">
        <article className="max-w-[46rem] mx-auto px-6">
          <a
            href="/blog"
            onClick={(e) => {
              e.preventDefault();
              navigate('/blog');
            }}
            className="inline-flex items-center gap-2 text-sm font-semibold mb-10"
            style={{ color: 'var(--accent)' }}
          >
            <ArrowLeft size={16} strokeWidth={2.5} />
            Blog
          </a>

          <div className="flex items-center gap-4 text-[13px]" style={{ color: 'var(--body)' }}>
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays size={14} strokeWidth={2} />
              {formatDate(post.date)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock size={14} strokeWidth={2} />
              {post.readingMinutes} min di lettura
            </span>
          </div>

          <h1
            className="mt-4 text-4xl md:text-[52px] font-extrabold tracking-tight"
            style={{ color: 'var(--title)', letterSpacing: '-0.03em', lineHeight: 1.04 }}
          >
            {post.title}
          </h1>

          {post.description && (
            <p className="mt-6 text-xl leading-relaxed" style={{ color: 'var(--body)' }}>
              {post.description}
            </p>
          )}

          {post.image && (
            <figure className="mt-10">
              <img src={post.image} alt={post.imageAlt} className="w-full rounded-2xl" />
              {post.imageAi && (
                <figcaption className="mt-2 text-xs" style={{ color: 'var(--body)' }}>
                  Immagine generata con intelligenza artificiale.
                </figcaption>
              )}
            </figure>
          )}

          <div
            className="prose-blog mt-12"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />

          {/* CTA di chiusura, la stessa dei post LinkedIn */}
          <aside
            className="mt-16 rounded-2xl p-8 md:p-10"
            style={{ background: 'var(--bg-alt)', border: '1px solid var(--border-soft)' }}
          >
            <h2 className="text-2xl font-bold tracking-tight" style={{ color: 'var(--title)' }}>
              Vuoi vedere se funziona sul tuo caso?
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed" style={{ color: 'var(--body)' }}>
              Prenoti una call di quindici minuti, mi racconti come lavori e ti dico se ha senso.
              Se non posso aiutarti, te lo dico subito.
            </p>
            <a
              href={BLOG_CTA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rubric-btn mt-7 inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm"
            >
              {BLOG_CTA_LABEL}
              <ArrowRight size={16} strokeWidth={2.5} />
            </a>
          </aside>

          {others.length > 0 && (
            <nav className="mt-16">
              <span className="mono-label text-[11px]" style={{ color: 'var(--body)' }}>
                Continua
              </span>
              <div className="mt-5 space-y-3">
                {others.map((other) => (
                  <a
                    key={other.slug}
                    href={`/blog/${other.slug}`}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(`/blog/${other.slug}`);
                    }}
                    className="block rounded-xl p-5 transition-colors"
                    style={{ background: 'var(--bg-alt)', border: '1px solid var(--border-soft)' }}
                  >
                    <span className="font-semibold" style={{ color: 'var(--title)' }}>
                      {other.title}
                    </span>
                  </a>
                ))}
              </div>
            </nav>
          )}
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPostPage;
