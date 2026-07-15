import React from 'react';
import { motion } from 'framer-motion';
import DotMatrixText from '../components/DotMatrixText';

/*
 * PatrickAI — Agent Team (stile "Rubric")
 * 3 agenti reali: Robo (orchestratore), Code (tecnico) e Blitz (commerciale),
 * con le icone pixel-art ufficiali fornite da Patrick (stile "Pixel Street").
 */

type Agent = {
  name: string;
  role: string;
  image: string;
  glow: string; // colore del bagliore sotto l'icona
};

const AGENTS: Agent[] = [
  {
    name: 'ROBO',
    role: 'Orchestratore',
    image: '/agent-robo.png',
    glow: '26, 44, 176',
  },
  {
    name: 'CODE',
    role: 'Tecnico · n8n & Codice',
    image: '/agent-code.png',
    glow: '79,166,235',
  },
  {
    name: 'BLITZ',
    role: 'Commerciale · Outreach',
    image: '/agent-blitz.png',
    glow: '245,197,66',
  },
];

const DOTS = Array.from({ length: 34 }).map((_, i) => ({
  left: (i * 37) % 100,
  delay: (i * 0.37) % 6,
  duration: 5 + ((i * 13) % 7),
  size: 2 + (i % 3),
}));

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};
const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 90, damping: 18 } },
};

const AgentsTeam: React.FC = () => {
  return (
    <section
      id="agenti"
      className="relative py-32 overflow-hidden transition-colors duration-500"
      style={{ backgroundColor: 'var(--bg)' }}
    >
      <style>{`
        @keyframes rubricDotFloat {
          0% { transform: translateY(0); opacity: 0; }
          12% { opacity: 1; }
          88% { opacity: 1; }
          100% { transform: translateY(-160px); opacity: 0; }
        }
      `}</style>

      {/* sfondo puntinato animato */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {DOTS.map((d, i) => (
          <span
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${d.left}%`,
              bottom: '-10px',
              width: d.size,
              height: d.size,
              backgroundColor: 'rgba(var(--dot-rgb),0.5)',
              animation: `rubricDotFloat ${d.duration}s linear ${d.delay}s infinite`,
            }}
          />
        ))}
      </div>

      {/* atmosfera */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          background: 'radial-gradient(60% 50% at 50% 0%, rgba(var(--accent-rgb),0.1), transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        {/* Section label */}
        <div className="text-center mb-16">
          <p className="mono-label text-sm mb-5" style={{ color: 'var(--accent)' }}>
            AGENT TEAM <span className="mx-2">◆</span> PIXEL ICONS <span className="mx-2">◆</span> 03 UNITÀ
          </p>
          <h2
            className="tracking-tighter leading-none transition-colors duration-500 flex flex-col items-center gap-3"
            style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: 'clamp(2.25rem, 5.5vw, 4.25rem)', color: 'var(--title)' }}
          >
            <span>Tre agenti. Un command</span>
            <DotMatrixText text="CENTER" dot={5.5} gap={1.5} charGap={5} />
          </h2>
          <p className="mt-6 text-base md:text-lg max-w-xl mx-auto leading-relaxed transition-colors duration-500" style={{ color: 'var(--body)' }}>
            Ogni processo ha il suo specialista. Lavorano insieme, in autonomia, 24/7.
          </p>
        </div>

        {/* Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 max-w-4xl mx-auto"
        >
          {AGENTS.map((a, i) => (
            <motion.div key={a.name} variants={item} className="relative">
              {/* bordo posteriore sfalsato */}
              <div
                className="absolute inset-0 rounded-md transition-colors duration-500"
                style={{
                  border: '1.5px solid rgba(var(--accent-rgb),0.6)',
                  transform: 'translate(7px, 7px)',
                }}
              />
              {/* card frontale */}
              <div
                className="group relative flex flex-col items-center text-center rounded-md p-8 transition-colors duration-500"
                style={{
                  background: 'var(--bg-alt)',
                  border: '1.5px solid rgba(var(--title-rgb),0.85)',
                }}
              >
                <span
                  className="mono-label absolute top-4 right-5 text-[10px]"
                  style={{ color: 'var(--accent)' }}
                >
                  0{i + 1}
                </span>

                <motion.div
                  className="w-16 h-16 md:w-20 md:h-20 mb-6"
                  animate={{ y: [0, -14, 0] }}
                  transition={{
                    duration: 0.9,
                    ease: 'easeInOut',
                    repeat: Infinity,
                    repeatDelay: (AGENTS.length - 1) * 0.28 + 1.1,
                    delay: i * 0.28,
                  }}
                  style={{ filter: `drop-shadow(0 6px 18px rgba(${a.glow},0.45))` }}
                >
                  <img src={a.image} alt={a.name} className="w-full h-full object-contain" />
                </motion.div>

                <span
                  className="tracking-widest transition-colors duration-500"
                  style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '16px', color: 'var(--title)' }}
                >
                  {a.name}
                </span>
                <span className="mt-1 text-[12px] leading-snug transition-colors duration-500" style={{ color: 'var(--body)' }}>
                  {a.role}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Contesto — perché questi agenti */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mt-16 text-base md:text-lg max-w-2xl mx-auto text-center leading-relaxed transition-colors duration-500"
          style={{ color: 'var(--body)' }}
        >
          Non sono un semplice software: sono i miei <span style={{ color: 'var(--title)', fontWeight: 600 }}>assistenti personali</span>.
          Li comando direttamente da <span style={{ color: 'var(--accent)', fontWeight: 600 }}>Telegram</span>, ovunque io sia — anche fuori casa —
          e lavorano in totale autonomia: posso seguirli in tempo reale oppure lasciarli operare da soli mentre penso ad altro.
          Ognuno ha il suo ruolo, ma insieme sono un unico team sempre attivo, nel palmo della mano.
        </motion.p>
      </div>
    </section>
  );
};

export default AgentsTeam;
