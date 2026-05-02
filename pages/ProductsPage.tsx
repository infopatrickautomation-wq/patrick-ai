import React, { useRef, useEffect } from 'react';
import Navbar from '../sections/Navbar';
import Footer from '../sections/Footer';
import CustomCursor from '../components/CustomCursor';
import { navigate } from '../hooks/useRoute';

/* ── Keyframe animations injected once ── */
const STYLES = `
@keyframes flux-flow {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
@keyframes nova-pulse {
  0%, 100% { opacity: 0.6; transform: scale(1); }
  50%       { opacity: 1;   transform: scale(1.06); }
}
@keyframes axis-mesh {
  0%   { background-position: 0% 0%, 100% 100%; }
  50%  { background-position: 100% 50%,   0% 50%; }
  100% { background-position: 0% 0%, 100% 100%; }
}
@keyframes particle-drift {
  0%   { transform: translateY(0px)   translateX(0px)  scale(1);   opacity: 0.7; }
  33%  { transform: translateY(-18px) translateX(10px) scale(1.2); opacity: 1; }
  66%  { transform: translateY(-8px)  translateX(-8px) scale(0.9); opacity: 0.5; }
  100% { transform: translateY(0px)   translateX(0px)  scale(1);   opacity: 0.7; }
}
@keyframes arrow-nudge {
  0%, 100% { transform: translateX(0); }
  50%       { transform: translateX(5px); }
}
.product-card {
  position: relative;
  background: #0a1628;
  border: 1.5px solid rgba(59,130,246,0.15);
  border-radius: 28px;
  overflow: hidden;
  transition: transform 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease;
  cursor: pointer;
}
.product-card:hover {
  transform: translateY(-4px);
}
.product-card .card-btn .btn-arrow {
  display: inline-block;
  transition: transform 0.3s ease;
}
.product-card:hover .card-btn .btn-arrow {
  animation: arrow-nudge 0.6s ease infinite;
}
`;

/* ── Mouse glow per-card ── */
function useCardGlows(count: number) {
  const glowRefs = useRef<(HTMLDivElement | null)[]>(Array(count).fill(null));

  const onMouseMove = (i: number) => (e: React.MouseEvent<HTMLElement>) => {
    const glow = glowRefs.current[i];
    if (!glow) return;
    const rect = e.currentTarget.getBoundingClientRect();
    glow.style.left = `${e.clientX - rect.left - 250}px`;
    glow.style.top  = `${e.clientY - rect.top  - 250}px`;
    glow.style.opacity = '1';
  };

  const onMouseLeave = (i: number) => () => {
    const glow = glowRefs.current[i];
    if (glow) glow.style.opacity = '0';
  };

  return { glowRefs, onMouseMove, onMouseLeave };
}

/* ── Visual sections per card ── */
const FluxVisual: React.FC = () => (
  <div
    style={{
      background: 'linear-gradient(135deg, #001a4d, #0033aa, #0066ff, #003399, #001a66)',
      backgroundSize: '400% 400%',
      animation: 'flux-flow 6s ease infinite',
    }}
    className="relative w-full h-[200px] overflow-hidden"
  >
    {/* Particles */}
    {[
      { top: '20%', left: '15%', size: 8,  delay: '0s',    dur: '3.2s' },
      { top: '60%', left: '40%', size: 5,  delay: '0.8s',  dur: '4s'   },
      { top: '35%', left: '70%', size: 10, delay: '1.4s',  dur: '3.6s' },
      { top: '75%', left: '80%', size: 4,  delay: '0.3s',  dur: '5s'   },
      { top: '15%', left: '55%', size: 6,  delay: '2s',    dur: '3.8s' },
      { top: '50%', left: '25%', size: 7,  delay: '1s',    dur: '4.4s' },
      { top: '80%', left: '55%', size: 3,  delay: '1.6s',  dur: '3s'   },
    ].map((p, i) => (
      <div
        key={i}
        style={{
          position: 'absolute',
          top: p.top,
          left: p.left,
          width: p.size,
          height: p.size,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.85)',
          animation: `particle-drift ${p.dur} ${p.delay} ease-in-out infinite`,
          boxShadow: '0 0 6px rgba(255,255,255,0.6)',
        }}
      />
    ))}
    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 60%, #0a1628)' }} />
    <div style={{
      position: 'absolute', top: '50%', left: '50%',
      transform: 'translate(-50%, -50%)',
      fontSize: 52, fontWeight: 900, color: 'rgba(255,255,255,0.08)',
      letterSpacing: '-2px', userSelect: 'none', fontFamily: 'Montserrat, sans-serif',
    }}>FLUX</div>
  </div>
);

const NovaVisual: React.FC = () => (
  <div
    style={{ background: '#0a1628', position: 'relative' }}
    className="w-full h-[200px] overflow-hidden"
  >
    {/* Pulse rings */}
    {[80, 130, 180].map((size, i) => (
      <div
        key={i}
        style={{
          position: 'absolute',
          top: '50%', left: '50%',
          width: size, height: size,
          borderRadius: '50%',
          border: '1px solid rgba(59,130,246,0.4)',
          transform: 'translate(-50%, -50%)',
          animation: `nova-pulse 2.4s ${i * 0.6}s ease-in-out infinite`,
        }}
      />
    ))}
    {/* Core glow */}
    <div style={{
      position: 'absolute', top: '50%', left: '50%',
      width: 40, height: 40, borderRadius: '50%',
      background: 'radial-gradient(circle, #0066ff 0%, rgba(59,130,246,0.3) 60%, transparent 100%)',
      transform: 'translate(-50%, -50%)',
      boxShadow: '0 0 40px rgba(59,130,246,0.7)',
      animation: 'nova-pulse 2.4s ease-in-out infinite',
    }} />
    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 60%, #0a1628)' }} />
    <div style={{
      position: 'absolute', top: '50%', left: '50%',
      transform: 'translate(-50%, -50%)',
      fontSize: 52, fontWeight: 900, color: 'rgba(59,130,246,0.07)',
      letterSpacing: '-2px', userSelect: 'none', fontFamily: 'Montserrat, sans-serif',
    }}>NOVA</div>
  </div>
);

const AxisVisual: React.FC = () => (
  <div
    style={{
      background: 'linear-gradient(135deg, #000510 0%, #001040 50%, #000510 100%), linear-gradient(225deg, #0022880d 0%, transparent 50%)',
      backgroundSize: '300% 300%, 200% 200%',
      animation: 'axis-mesh 8s ease infinite',
      position: 'relative',
    }}
    className="w-full h-[200px] overflow-hidden"
  >
    {/* Grid mesh lines */}
    <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.18 }}>
      {[0, 1, 2, 3, 4, 5, 6].map(i => (
        <line key={`v${i}`} x1={`${(i / 6) * 100}%`} y1="0" x2={`${(i / 6) * 100}%`} y2="100%"
          stroke="#0066ff" strokeWidth="0.5" />
      ))}
      {[0, 1, 2, 3, 4].map(i => (
        <line key={`h${i}`} x1="0" y1={`${(i / 4) * 100}%`} x2="100%" y2={`${(i / 4) * 100}%`}
          stroke="#0066ff" strokeWidth="0.5" />
      ))}
    </svg>
    {/* Corner accents */}
    <div style={{
      position: 'absolute', top: 18, left: 18,
      width: 28, height: 28,
      borderTop: '2px solid rgba(59,130,246,0.7)',
      borderLeft: '2px solid rgba(59,130,246,0.7)',
    }} />
    <div style={{
      position: 'absolute', top: 18, right: 18,
      width: 28, height: 28,
      borderTop: '2px solid rgba(59,130,246,0.7)',
      borderRight: '2px solid rgba(59,130,246,0.7)',
    }} />
    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 60%, #0a1628)' }} />
    <div style={{
      position: 'absolute', top: '50%', left: '50%',
      transform: 'translate(-50%, -50%)',
      fontSize: 52, fontWeight: 900, color: 'rgba(59,130,246,0.1)',
      letterSpacing: '-2px', userSelect: 'none', fontFamily: 'Montserrat, sans-serif',
    }}>AXIS</div>
  </div>
);

/* ── Products data ── */
const products = [
  {
    Visual: FluxVisual,
    title: (
      <>
        Flux <em className="accent-italic">Agent</em>
      </>
    ),
    description:
      "L'agente AI che automatizza i tuoi processi aziendali. Elimina le attività manuali ripetitive, integra i tuoi strumenti e fa girare il tuo business in automatico 24/7.",
    cta: 'Scopri Flux',
    href: '/flux-agent',
  },
  {
    Visual: NovaVisual,
    title: (
      <>
        Nova <em className="accent-italic">Agent</em>
      </>
    ),
    description:
      "L'agente AI intelligente per lead generation e customer service. Gestisce conversazioni, qualifica contatti e prenota appuntamenti automaticamente.",
    cta: 'Scopri Nova',
    href: '/nova-agent',
  },
  {
    Visual: AxisVisual,
    title: (
      <>
        Axis <em className="accent-italic">Partner</em>
      </>
    ),
    description:
      'Il tuo partner strategico per l\'analisi e progettazione di sistemi AI su misura. Analizziamo i tuoi processi, identifichiamo le opportunità e costruiamo la roadmap perfetta per la tua azienda.',
    cta: 'Scopri Axis',
    href: '/axis-partner',
  },
];

/* ── Single card ── */
const ProductCard: React.FC<{
  product: typeof products[0];
  index: number;
  glowRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
  onMouseMove: (i: number) => (e: React.MouseEvent<HTMLElement>) => void;
  onMouseLeave: (i: number) => () => void;
  large?: boolean;
}> = ({ product, index, glowRefs, onMouseMove, onMouseLeave, large }) => {
  const { Visual, title, description, cta, href } = product;

  return (
    <div
      className="neon-card product-card"
      onMouseMove={onMouseMove(index)}
      onMouseLeave={onMouseLeave(index)}
    >
      {/* Mouse glow layer */}
      <div
        ref={el => { glowRefs.current[index] = el; }}
        style={{
          position: 'absolute',
          width: 500, height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(59,130,246,0.13) 0%, transparent 65%)',
          opacity: 0,
          pointerEvents: 'none',
          transition: 'opacity 0.3s ease',
          zIndex: 1,
        }}
      />

      {/* Top highlight line */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.3), transparent)', zIndex: 2 }} />

      {/* Visual */}
      <Visual />

      {/* Content */}
      <div className="relative z-10 p-7">
        <h3
          style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 900, letterSpacing: '-0.5px' }}
          className={`text-white mb-3 ${large ? 'text-4xl' : 'text-3xl'}`}
        >
          {title}
        </h3>
        <p className="text-white/50 text-sm leading-relaxed mb-6">
          {description}
        </p>
        <button
          className="card-btn group flex items-center gap-2 bg-[#3B82F6] text-black text-sm font-semibold tracking-widest px-7 py-[14px] rounded-xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] hover:scale-105 active:scale-95"
          onClick={() => navigate(href)}
        >
          {cta}
          <span className="btn-arrow">→</span>
        </button>
      </div>
    </div>
  );
};

/* ── Page ── */
const ProductsPage: React.FC = () => {
  const { glowRefs, onMouseMove, onMouseLeave } = useCardGlows(3);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ background: '#050d1a' }} className="min-h-screen selection:bg-[#3B82F6]/20">
      <style>{STYLES}</style>
      <CustomCursor />
      <Navbar />

      <main className="pt-36 pb-32 px-4">
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <div className="text-center mb-20">
            <p className="text-[#4A9FFF] text-[10px] tracking-[0.35em] font-black mb-5">
              — I NOSTRI PRODOTTI —
            </p>
            <h1
              className="tracking-tight leading-tight text-white mb-6"
              style={{ fontFamily: 'Manrope, sans-serif', fontSize: '96px', fontWeight: 500, letterSpacing: '-2.88px', lineHeight: '105.6px' }}
            >
              I Nostri{' '}
              <em className="accent-italic">Prodotti</em>
            </h1>
            <p className="text-white/40 text-lg font-light max-w-md mx-auto leading-relaxed">
              Agenti AI e automazioni pronti all'uso per far evolvere il tuo business.
            </p>
          </div>

          {/* Cards grid — 2 columns top row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {products.slice(0, 2).map((product, i) => (
              <ProductCard
                key={i}
                product={product}
                index={i}
                glowRefs={glowRefs}
                onMouseMove={onMouseMove}
                onMouseLeave={onMouseLeave}
              />
            ))}
          </div>

          {/* Card 3 — large centered */}
          <div className="max-w-2xl mx-auto">
            <ProductCard
              product={products[2]}
              index={2}
              glowRefs={glowRefs}
              onMouseMove={onMouseMove}
              onMouseLeave={onMouseLeave}
              large
            />
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductsPage;
