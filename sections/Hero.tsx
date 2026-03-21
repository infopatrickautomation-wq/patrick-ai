
import React, { useEffect, useState } from 'react';
import { ArrowRight, Zap } from 'lucide-react';
import ParticlesBackground from '../components/ParticlesBackground';

const Hero: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);


  const scrollToSection = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      <ParticlesBackground />
      {/* Radial glow yellow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_60%,rgba(0,102,255,0.07)_0%,transparent_65%)] z-0 pointer-events-none" />
      {/* Radial glow blue */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_30%,rgba(0,102,255,0.08)_0%,transparent_55%)] z-0 pointer-events-none" />

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-32 pb-24">

        {/* Badge */}
        <div className={`inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#0066FF]/20 bg-[#0066FF]/5 mb-10 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
          <Zap className="w-4 h-4 text-[#0066FF]" />
          <span className="text-[#0066FF] text-xs tracking-[0.2em] font-bold">AI Automation Agency</span>
        </div>

        {/* Logo */}
        <div className={`mb-10 flex justify-center transition-all duration-1000 delay-100 ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
          <div className="relative group">
            <div className="absolute inset-0 bg-[#0066FF]/20 blur-[120px] rounded-full scale-150 animate-pulse" />
            <div className="absolute inset-0 bg-[#0066FF]/10 blur-[100px] rounded-full scale-125 animate-pulse delay-700" />
            <div className="relative w-52 h-52 sm:w-64 sm:h-64 md:w-80 md:h-80 flex items-center justify-center transition-transform duration-700 group-hover:scale-105">
              <img
                src="https://i.ibb.co/zh2W9Mcs/Chat-GPT-Image-4-feb-2026-10-54-50.png"
                alt="PatrickAI Logo"
                className="w-full h-auto drop-shadow-[0_0_60px_rgba(0,102,255,0.6)] filter brightness-110"
              />
            </div>
          </div>
        </div>

        {/* Main Title */}
        <div className={`transition-all duration-1000 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[7rem] font-black text-white leading-[0.88] tracking-tighter font-montserrat mb-6">
            L'Evoluzione<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0066FF] via-[#0066FF] to-[#0066FF]">
              Intelligente
            </span><br />
            del Business
          </h1>
          <p className="text-sm md:text-base font-black text-[#0066FF] mb-6 tracking-[0.4em]">
            — Oltre ogni confine digitale —
          </p>
        </div>

        {/* Subtitle */}
        <div className={`transition-all duration-700 delay-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-lg sm:text-xl text-white/50 max-w-2xl mx-auto mb-14 leading-relaxed font-light">
            Automazioni AI su misura per ristoranti e hotel. Risparmia centinaia di ore ogni mese e scala il tuo business senza limiti.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <button
              onClick={() => scrollToSection('#contatti')}
              className="group flex items-center gap-3 bg-[#0066FF] text-white font-black px-10 py-5 rounded-full text-sm tracking-widest transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,102,255,0.5)] hover:scale-105 active:scale-95"
            >
              Prenota una Call Gratuita
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => scrollToSection('#soluzioni')}
              className="flex items-center gap-3 text-white font-bold px-10 py-5 rounded-full text-sm tracking-widest border border-white/15 hover:border-[#0066FF]/40 hover:text-[#0066FF] transition-all duration-300"
            >
              Scopri i Servizi
            </button>
          </div>
        </div>
      </div>

      {/* Orbs */}
      <div className="absolute top-1/3 -left-64 w-[600px] h-[600px] bg-[#0066FF]/5 blur-[180px] rounded-full animate-pulse" />
      <div className="absolute bottom-1/4 -right-64 w-[500px] h-[500px] bg-[#0066FF]/5 blur-[150px] rounded-full animate-pulse delay-1000" />

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-25 animate-bounce">
        <span className="text-[9px] tracking-[0.4em] font-black text-[#0066FF]">Scroll</span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-[#0066FF] to-transparent" />
      </div>
    </section>
  );
};

export default Hero;
