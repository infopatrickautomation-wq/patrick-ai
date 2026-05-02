import React, { useEffect, useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import Navbar from '../sections/Navbar';
import Footer from '../sections/Footer';
import CustomCursor from '../components/CustomCursor';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { navigate } from '../hooks/useRoute';

/* ── Reveal wrapper ── */
const Reveal: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({ children, delay = 0, className = '' }) => {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

/* ── Phase section ── */
const PhaseSection: React.FC<{
  number: string;
  title: string;
  description: string;
  bullets: { label: string; desc: string }[];
  imageUrl: string;
  imageLeft?: boolean;
}> = ({ number, title, description, bullets, imageUrl, imageLeft = false }) => {
  const textBlock = (
    <Reveal delay={100} className="flex flex-col justify-center">
      <div
        className="font-black leading-none mb-4"
        style={{ fontFamily: 'Outfit, sans-serif', fontSize: '80px', color: '#0066FF', opacity: 0.18 }}
      >
        {number}
      </div>
      <h2
        className="text-white font-black mb-4 leading-tight"
        style={{ fontFamily: 'Manrope, sans-serif', fontSize: '52px', letterSpacing: '-1.5px', lineHeight: '56px' }}
      >
        {title}
      </h2>
      <p className="text-white/45 text-base leading-relaxed mb-8 max-w-md">
        {description}
      </p>
      <ul className="space-y-5">
        {bullets.map((b, i) => (
          <li key={i} className="flex items-start gap-4">
            <span
              className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5"
              style={{ background: 'rgba(0,102,255,0.15)', border: '1px solid rgba(0,102,255,0.35)' }}
            >
              <Check className="w-3 h-3" style={{ color: '#0066FF' }} />
            </span>
            <div>
              <span className="text-white font-semibold text-sm">{b.label}:</span>
              <span className="text-white/45 text-sm"> {b.desc}</span>
            </div>
          </li>
        ))}
      </ul>
    </Reveal>
  );

  const imageBlock = (
    <Reveal className="h-full">
      <div
        className="relative rounded-2xl overflow-hidden border border-[rgba(0,102,255,0.15)]"
        style={{ height: '400px' }}
      >
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.75) saturate(0.8)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050d1a]/60 to-transparent" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0066FF]/30 to-transparent" />
      </div>
    </Reveal>
  );

  return (
    <div className="grid md:grid-cols-2 gap-12 items-center">
      {imageLeft ? (
        <>
          {imageBlock}
          {textBlock}
        </>
      ) : (
        <>
          {textBlock}
          {imageBlock}
        </>
      )}
    </div>
  );
};

/* ── AxisPartnerPage ── */
const AxisPartnerPage: React.FC = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const [heroVisible, setHeroVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setHeroVisible(true), 80); return () => clearTimeout(t); }, []);

  return (
    <div style={{ background: '#050d1a' }} className="min-h-screen selection:bg-[#0066FF]/20 overflow-x-hidden">
      <CustomCursor />
      <Navbar ctaLabel="Inizia Ora" />

      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
      <section className="relative pt-36 pb-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_40%_0%,rgba(0,102,255,0.1)_0%,transparent_60%)] pointer-events-none" />

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">

            {/* Left — copy */}
            <div>
              <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-7 border border-[#0066FF]/25 bg-[#0066FF]/8 transition-all duration-600 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3'}`}>
                <span className="text-[#4A9FFF] text-[10px] tracking-[0.25em] font-black">IL METODO PATRICKIAI</span>
              </div>

              <h1
                className={`tracking-tight mb-4 transition-all duration-800 delay-100 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                style={{ fontFamily: 'Manrope, sans-serif', fontSize: '80px', fontWeight: 500, letterSpacing: '-2.4px', lineHeight: '88px' }}
              >
                <span className="text-white">Framework </span>
                <em className="accent-italic">APS</em>
              </h1>

              <p className={`text-[#0066FF] font-black tracking-[0.2em] text-lg mb-5 transition-all duration-700 delay-150 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                Analyse. Plan. Scale.
              </p>

              <p className={`text-white/45 text-base font-light leading-relaxed max-w-md mb-10 transition-all duration-700 delay-200 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                L'approccio strutturato per trasformare la tua azienda con l'AI. Tre fasi concrete per risultati misurabili.
              </p>

              <div className={`transition-all duration-700 delay-250 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                <button
                  onClick={() => navigate('/contatti')}
                  className="group inline-flex items-center gap-2 bg-[#0066FF] text-white font-semibold px-7 py-[14px] rounded-xl text-sm tracking-widest transition-all duration-300 hover:shadow-[0_0_35px_rgba(0,102,255,0.5)] hover:scale-105 active:scale-95"
                >
                  Inizia Ora
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>

            {/* Right — placeholder card */}
            <div className={`transition-all duration-1000 delay-300 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="absolute -inset-1 rounded-[2rem] bg-[#0066FF]/8 blur-2xl pointer-events-none" />
              <div
                className="relative rounded-[1.75rem] overflow-hidden border border-[rgba(0,102,255,0.25)] flex items-center justify-center"
                style={{ background: '#0a1225', aspectRatio: '4/3' }}
              >
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0066FF]/50 to-transparent" />
                <svg className="absolute inset-0 w-full h-full opacity-[0.03]">
                  <defs>
                    <pattern id="g-axis" width="48" height="48" patternUnits="userSpaceOnUse">
                      <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#0066FF" strokeWidth="0.6" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#g-axis)" />
                </svg>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(0,102,255,0.07)_0%,transparent_65%)]" />
                <div className="relative z-10 text-center">
                  <div
                    className="font-black mb-2"
                    style={{ fontFamily: 'Outfit, sans-serif', fontSize: '22px', color: 'rgba(0,102,255,0.6)', letterSpacing: '0.1em' }}
                  >
                    AXIS PARTNER
                  </div>
                  <div className="text-white/20 text-sm tracking-[0.3em] font-semibold">2026</div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#0a1225] to-transparent" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          LOGHI CLIENTI
      ══════════════════════════════════════ */}
      <section className="py-16 relative border-t border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-10">
            <p className="text-white/30 text-sm font-medium">Aziende che si fidano del nostro metodo</p>
          </Reveal>
          <Reveal delay={80}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['Marco Coperture', 'Osteria del Orso', 'AlbiBarber', 'Studio Longhitano'].map((name, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-white/6 flex items-center justify-center py-6 px-4"
                  style={{ background: '#0a1225' }}
                >
                  <span className="text-white/35 text-sm font-semibold tracking-wide text-center">{name}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════
          01 — ANALYSE
      ══════════════════════════════════════ */}
      <section className="py-24 relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <PhaseSection
            number="01"
            title="Analyse"
            description="Analizziamo ogni processo della tua azienda per identificare dove l'AI può avere il massimo impatto."
            bullets={[
              { label: 'Assessment AI Readiness', desc: 'Misuriamo la maturità digitale della tua azienda.' },
              { label: 'Mappatura Processi', desc: 'Identifichiamo le attività ripetitive e costose.' },
              { label: 'Analisi ROI Potenziale', desc: 'Calcoliamo il ritorno atteso prima di iniziare.' },
            ]}
            imageUrl="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600"
            imageLeft={false}
          />
        </div>
      </section>

      {/* ══════════════════════════════════════
          02 — PLAN
      ══════════════════════════════════════ */}
      <section className="py-24 relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <PhaseSection
            number="02"
            title="Plan"
            description="Progettiamo la roadmap strategica su misura con obiettivi misurabili e piano di sviluppo chiaro."
            bullets={[
              { label: 'Report & Roadmap', desc: 'Strategia 12 mesi con obiettivi misurabili.' },
              { label: 'Priorità per ROI', desc: 'Prima le soluzioni con impatto maggiore.' },
              { label: 'Piano Implementazione', desc: 'Ogni step definito e schedulato.' },
            ]}
            imageUrl="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600"
            imageLeft={true}
          />
        </div>
      </section>

      {/* ══════════════════════════════════════
          03 — SCALE
      ══════════════════════════════════════ */}
      <section className="py-24 relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <PhaseSection
            number="03"
            title="Scale"
            description="Implementiamo le soluzioni AI su misura, le integriamo nei tuoi sistemi e garantiamo supporto continuo."
            bullets={[
              { label: 'Sviluppo su misura', desc: 'Soluzioni costruite per il tuo business.' },
              { label: 'Integrazione sistemi', desc: 'Collegato a tutti i tuoi strumenti esistenti.' },
              { label: 'Monitoraggio ROI', desc: 'Risultati misurati ogni mese.' },
            ]}
            imageUrl="https://images.unsplash.com/photo-1518770660439-4636190af475?w=600"
            imageLeft={false}
          />
        </div>
      </section>

      {/* ══════════════════════════════════════
          CTA FINALE
      ══════════════════════════════════════ */}
      <section className="py-28 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(0,102,255,0.08)_0%,transparent_65%)] pointer-events-none" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[220px] pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(0,102,255,0.3) 0%, rgba(0,102,255,0.08) 40%, transparent 70%)', filter: 'blur(8px)' }} />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[300px] h-[120px] pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(0,102,255,0.45) 0%, transparent 65%)', filter: 'blur(4px)' }} />

        <div className="max-w-3xl mx-auto px-4 relative z-10">
          <Reveal>
            <div
              className="rounded-[2rem] border border-[rgba(0,102,255,0.2)] p-14 text-center relative overflow-hidden"
              style={{ background: '#080d1a' }}
            >
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0066FF]/40 to-transparent" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(0,102,255,0.07)_0%,transparent_60%)] pointer-events-none" />

              <div className="relative z-10">
                <p className="text-[#4A9FFF] text-[10px] tracking-[0.3em] font-black mb-6">— INIZIA ORA —</p>
                <h2
                  className="text-white tracking-tight leading-tight mb-6"
                  style={{ fontFamily: 'Manrope, sans-serif', fontSize: '64px', fontWeight: 500, letterSpacing: '-1.8px', lineHeight: '70px' }}
                >
                  Il futuro della tua azienda<br />
                  <em className="accent-italic">inizia qui.</em>
                </h2>
                <p className="text-white/35 text-base font-light leading-relaxed mb-10 max-w-sm mx-auto">
                  Non lasciare che la tecnologia ti superi. Guidiamo la tua trasformazione digitale passo dopo passo.
                </p>
                <button
                  onClick={() => navigate('/contatti')}
                  className="group inline-flex items-center gap-3 bg-[#0066FF] text-white font-semibold px-8 py-[15px] rounded-xl text-sm tracking-widest transition-all duration-300 hover:shadow-[0_0_50px_rgba(0,102,255,0.5)] hover:scale-105 active:scale-95"
                >
                  Contattaci ora
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AxisPartnerPage;
