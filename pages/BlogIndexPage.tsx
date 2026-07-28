import React, { useEffect } from 'react';
import { CalendarDays, Clock, ArrowRight } from 'lucide-react';
import Navbar from '../sections/Navbar';
import Footer from '../sections/Footer';
import CustomCursor from '../components/CustomCursor';
import { navigate } from '../hooks/useRoute';
import { POSTS } from '../content/blog.generated';
import { formatDate } from './blogFormat';

/**
 * Indice del blog. I post arrivano da `content/blog.generated.ts`, generato al
 * build da `content/blog/*.md`: qui non si legge niente a runtime.
 *
 * Questa pagina è renderizzata anche in HTML statico da `scripts/prerender.mjs`,
 * perché i crawler (Google e quelli degli LLM) non aspettano il JavaScript.
 */
const BlogIndexPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Blog | PatrickAI';
  }, []);

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <CustomCursor />
      <Navbar forceSolid />

      <main className="pt-32 md:pt-40 pb-24">
        <div className="max-w-3xl mx-auto px-6">
          <span className="mono-label text-[11px]" style={{ color: 'var(--accent)' }}>
            Blog
          </span>
          <h1
            className="mt-4 text-4xl md:text-6xl font-extrabold tracking-tight"
            style={{ color: 'var(--title)', letterSpacing: '-0.03em', lineHeight: 1.02 }}
          >
            Come lavoro, spiegato.
          </h1>
          <p className="mt-6 text-lg leading-relaxed" style={{ color: 'var(--body)' }}>
            Quello che imparo costruendo automazioni per attività vere: cosa funziona, cosa no,
            e i vincoli tecnici che nessuno racconta prima di firmare.
          </p>
        </div>

        <div className="max-w-3xl mx-auto px-6 mt-16 space-y-5">
          {POSTS.length === 0 && (
            <p className="text-lg" style={{ color: 'var(--body)' }}>
              Il primo articolo sta arrivando.
            </p>
          )}

          {POSTS.map((post) => (
            <article
              key={post.slug}
              className="group rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
              style={{ background: 'var(--bg-alt)', border: '1px solid var(--border-soft)' }}
            >
              <a
                href={`/blog/${post.slug}`}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/blog/${post.slug}`);
                }}
                className="block p-7 md:p-9"
              >
                {post.image && (
                  <img
                    src={post.image}
                    alt={post.imageAlt}
                    className="w-full h-52 object-cover rounded-xl mb-7"
                    loading="lazy"
                  />
                )}

                <div className="flex items-center gap-4 text-[13px]" style={{ color: 'var(--body)' }}>
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays size={14} strokeWidth={2} />
                    {formatDate(post.date)}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock size={14} strokeWidth={2} />
                    {post.readingMinutes} min
                  </span>
                </div>

                <h2
                  className="mt-3 text-2xl md:text-[28px] font-bold tracking-tight transition-colors"
                  style={{ color: 'var(--title)', letterSpacing: '-0.02em', lineHeight: 1.15 }}
                >
                  {post.title}
                </h2>

                {post.description && (
                  <p className="mt-3 text-[15px] leading-relaxed" style={{ color: 'var(--body)' }}>
                    {post.description}
                  </p>
                )}

                <span
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold"
                  style={{ color: 'var(--accent)' }}
                >
                  Leggi
                  <ArrowRight
                    size={16}
                    strokeWidth={2.5}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </span>
              </a>
            </article>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BlogIndexPage;
