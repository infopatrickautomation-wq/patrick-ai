
import React, { useEffect, useState } from 'react';
import { ArrowRight, Zap } from 'lucide-react';
import FloatingDots from '../components/FloatingDots';
import DotMatrixText from '../components/DotMatrixText';
import {
  useMotionTemplate,
  useMotionValue,
  motion,
  animate,
} from 'framer-motion';

const NEON_GREEN = 'var(--accent)';
// framer-motion interpola numericamente i colori: non può leggere custom
// property CSS, quindi l'animazione usa esadecimali letterali (stesso hue
// dell'accent, invariato tra i due temi).
const ACCENT_HEX = '#1A2CB0';
const ACCENT_LIGHT_HEX = '#3350F0';
const ACCENT_DARK_HEX = '#0C1866';

const Hero: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const color = useMotionValue(ACCENT_HEX);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    animate(color, [ACCENT_HEX, ACCENT_LIGHT_HEX, ACCENT_DARK_HEX, ACCENT_HEX], {
      ease: 'easeInOut',
      duration: 8,
      repeat: Infinity,
      repeatType: 'mirror',
    });
  }, []);

  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #080B12 50%, ${color})`;
  const border = useMotionTemplate`1px solid ${color}`;
  const boxShadow = useMotionTemplate`0px 4px 28px ${color}`;

  const scrollToSection = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.section
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-4"
    >
      {/* Sfondo pallini animati */}
      <FloatingDots count={70} rise={620} />

      <div className="relative z-10 text-center max-w-7xl mx-auto pt-32 pb-24">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-10"
          style={{ border: '1px solid rgba(var(--accent-rgb),0.4)', background: 'rgba(var(--accent-rgb),0.06)' }}
        >
          <Zap className="w-4 h-4" style={{ color: NEON_GREEN }} />
          <span className="text-xs font-bold uppercase" style={{ color: NEON_GREEN, letterSpacing: '0.25em' }}>
            AI Automation Agency
          </span>
        </motion.div>

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={visible ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.1 }}
          className="mb-10 flex justify-center"
        >
          <div className="relative w-52 h-52 sm:w-64 sm:h-64 md:w-80 md:h-80 flex items-center justify-center transition-transform duration-700 hover:scale-105">
            <img
              src="/logo-blue-dark.png"
              alt="PatrickAI Logo"
              className="logo-swap-dark w-full h-auto"
              style={{ filter: 'drop-shadow(0 0 32px rgba(var(--accent-rgb),0.35))' }}
            />
            <img
              src="/logo-blue-light.png"
              alt="PatrickAI Logo"
              className="logo-swap-light w-full h-auto"
              style={{ filter: 'drop-shadow(0 0 32px rgba(var(--accent-rgb),0.35))' }}
            />
          </div>
        </motion.div>

        {/* Main Title */}
        <motion.div
          initial={{ opacity: 0, y: 48 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <h1
            className="leading-tight tracking-tight mb-6"
            style={{
              fontFamily: 'Outfit, sans-serif',
              fontSize: 'clamp(3rem, 8vw, 96px)',
              fontWeight: 900,
              letterSpacing: '-2.88px',
              lineHeight: 1.1,
              color: 'var(--title)',
            }}
          >
            L'Evoluzione<br />
            <span className="inline-flex" style={{ margin: '6px 0', textShadow: '0 0 40px rgba(var(--accent-rgb),0.5)' }}>
              <DotMatrixText text="INTELLIGENTE" dot={5} gap={1.3} charGap={4} />
            </span><br />
            del Business
          </h1>
          <p className="text-sm md:text-base font-black mb-6 tracking-[0.4em]" style={{ color: 'rgba(var(--accent-rgb),0.6)' }}>
            — Oltre ogni confine digitale —
          </p>
        </motion.div>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <p className="text-lg sm:text-xl max-w-2xl mx-auto mb-14 leading-relaxed font-light" style={{ color: 'rgba(var(--title-rgb),0.55)' }}>
            Automazioni AI su misura per aziende, professionisti e imprenditori. Elimina il lavoro manuale e scala il tuo business senza limiti.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => scrollToSection('#contatti')}
              className="group flex items-center gap-3 font-semibold px-7 py-[14px] rounded-xl text-sm tracking-widest transition-colors"
              style={{ border, boxShadow, background: 'rgba(var(--accent-rgb),0.08)', color: 'var(--title)' } as React.CSSProperties}
            >
              Prenota una Call Gratuita
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
            <button
              onClick={() => scrollToSection('#soluzioni')}
              className="group flex items-center gap-3 font-semibold px-7 py-[14px] rounded-xl text-sm tracking-widest transition-all duration-300 hover:scale-105 active:scale-95"
              style={{ border: '1px solid rgba(var(--title-rgb),0.15)', color: 'rgba(var(--title-rgb),0.7)', background: 'transparent' }}
            >
              Scopri i Servizi
            </button>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40 animate-bounce">
        <span className="text-[9px] tracking-[0.4em] font-black" style={{ color: NEON_GREEN }}>Scroll</span>
        <div className="w-[1px] h-8" style={{ background: `linear-gradient(to bottom, ${NEON_GREEN}, transparent)` }} />
      </div>
    </motion.section>
  );
};

export default Hero;
