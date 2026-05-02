
import React, { useState } from 'react';
import { Phone, Mail, Send, CheckCircle } from 'lucide-react';
import { useMouseGlow, glowDivStyle } from '../hooks/useMouseGlow';

const Contact: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { glowRef, onMouseMove, onMouseLeave } = useMouseGlow();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <section id="contatti" className="py-32 bg-[#050d1a] relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#3B82F6]/20 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(59,130,246,0.05)_0%,transparent_60%)]" />

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <p className="text-[#4A9FFF] text-xs tracking-[0.3em] font-black mb-4">— Contattaci —</p>
          <h2 className="text-white mb-4 tracking-tight" style={{ fontFamily: 'Manrope, sans-serif', fontSize: '60px', fontWeight: 400, lineHeight: '60px' }}>
            Lavoriamo<br />
            <span className="accent-italic">Insieme.</span>
          </h2>
          <p className="text-white/40 text-lg font-light">Consulenza gratuita e personalizzata. Rispondo entro 24 ore.</p>
        </div>

        <div
          className="neon-card bg-black/50 backdrop-blur-sm rounded-[2.5rem] p-10 md:p-16 border border-[rgba(59,130,246,0.15)] hover:-translate-y-1 transition-all duration-300 shadow-2xl relative overflow-hidden"
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
        >
          <div ref={glowRef} style={glowDivStyle} />
          {isSubmitted ? (
            <div className="text-center py-10 relative z-10">
              <CheckCircle className="w-20 h-20 text-[#3B82F6] mx-auto mb-6 drop-shadow-[0_0_20px_rgba(59,130,246,0.5)]" />
              <h3 className="text-3xl font-black text-white font-montserrat">Richiesta Inviata!</h3>
              <p className="text-white/40 mt-3">Ti ricontatterò personalmente entro 24 ore.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-xs tracking-widest font-bold text-white/30 ml-2">Nome</label>
                  <input
                    required
                    className="w-full bg-white/[0.04] border border-white/10 p-5 rounded-2xl text-white placeholder-white/20 focus:border-[#3B82F6]/50 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.05)] transition-all outline-none"
                    placeholder="Inserisci il tuo nome"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs tracking-widest font-bold text-white/30 ml-2">Email</label>
                  <input
                    required
                    type="email"
                    className="w-full bg-white/[0.04] border border-white/10 p-5 rounded-2xl text-white placeholder-white/20 focus:border-[#3B82F6]/50 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.05)] transition-all outline-none"
                    placeholder="nome@azienda.com"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs tracking-widest font-bold text-white/30 ml-2">Messaggio</label>
                <textarea
                  required
                  className="w-full bg-white/[0.04] border border-white/10 p-5 rounded-2xl text-white placeholder-white/20 focus:border-[#3B82F6]/50 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.05)] transition-all outline-none min-h-[150px] resize-none"
                  placeholder="Descrivi brevemente il tuo progetto o le tue necessità..."
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#3B82F6] text-black font-semibold px-7 py-[14px] rounded-xl text-sm tracking-widest hover:shadow-[0_0_40px_rgba(59,130,246,0.4)] transition-all flex items-center justify-center gap-3 active:scale-[0.98] hover:scale-[1.01]"
              >
                Invia Richiesta
                <Send className="w-5 h-5" />
              </button>
            </form>
          )}
        </div>

        <div className="flex flex-col md:flex-row justify-center gap-10 mt-16 text-white/50">
          <a href="tel:3518302839" className="flex items-center gap-4 group hover:text-white transition-colors">
            <div className="w-12 h-12 rounded-xl bg-[#3B82F6]/10 border border-[#3B82F6]/20 flex items-center justify-center group-hover:bg-[#3B82F6]/20 transition-colors">
              <Phone className="w-5 h-5 text-[#3B82F6]" />
            </div>
            <span className="text-lg font-medium">351 830 2839</span>
          </a>
          <a href="mailto:info.patrickautomation@gmail.com" className="flex items-center gap-4 group hover:text-white transition-colors">
            <div className="w-12 h-12 rounded-xl bg-[#3B82F6]/10 border border-[#3B82F6]/20 flex items-center justify-center group-hover:bg-[#3B82F6]/20 transition-colors">
              <Mail className="w-5 h-5 text-[#3B82F6]" />
            </div>
            <span className="text-lg font-medium">info.patrickautomation@gmail.com</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
