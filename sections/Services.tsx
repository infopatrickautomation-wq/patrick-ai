
import React, { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { navigate } from '../hooks/useRoute';
import DotMatrixText from '../components/DotMatrixText';
import FloatingDots from '../components/FloatingDots';

const STYLES = `
@keyframes svc-flux-flow {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
@keyframes svc-nova-pulse {
  0%, 100% { opacity: 0.6; transform: scale(1); }
  50%       { opacity: 1;   transform: scale(1.06); }
}
@keyframes svc-axis-mesh {
  0%   { background-position: 0% 0%, 100% 100%; }
  50%  { background-position: 100% 50%, 0% 50%; }
  100% { background-position: 0% 0%, 100% 100%; }
}
@keyframes svc-particle-drift {
  0%   { transform: translateY(0px)   translateX(0px)  scale(1);   opacity: 0.7; }
  33%  { transform: translateY(-18px) translateX(10px) scale(1.2); opacity: 1; }
  66%  { transform: translateY(-8px)  translateX(-8px) scale(0.9); opacity: 0.5; }
  100% { transform: translateY(0px)   translateX(0px)  scale(1);   opacity: 0.7; }
}
@keyframes svc-arrow-nudge {
  0%, 100% { transform: translate(0, 0); }
  50%       { transform: translate(4px, -4px); }
}
.svc-product-card {
  position: relative;
  background: var(--bg-alt);
  border: 1.5px solid rgba(var(--title-rgb),0.85);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 7px 7px 0 0 rgba(var(--accent-rgb),0.6);
  transition: transform 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease;
  cursor: pointer;
}
.svc-product-card:hover {
  transform: translate(-2px, -2px);
  box-shadow: 9px 9px 0 0 rgba(var(--accent-rgb),0.75) !important;
}
.svc-product-card .svc-card-btn .svc-btn-arrow {
  display: inline-flex;
  transition: transform 0.3s ease;
}
.svc-product-card:hover .svc-card-btn .svc-btn-arrow {
  animation: svc-arrow-nudge 0.6s ease infinite;
}
`;

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

const glowStyle: React.CSSProperties = {
  position: 'absolute',
  width: 500, height: 500,
  borderRadius: '50%',
  background: 'radial-gradient(circle, rgba(var(--accent-rgb),0.08) 0%, transparent 65%)',
  opacity: 0,
  pointerEvents: 'none',
  transition: 'opacity 0.3s ease',
  zIndex: 1,
};

const FluxVisual: React.FC = () => (
  <div
    style={{
      background: 'linear-gradient(135deg, #5C2A0E, var(--accent), var(--accent-light), var(--accent), #5C2A0E)',
      backgroundSize: '400% 400%',
      animation: 'svc-flux-flow 6s ease infinite',
      position: 'relative',
    }}
    className="w-full h-[180px] overflow-hidden"
  >
    {[
      { top: '20%', left: '15%', size: 8,  delay: '0s',   dur: '3.2s' },
      { top: '60%', left: '40%', size: 5,  delay: '0.8s', dur: '4s'   },
      { top: '35%', left: '70%', size: 10, delay: '1.4s', dur: '3.6s' },
      { top: '75%', left: '80%', size: 4,  delay: '0.3s', dur: '5s'   },
      { top: '15%', left: '55%', size: 6,  delay: '2s',   dur: '3.8s' },
      { top: '50%', left: '25%', size: 7,  delay: '1s',   dur: '4.4s' },
    ].map((p, i) => (
      <div key={i} style={{
        position: 'absolute', top: p.top, left: p.left,
        width: p.size, height: p.size, borderRadius: '50%',
        background: 'rgba(255,255,255,0.85)',
        animation: `svc-particle-drift ${p.dur} ${p.delay} ease-in-out infinite`,
        boxShadow: '0 0 6px rgba(255,255,255,0.6)',
      }} />
    ))}
    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 60%, var(--bg-alt))' }} />
    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: 52, fontWeight: 900, color: 'rgba(255,255,255,0.12)', letterSpacing: '-2px', userSelect: 'none', fontFamily: 'Outfit, sans-serif' }}>FLUX</div>
  </div>
);

const NovaVisual: React.FC = () => (
  <div style={{ background: 'var(--bg-alt)', position: 'relative' }} className="w-full h-[180px] overflow-hidden">
    {[80, 130, 180].map((size, i) => (
      <div key={i} style={{
        position: 'absolute', top: '50%', left: '50%',
        width: size, height: size, borderRadius: '50%',
        border: '1px solid rgba(var(--accent-rgb),0.4)',
        transform: 'translate(-50%, -50%)',
        animation: `svc-nova-pulse 2.4s ${i * 0.6}s ease-in-out infinite`,
      }} />
    ))}
    <div style={{
      position: 'absolute', top: '50%', left: '50%',
      width: 40, height: 40, borderRadius: '50%',
      background: 'var(--accent)',
      transform: 'translate(-50%, -50%)',
      boxShadow: '0 0 20px rgba(var(--accent-rgb),0.4)',
      animation: 'svc-nova-pulse 2.4s ease-in-out infinite',
    }} />
    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 60%, var(--bg-alt))' }} />
    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: 52, fontWeight: 900, color: 'rgba(var(--accent-rgb),0.10)', letterSpacing: '-2px', userSelect: 'none', fontFamily: 'Outfit, sans-serif' }}>NOVA</div>
  </div>
);

const AxisVisual: React.FC = () => (
  <div style={{
    background: '#241A10',
    backgroundSize: '300% 300%, 200% 200%',
    animation: 'svc-axis-mesh 8s ease infinite',
    position: 'relative',
  }} className="w-full h-[180px] overflow-hidden">
    <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.5 }}>
      {[0, 1, 2, 3, 4, 5, 6].map(i => (
        <line key={`v${i}`} x1={`${(i / 6) * 100}%`} y1="0" x2={`${(i / 6) * 100}%`} y2="100%" stroke="var(--border-soft)" strokeWidth="0.5" />
      ))}
      {[0, 1, 2, 3, 4].map(i => (
        <line key={`h${i}`} x1="0" y1={`${(i / 4) * 100}%`} x2="100%" y2={`${(i / 4) * 100}%`} stroke="var(--border-soft)" strokeWidth="0.5" />
      ))}
    </svg>
    <div style={{ position: 'absolute', top: 18, left: 18, width: 28, height: 28, borderTop: '2px solid rgba(var(--accent-rgb),0.5)', borderLeft: '2px solid rgba(var(--accent-rgb),0.5)' }} />
    <div style={{ position: 'absolute', top: 18, right: 18, width: 28, height: 28, borderTop: '2px solid rgba(var(--accent-rgb),0.5)', borderRight: '2px solid rgba(var(--accent-rgb),0.5)' }} />
    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 60%, #241A10)' }} />
    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: 52, fontWeight: 900, color: 'rgba(var(--accent-rgb),0.12)', letterSpacing: '-2px', userSelect: 'none', fontFamily: 'Outfit, sans-serif' }}>AXIS</div>
  </div>
);

const products = [
  {
    Visual: AxisVisual,
    title: <><span className="inline-block mr-3 align-middle"><DotMatrixText text="AXIS" dot={5.5} gap={1.5} charGap={5} /></span> Partner</>,
    description: "Il tuo partner strategico per l'analisi e progettazione di sistemi AI su misura. Analizziamo i tuoi processi, identifichiamo le opportunità e costruiamo la roadmap perfetta per la tua azienda.",
    href: '/axis-partner',
    cta: 'Scopri Axis',
    large: true,
  },
  {
    Visual: FluxVisual,
    title: <><span className="inline-block mr-3 align-middle"><DotMatrixText text="FLUX" dot={5.5} gap={1.5} charGap={5} /></span> Agent</>,
    description: "L'agente AI che automatizza i tuoi processi aziendali. Elimina le attività manuali ripetitive, integra i tuoi strumenti e fa girare il tuo business in automatico 24/7.",
    href: '/flux-agent',
    cta: 'Scopri Flux',
    large: false,
  },
  {
    Visual: NovaVisual,
    title: <><span className="inline-block mr-3 align-middle"><DotMatrixText text="NOVA" dot={5.5} gap={1.5} charGap={5} /></span> Agent</>,
    description: "L'agente AI intelligente per lead generation e customer service. Gestisce conversazioni, qualifica contatti e prenota appuntamenti automaticamente.",
    href: '/nova-agent',
    cta: 'Scopri Nova',
    large: false,
  },
];

const Services: React.FC = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal<HTMLDivElement>();
  const { glowRefs, onMouseMove, onMouseLeave } = useCardGlows(3);

  return (
    <section id="soluzioni" className="py-32 bg-[var(--bg)] relative overflow-hidden">
      <style>{STYLES}</style>
      <FloatingDots />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--border-soft)] to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={headerRef}
          className={`text-center mb-20 transition-all duration-700 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <p className="mono-label text-sm mb-4" style={{ color: 'var(--accent)' }}>I NOSTRI PRODOTTI</p>
          <h2 className="text-[var(--title)] mb-6 tracking-tight flex flex-col items-center gap-3" style={{ fontFamily: 'Outfit, sans-serif', fontSize: '60px', fontWeight: 700, lineHeight: '60px' }}>
            <span>Scegli il tuo</span>
            <DotMatrixText text="PERCORSO" dot={5.5} gap={1.5} charGap={5} />
          </h2>
          <p className="text-[var(--body)] text-lg max-w-2xl mx-auto font-light">
            Agenti AI e automazioni pronti all'uso per far evolvere il tuo business.
          </p>
        </div>

        {/* Axis — full width */}
        <div
          className="svc-product-card mb-6"
          onMouseMove={onMouseMove(0)}
          onMouseLeave={onMouseLeave(0)}
          onClick={() => navigate(products[0].href)}
        >
          <div ref={el => { glowRefs.current[0] = el; }} style={glowStyle} />
          <AxisVisual />
          <div className="relative z-10 p-7">
            <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 900, letterSpacing: '-0.5px', fontSize: '60px' }} className="text-[var(--title)] mb-3">
              {products[0].title}
            </h3>
            <p className="text-[var(--body)] text-sm leading-relaxed mb-6">{products[0].description}</p>
            <button className="rubric-btn svc-card-btn group flex items-center gap-2 text-sm tracking-widest px-7 py-[14px] rounded-lg">
              {products[0].cta} <span className="svc-btn-arrow"><ArrowUpRight size={16} /></span>
            </button>
          </div>
        </div>

        {/* Flux + Nova — 2 columns */}
        <div className="grid md:grid-cols-2 gap-6">
          {products.slice(1).map((product, i) => (
            <div
              key={i}
              className="svc-product-card"
              onMouseMove={onMouseMove(i + 1)}
              onMouseLeave={onMouseLeave(i + 1)}
              onClick={() => navigate(product.href)}
            >
              <div ref={el => { glowRefs.current[i + 1] = el; }} style={glowStyle} />
              <product.Visual />
              <div className="relative z-10 p-7">
                <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 900, letterSpacing: '-0.5px', fontSize: '60px' }} className="text-[var(--title)] mb-3">
                  {product.title}
                </h3>
                <p className="text-[var(--body)] text-sm leading-relaxed mb-6">{product.description}</p>
                <button className="rubric-btn svc-card-btn group flex items-center gap-2 text-sm tracking-widest px-7 py-[14px] rounded-lg">
                  {product.cta} <span className="svc-btn-arrow"><ArrowUpRight size={16} /></span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
