
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
    <section id="contatti" className="py-32 bg-[#EDEAE3] relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C8C3BB] to-transparent" />

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <p className="text-[#857E78] text-xs tracking-[0.3em] font-medium mb-4 uppercase" style={{ letterSpacing: '0.14em' }}>— Contattaci —</p>
          <h2 className="text-[#1C1C1C] mb-4 tracking-tight" style={{ fontFamily: 'Playfair Display, serif', fontSize: '60px', fontWeight: 700, lineHeight: '60px' }}>
            Lavoriamo<br />
            <em style={{ color: '#2A5C3F', fontStyle: 'italic' }}>Insieme.</em>
          </h2>
          <p className="text-[#857E78] text-lg font-light">Consulenza gratuita e personalizzata. Rispondo entro 24 ore.</p>
        </div>

        <div
          className="neon-card bg-[#E4E0D8] backdrop-blur-sm rounded-[2.5rem] p-10 md:p-16 border border-[#C8C3BB] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
          style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
        >
          <div ref={glowRef} style={glowDivStyle} />
          {isSubmitted ? (
            <div className="text-center py-10 relative z-10">
              <CheckCircle className="w-20 h-20 text-[#2A5C3F] mx-auto mb-6" />
              <h3 className="text-3xl font-black text-[#1C1C1C]" style={{ fontFamily: 'Playfair Display, serif' }}>Richiesta Inviata!</h3>
              <p className="text-[#857E78] mt-3">Ti ricontatterò personalmente entro 24 ore.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-xs tracking-widest font-bold text-[#857E78] ml-2">Nome</label>
                  <input
                    required
                    className="w-full bg-[#EDEAE3] border border-[#C8C3BB] p-5 rounded-2xl text-[#1C1C1C] placeholder-[#857E78]/60 focus:border-[#2A5C3F] focus:shadow-[0_0_0_3px_rgba(42,92,63,0.08)] transition-all outline-none"
                    placeholder="Inserisci il tuo nome"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs tracking-widest font-bold text-[#857E78] ml-2">Email</label>
                  <input
                    required
                    type="email"
                    className="w-full bg-[#EDEAE3] border border-[#C8C3BB] p-5 rounded-2xl text-[#1C1C1C] placeholder-[#857E78]/60 focus:border-[#2A5C3F] focus:shadow-[0_0_0_3px_rgba(42,92,63,0.08)] transition-all outline-none"
                    placeholder="nome@azienda.com"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs tracking-widest font-bold text-[#857E78] ml-2">Messaggio</label>
                <textarea
                  required
                  className="w-full bg-[#EDEAE3] border border-[#C8C3BB] p-5 rounded-2xl text-[#1C1C1C] placeholder-[#857E78]/60 focus:border-[#2A5C3F] focus:shadow-[0_0_0_3px_rgba(42,92,63,0.08)] transition-all outline-none min-h-[150px] resize-none"
                  placeholder="Descrivi brevemente il tuo progetto o le tue necessità..."
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#2A5C3F] text-white font-semibold px-7 py-[14px] rounded-xl text-sm tracking-widest hover:bg-[#3D7055] transition-all flex items-center justify-center gap-3 active:scale-[0.98] hover:scale-[1.01]"
              >
                Invia Richiesta
                <Send className="w-5 h-5" />
              </button>
            </form>
          )}
        </div>

        <div className="flex flex-col md:flex-row justify-center gap-10 mt-16 text-[#857E78]">
          <a href="tel:3518302839" className="flex items-center gap-4 group hover:text-[#1C1C1C] transition-colors">
            <div className="w-12 h-12 rounded-xl bg-[#2A5C3F]/10 border border-[#2A5C3F]/20 flex items-center justify-center group-hover:bg-[#2A5C3F]/20 transition-colors">
              <Phone className="w-5 h-5 text-[#2A5C3F]" />
            </div>
            <span className="text-lg font-medium">351 830 2839</span>
          </a>
          <a href="mailto:info.patrickautomation@gmail.com" className="flex items-center gap-4 group hover:text-[#1C1C1C] transition-colors">
            <div className="w-12 h-12 rounded-xl bg-[#2A5C3F]/10 border border-[#2A5C3F]/20 flex items-center justify-center group-hover:bg-[#2A5C3F]/20 transition-colors">
              <Mail className="w-5 h-5 text-[#2A5C3F]" />
            </div>
            <span className="text-lg font-medium">info.patrickautomation@gmail.com</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
