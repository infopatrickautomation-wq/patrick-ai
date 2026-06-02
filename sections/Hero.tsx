
import React, { useEffect, useState } from 'react';
import { ArrowRight, Zap } from 'lucide-react';
import { Stars } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import {
  useMotionTemplate,
  useMotionValue,
  motion,
  animate,
} from 'framer-motion';

const NEON_GREEN = '#00ff88';

const Hero: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const color = useMotionValue(NEON_GREEN);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    animate(color, ['#00ff88', '#2AFF7A', '#00cc66', '#00ff88'], {
      ease: 'easeInOut',
      duration: 8,
      repeat: Infinity,
      repeatType: 'mirror',
    });
  }, []);

  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #050d1a 50%, ${color})`;
  const border = useMotionTemplate`1px solid ${color}`;
  const boxShadow = useMotionTemplate`0px 4px 28px ${color}`;

  const scrollToSection = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.section
      style={{ backgroundImage }}
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-4"
    >
      {/* Stars canvas */}
      <div className="absolute inset-0 z-0">
        <Canvas>
          <Stars radius={50} count={2500} factor={4} fade speed={1.5} />
        </Canvas>
      </div>

      <div className="relative z-10 text-center max-w-7xl mx-auto pt-32 pb-24">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-10"
          style={{ border: '1px solid rgba(0,255,136,0.4)', background: 'rgba(0,255,136,0.06)' }}
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
              src="/logo.png"
              alt="PatrickAI Logo"
              className="w-full h-auto"
              style={{ filter: 'drop-shadow(0 0 32px rgba(0,255,136,0.35))' }}
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
            className="leading-tight tracking-tight mb-6 text-white"
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(3rem, 8vw, 96px)',
              fontWeight: 900,
              letterSpacing: '-2.88px',
              lineHeight: 1.1,
            }}
          >
            L'Evoluzione<br />
            <em style={{ color: NEON_GREEN, fontStyle: 'italic', textShadow: '0 0 40px rgba(0,255,136,0.5)' }}>
              Intelligente
            </em><br />
            del Business
          </h1>
          <p className="text-sm md:text-base font-black mb-6 tracking-[0.4em]" style={{ color: 'rgba(0,255,136,0.6)' }}>
            — Oltre ogni confine digitale —
          </p>
        </motion.div>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <p className="text-lg sm:text-xl max-w-2xl mx-auto mb-14 leading-relaxed font-light" style={{ color: 'rgba(255,255,255,0.55)' }}>
            Automazioni AI su misura per aziende, professionisti e imprenditori. Elimina il lavoro manuale e scala il tuo business senza limiti.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <motion.button
              style={{ border, boxShadow }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => scrollToSection('#contatti')}
              className="group flex items-center gap-3 font-semibold px-7 py-[14px] rounded-xl text-sm tracking-widest transition-colors"
              style={{ border, boxShadow, background: 'rgba(0,255,136,0.08)', color: '#fff' } as React.CSSProperties}
            >
              Prenota una Call Gratuita
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
            <button
              onClick={() => scrollToSection('#soluzioni')}
              className="group flex items-center gap-3 font-semibold px-7 py-[14px] rounded-xl text-sm tracking-widest transition-all duration-300 hover:scale-105 active:scale-95"
              style={{ border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.7)', background: 'transparent' }}
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
