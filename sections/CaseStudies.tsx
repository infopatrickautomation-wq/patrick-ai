
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useMouseGlow, glowDivStyle } from '../hooks/useMouseGlow';
import DotMatrixText from '../components/DotMatrixText';
import FloatingDots from '../components/FloatingDots';

const caseStudies = [
  {
    tab: 'Studio Consulenza',
    category: 'Lead Generation',
    title: 'Studio Consulenza',
    challenge: 'Raccolta manuale di contatti potenziali da diverse fonti, processo lungo e poco efficiente che sottraeva ore preziose ogni giorno al team commerciale.',
    solution: 'Sistema automatizzato di raccolta e qualifica lead da multiple fonti con scoring automatico e notifiche in tempo reale al team di vendita.',
    results: [
      { value: '+300%', label: 'Lead qualificati' },
      { value: '-80%', label: 'Tempo di raccolta' },
    ],
  },
  {
    tab: 'Commercialista',
    category: 'Automazione Fiscale',
    title: 'Studio Commercialista',
    challenge: 'Compilazione manuale ripetitiva del Modello F24 per decine di clienti ogni mese, con alto rischio di errori e tempi di consegna imprevedibili.',
    solution: 'Automazione completa della compilazione F24 con pre-compilazione dati da gestionale, verifica automatica degli errori e archiviazione digitale.',
    results: [
      { value: '10h', label: 'Risparmiate ogni mese' },
      { value: '0', label: 'Errori di compilazione' },
    ],
  },
  {
    tab: 'Agenzia Recruitment',
    category: 'Social Automation',
    title: 'Agenzia Recruitment',
    challenge: 'Ricerca manuale di annunci lavorativi e pubblicazione su Facebook richiedeva 2 ore al giorno, sottraendo tempo alla gestione dei candidati.',
    solution: 'Sistema automatizzato di scraping annunci, filtro per rilevanza e pubblicazione programmata sui canali social con report settimanale.',
    results: [
      { value: '2h', label: 'Risparmio al giorno' },
      { value: '24/7', label: 'Operatività continua' },
    ],
  },
];

const cardVariants = {
  enter: { opacity: 0, y: 20 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const CaseStudies: React.FC = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal<HTMLDivElement>();
  const [active, setActive] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const { glowRef, onMouseMove, onMouseLeave } = useMouseGlow();

  return (
    <section id="casi-studio" className="bg-[var(--bg)] relative py-32 overflow-hidden">
      <FloatingDots />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--border-soft)] to-transparent" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          ref={headerRef}
          className={`text-center mb-14 transition-all duration-700 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <p className="mono-label text-sm mb-4" style={{ color: 'var(--accent)' }}>CASE STUDIES</p>
          <h2 className="text-[var(--title)] mb-4 tracking-tight flex flex-col items-center gap-2" style={{ fontFamily: 'Outfit, sans-serif', fontSize: '60px', fontWeight: 700, lineHeight: '60px' }}>
            <span>Casi di</span>
            <DotMatrixText text="SUCCESSO" dot={5.5} gap={1.5} charGap={5} />
          </h2>
          <p className="text-[var(--body)] text-lg">Esempi concreti di processi trasformati dall'AI.</p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {caseStudies.map((s, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className="px-7 py-[14px] rounded-full text-xs font-semibold tracking-widest transition-all duration-300"
              style={
                active === i
                  ? { background: 'var(--accent)', color: '#fff', border: '1px solid var(--accent)' }
                  : { background: 'transparent', color: 'var(--body)', border: '1px solid var(--border-soft)' }
              }
            >
              {s.tab}
            </button>
          ))}
        </div>

        {/* Card */}
        <div style={{ position: 'relative', minHeight: '340px' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              variants={cardVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              whileHover={{ y: -3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}
              className="neon-card relative overflow-hidden"
              style={{
                background: 'var(--bg-alt)',
                border: isHovered ? '2.5px solid var(--accent)' : '2.5px solid rgba(var(--accent-rgb),0.55)',
                boxShadow: isHovered ? '0 0 22px rgba(var(--accent-rgb),0.28), 0 4px 24px rgba(0,0,0,0.08)' : '0 0 12px rgba(var(--accent-rgb),0.12), 0 2px 16px rgba(0,0,0,0.06)',
                borderRadius: '24px',
                transition: 'border-color 0.3s ease',
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseMove={(e) => { setIsHovered(true); onMouseMove(e); }}
              onMouseLeave={() => { setIsHovered(false); onMouseLeave(); }}
            >
              <div ref={glowRef} style={glowDivStyle} />
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--border-soft)] to-transparent" />

              {/* Vertical divider */}
              <div
                className="hidden md:block absolute top-0 bottom-0 w-px pointer-events-none"
                style={{
                  left: 'calc(60% - 0.5px)',
                  background: isHovered ? 'var(--accent)' : 'var(--border-soft)',
                  transition: 'background 0.3s ease',
                }}
              />

              <div className="grid md:grid-cols-[3fr_2fr] gap-0">
                {/* Left column */}
                <div className="p-12 md:p-16">
                  <span className="text-[var(--accent)] text-xs font-black tracking-[0.3em] mb-6 block">
                    — {caseStudies[active].category} —
                  </span>
                  <h3
                    className="text-5xl md:text-6xl text-[var(--title)] mb-12 leading-tight tracking-tighter"
                    style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700 }}
                  >
                    {caseStudies[active].title}
                  </h3>

                  <div className="space-y-8">
                    <div>
                      <h4 className="text-[var(--body)] text-xs tracking-[0.25em] font-black mb-4">La Sfida</h4>
                      <p className="text-[#e8e2d2]/70 text-base leading-relaxed">{caseStudies[active].challenge}</p>
                    </div>
                    <div>
                      <h4 className="text-[var(--accent)] text-xs tracking-[0.25em] font-black mb-4">La Nostra Soluzione</h4>
                      <p className="text-[#e8e2d2]/70 text-base leading-relaxed">{caseStudies[active].solution}</p>
                    </div>
                  </div>
                </div>

                {/* Right column */}
                <div className="p-12 md:p-16 flex flex-col justify-center gap-12">
                  {caseStudies[active].results.map((r, ri) => (
                    <div key={ri} className="flex items-start gap-3">
                      {ri === 0 && (
                        <span
                          className="mt-4 w-2.5 h-2.5 rounded-full flex-shrink-0"
                          style={{ background: 'var(--accent)' }}
                        />
                      )}
                      <div className={ri !== 0 ? 'pl-5' : ''}>
                        <div
                          className="leading-none mb-2"
                          style={{
                            fontFamily: 'Outfit, sans-serif',
                            fontWeight: 900,
                            fontSize: 'clamp(3.5rem, 6vw, 5.5rem)',
                            color: 'var(--accent)',
                          }}
                        >
                          {r.value}
                        </div>
                        <div className="text-[var(--body)] text-xs tracking-widest font-bold">{r.label}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
