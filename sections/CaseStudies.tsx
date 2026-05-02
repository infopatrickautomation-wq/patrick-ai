
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useMouseGlow, glowDivStyle } from '../hooks/useMouseGlow';

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
    <section id="casi-studio" className="bg-[#050d1a] relative py-32">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#3B82F6]/20 to-transparent" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          ref={headerRef}
          className={`text-center mb-14 transition-all duration-700 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <p className="text-[#4A9FFF] text-xs tracking-[0.3em] font-black mb-4">— Case studies —</p>
          <h2 className="text-white mb-4 tracking-tight" style={{ fontFamily: 'Manrope, sans-serif', fontSize: '60px', fontWeight: 400, lineHeight: '60px' }}>
            Casi di <span className="accent-italic">Successo.</span>
          </h2>
          <p className="text-white/40 text-lg">Esempi concreti di processi trasformati dall'AI.</p>
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
                  ? { background: '#fff', color: '#000', border: '1px solid #fff' }
                  : { background: 'transparent', color: 'rgba(255,255,255,0.45)', border: '1px solid rgba(255,255,255,0.15)' }
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
              whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(59,130,246,0.15)' }}
              className="neon-card relative overflow-hidden"
              style={{
                background: '#0a1628',
                border: isHovered ? '1.5px solid rgba(59,130,246,0.8)' : '1.5px solid rgba(59,130,246,0.15)',
                borderRadius: '24px',
                transition: 'border-color 0.3s ease',
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseMove={(e) => { setIsHovered(true); onMouseMove(e); }}
              onMouseLeave={() => { setIsHovered(false); onMouseLeave(); }}
            >
              <div ref={glowRef} style={glowDivStyle} />
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#3B82F6]/25 to-transparent" />

              {/* Vertical divider */}
              <div
                className="hidden md:block absolute top-0 bottom-0 w-px pointer-events-none"
                style={{
                  left: 'calc(60% - 0.5px)',
                  background: isHovered ? 'rgba(59,130,246,0.8)' : 'rgba(59,130,246,0.2)',
                  boxShadow: isHovered ? '0 0 8px rgba(59,130,246,0.5)' : 'none',
                  transition: 'background 0.3s ease, box-shadow 0.3s ease',
                }}
              />

              <div className="grid md:grid-cols-[3fr_2fr] gap-0">
                {/* Left column */}
                <div className="p-12 md:p-16">
                  <span className="text-[#3B82F6] text-xs font-black tracking-[0.3em] mb-6 block">
                    — {caseStudies[active].category} —
                  </span>
                  <h3
                    className="text-5xl md:text-6xl text-white mb-12 leading-tight tracking-tighter"
                    style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800 }}
                  >
                    {caseStudies[active].title}
                  </h3>

                  <div className="space-y-8">
                    <div>
                      <h4 className="text-white/40 text-xs tracking-[0.25em] font-black mb-4">La Sfida</h4>
                      <p className="text-white/65 text-base leading-relaxed">{caseStudies[active].challenge}</p>
                    </div>
                    <div>
                      <h4 className="text-[#3B82F6] text-xs tracking-[0.25em] font-black mb-4">La Nostra Soluzione</h4>
                      <p className="text-white/65 text-base leading-relaxed">{caseStudies[active].solution}</p>
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
                          style={{ background: '#3B82F6', boxShadow: '0 0 10px rgba(59,130,246,0.7)' }}
                        />
                      )}
                      <div className={ri !== 0 ? 'pl-5' : ''}>
                        <div
                          className="leading-none mb-2"
                          style={{
                            fontFamily: 'Outfit, sans-serif',
                            fontWeight: 900,
                            fontSize: 'clamp(3.5rem, 6vw, 5.5rem)',
                            color: '#fff',
                          }}
                        >
                          {r.value}
                        </div>
                        <div className="text-white/40 text-xs tracking-widest font-bold">{r.label}</div>
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
