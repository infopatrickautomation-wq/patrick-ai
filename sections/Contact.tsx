
import React from 'react';
import { Phone, Mail, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { useMouseGlow, glowDivStyle } from '../hooks/useMouseGlow';
import DotMatrixText from '../components/DotMatrixText';
import FloatingDots from '../components/FloatingDots';
import { useContactForm } from '../hooks/useContactForm';

const Contact: React.FC = () => {
  const { glowRef, onMouseMove, onMouseLeave } = useMouseGlow();
  const { status, errorMessage, handleSubmit, reset } = useContactForm(
    'Nuova richiesta dal sito PatrickAI'
  );
  const isSubmitted = status === 'sent';
  const isSending = status === 'sending';

  return (
    <section id="contatti" className="py-32 bg-[var(--bg)] relative overflow-hidden">
      <FloatingDots />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--border-soft)] to-transparent" />

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <p className="mono-label text-sm mb-4" style={{ color: 'var(--accent)' }}>CONTATTACI</p>
          <h2 className="text-[var(--title)] mb-4 tracking-tight flex flex-col items-center gap-3" style={{ fontFamily: 'Outfit, sans-serif', fontSize: '60px', fontWeight: 700, lineHeight: '60px' }}>
            <span>Lavoriamo</span>
            <DotMatrixText text="INSIEME" dot={5.5} gap={1.5} charGap={5} />
          </h2>
          <p className="text-[var(--body)] text-lg font-light">Consulenza gratuita e personalizzata. Rispondo entro 24 ore.</p>
        </div>

        <div
          className="neon-card bg-[var(--bg-alt)] backdrop-blur-sm rounded-xl p-10 md:p-16 border border-[var(--border-soft)] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
          style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
        >
          <div ref={glowRef} style={glowDivStyle} />
          {isSubmitted ? (
            <div className="text-center py-10 relative z-10">
              <CheckCircle className="w-20 h-20 text-[var(--accent)] mx-auto mb-6" />
              <h3 className="text-3xl font-black text-[var(--title)]" style={{ fontFamily: 'Outfit, sans-serif' }}>Richiesta Inviata!</h3>
              <p className="text-[var(--body)] mt-3">Ti ricontatterò personalmente entro 24 ore.</p>
              <button
                onClick={reset}
                className="mt-6 text-sm text-[var(--accent)] hover:underline"
              >
                Scrivi un altro messaggio
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
              {/* trappola per i bot: nascosta, un umano non la compila mai */}
              <input
                type="text"
                name="_honey"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
              />
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-xs tracking-widest font-bold text-[var(--body)] ml-2">Nome</label>
                  <input
                    required
                    name="name"
                    autoComplete="name"
                    disabled={isSending}
                    className="w-full bg-[var(--bg)] border border-[var(--border-soft)] p-5 rounded-2xl text-[var(--title)] placeholder-[#8d8775]/60 focus:border-[var(--accent)] focus:shadow-[0_0_0_3px_rgba(var(--accent-rgb),0.08)] transition-all outline-none disabled:opacity-60"
                    placeholder="Inserisci il tuo nome"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs tracking-widest font-bold text-[var(--body)] ml-2">Email</label>
                  <input
                    required
                    type="email"
                    name="email"
                    autoComplete="email"
                    disabled={isSending}
                    className="w-full bg-[var(--bg)] border border-[var(--border-soft)] p-5 rounded-2xl text-[var(--title)] placeholder-[#8d8775]/60 focus:border-[var(--accent)] focus:shadow-[0_0_0_3px_rgba(var(--accent-rgb),0.08)] transition-all outline-none disabled:opacity-60"
                    placeholder="nome@azienda.com"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs tracking-widest font-bold text-[var(--body)] ml-2">Messaggio</label>
                <textarea
                  required
                  name="message"
                  disabled={isSending}
                  className="w-full bg-[var(--bg)] border border-[var(--border-soft)] p-5 rounded-2xl text-[var(--title)] placeholder-[#8d8775]/60 focus:border-[var(--accent)] focus:shadow-[0_0_0_3px_rgba(var(--accent-rgb),0.08)] transition-all outline-none min-h-[150px] resize-none disabled:opacity-60"
                  placeholder="Descrivi brevemente il tuo progetto o le tue necessità..."
                />
              </div>
              {status === 'error' && (
                <div
                  role="alert"
                  className="flex items-start gap-3 rounded-2xl border p-4 text-sm"
                  style={{ borderColor: 'rgba(200,80,70,0.35)', background: 'rgba(200,80,70,0.07)', color: 'var(--title)' }}
                >
                  <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#C85046' }} />
                  <span>{errorMessage}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isSending}
                className="rubric-btn w-full px-7 py-[14px] rounded-lg text-sm tracking-widest flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-wait"
              >
                {isSending ? 'Invio in corso...' : 'Invia Richiesta'}
                {isSending
                  ? <Loader2 className="w-5 h-5 animate-spin" />
                  : <Send className="w-5 h-5" />}
              </button>
            </form>
          )}
        </div>

        <div className="flex flex-col md:flex-row justify-center gap-10 mt-16 text-[var(--body)]">
          <a href="tel:3518302839" className="flex items-center gap-4 group hover:text-[var(--title)] transition-colors">
            <div className="w-12 h-12 rounded-xl bg-[#1A2CB0]/10 border border-[#1A2CB0]/20 flex items-center justify-center group-hover:bg-[#1A2CB0]/20 transition-colors">
              <Phone className="w-5 h-5 text-[var(--accent)]" />
            </div>
            <span className="text-lg font-medium">351 830 2839</span>
          </a>
          <a href="mailto:info.patrickautomation@gmail.com" className="flex items-center gap-4 group hover:text-[var(--title)] transition-colors">
            <div className="w-12 h-12 rounded-xl bg-[#1A2CB0]/10 border border-[#1A2CB0]/20 flex items-center justify-center group-hover:bg-[#1A2CB0]/20 transition-colors">
              <Mail className="w-5 h-5 text-[var(--accent)]" />
            </div>
            <span className="text-lg font-medium">info.patrickautomation@gmail.com</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
