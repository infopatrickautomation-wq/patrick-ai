
import React, { useState, useEffect } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import Navbar from '../sections/Navbar';
import Footer from '../sections/Footer';
import CustomCursor from '../components/CustomCursor';
import { useMouseGlow, glowDivStyle } from '../hooks/useMouseGlow';

const inputClass =
  'w-full bg-[#0a1628] border border-[rgba(59,130,246,0.2)] rounded-2xl px-5 py-4 text-white placeholder-white/20 text-sm outline-none transition-all duration-200 focus:border-[#3B82F6] focus:shadow-[0_0_0_3px_rgba(59,130,246,0.08)]';

const labelClass = 'block text-[10px] tracking-[0.25em] font-black text-white/30 mb-2 ml-1';

const selectClass =
  'w-full bg-[#0a1628] border border-[rgba(59,130,246,0.2)] rounded-2xl px-5 py-4 text-white text-sm outline-none transition-all duration-200 focus:border-[#3B82F6] focus:shadow-[0_0_0_3px_rgba(59,130,246,0.08)] appearance-none cursor-pointer';

const Field: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div className="space-y-1">
    <label className={labelClass}>{label}</label>
    {children}
  </div>
);

const ContactPage: React.FC = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { glowRef, onMouseMove, onMouseLeave } = useMouseGlow();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div style={{ background: '#050d1a' }} className="min-h-screen selection:bg-[#3B82F6]/20">
      <CustomCursor />
      <Navbar />

      <main className="pt-36 pb-32 px-4">
        <div className="max-w-3xl mx-auto">

          {/* Header */}
          <div className="mb-16">
            <p className="text-[#4A9FFF] text-[10px] tracking-[0.35em] font-black mb-5">— CONTATTACI —</p>
            <h1 className="text-white tracking-tight leading-tight mb-6" style={{ fontFamily: 'Manrope, sans-serif', fontSize: '96px', fontWeight: 500, letterSpacing: '-2.88px', lineHeight: '105.6px' }}>
              Parliamo del<br />
              <span className="accent-italic">tuo progetto.</span>
            </h1>
            <p className="text-white/40 text-lg font-light">
              Compila il form per fissare una call conoscitiva gratuita.
            </p>
          </div>

          {/* Form card */}
          <div
            className="neon-card relative rounded-[2rem] overflow-hidden border border-[rgba(59,130,246,0.15)] transition-all duration-300"
            style={{ background: '#0a1628' }}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
          >
            <div ref={glowRef} style={glowDivStyle} />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#3B82F6]/30 to-transparent" />

            {isSubmitted ? (
              <div className="text-center py-24 px-8 relative z-10">
                <CheckCircle className="w-20 h-20 text-[#3B82F6] mx-auto mb-8 drop-shadow-[0_0_30px_rgba(59,130,246,0.5)]" />
                <h2 className="text-white mb-3" style={{ fontFamily: 'Manrope, sans-serif', fontSize: '60px', fontWeight: 400, lineHeight: '60px' }}>Richiesta Inviata!</h2>
                <p className="text-white/40 text-lg">Ti contatterò personalmente entro 24 ore.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-6 relative z-10">

                {/* Row 1 */}
                <div className="grid md:grid-cols-2 gap-6">
                  <Field label="Nome e Cognome *">
                    <input required className={inputClass} placeholder="Mario Rossi" />
                  </Field>
                  <Field label="Email *">
                    <input required type="email" className={inputClass} placeholder="mario@azienda.com" />
                  </Field>
                </div>

                {/* Row 2 */}
                <div className="grid md:grid-cols-2 gap-6">
                  <Field label="Numero di Telefono">
                    <div className="relative flex">
                      <span className="flex items-center px-4 bg-[#0a1628] border border-r-0 border-[rgba(59,130,246,0.2)] rounded-l-2xl text-white/40 text-sm font-bold whitespace-nowrap">
                        +39
                      </span>
                      <input
                        type="tel"
                        className="flex-1 bg-[#0a1628] border border-[rgba(59,130,246,0.2)] rounded-r-2xl px-5 py-4 text-white placeholder-white/20 text-sm outline-none transition-all duration-200 focus:border-[#3B82F6] focus:shadow-[0_0_0_3px_rgba(59,130,246,0.08)]"
                        placeholder="351 830 2839"
                      />
                    </div>
                  </Field>
                  <Field label="Nome Azienda">
                    <input className={inputClass} placeholder="Acme S.r.l." />
                  </Field>
                </div>

                {/* Row 3 */}
                <div className="grid md:grid-cols-2 gap-6">
                  <Field label="Qual è il tuo ruolo in azienda?">
                    <input className={inputClass} placeholder="CEO, Responsabile IT, ..." />
                  </Field>
                  <Field label="A quale servizio sei interessato?">
                    <div className="relative">
                      <select className={selectClass} defaultValue="">
                        <option value="" disabled>Seleziona un servizio</option>
                        <option value="automazione">Automazione Processi</option>
                        <option value="agent">AI Agent</option>
                        <option value="analisi">Analisi &amp; Progettazione</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                        <svg className="w-4 h-4 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </Field>
                </div>

                {/* Row 4 */}
                <div className="grid md:grid-cols-2 gap-6">
                  <Field label="Fatturato Annuale">
                    <div className="relative">
                      <select className={selectClass} defaultValue="">
                        <option value="" disabled>Seleziona una fascia</option>
                        <option value="lt100k">Meno di 100k</option>
                        <option value="100k-500k">100k – 500k</option>
                        <option value="500k-1m">500k – 1M</option>
                        <option value="gt1m">Oltre 1M</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                        <svg className="w-4 h-4 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </Field>
                  <Field label="Dimensione Azienda">
                    <div className="relative">
                      <select className={selectClass} defaultValue="">
                        <option value="" disabled>Numero dipendenti</option>
                        <option value="1-10">1 – 10</option>
                        <option value="10-50">10 – 50</option>
                        <option value="50-200">50 – 200</option>
                        <option value="gt200">Oltre 200</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                        <svg className="w-4 h-4 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </Field>
                </div>

                {/* Row 5 – Come hai sentito */}
                <Field label="Come hai sentito parlare di noi?">
                  <div className="relative">
                    <select className={selectClass} defaultValue="">
                      <option value="" disabled>Seleziona un canale</option>
                      <option value="linkedin">LinkedIn</option>
                      <option value="google">Google</option>
                      <option value="passaparola">Passaparola</option>
                      <option value="social">Social Media</option>
                      <option value="altro">Altro</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                      <svg className="w-4 h-4 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </Field>

                {/* Row 6 – Textarea */}
                <Field label="Descrivi il tuo progetto">
                  <textarea
                    className={`${inputClass} min-h-[160px] resize-none`}
                    placeholder="Raccontaci il tuo progetto, le sfide che affronti e i risultati che vuoi raggiungere..."
                  />
                </Field>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full bg-[#3B82F6] text-black font-semibold px-7 py-[14px] rounded-xl text-sm tracking-widest flex items-center justify-center gap-3 transition-all duration-300 hover:shadow-[0_0_40px_rgba(59,130,246,0.45)] hover:scale-[1.01] active:scale-[0.99]"
                >
                  Invia Richiesta
                  <Send className="w-5 h-5" />
                </button>

                <p className="text-center text-white/20 text-xs tracking-wide">
                  Rispondo entro 24 ore. Nessuno spam, promesso.
                </p>
              </form>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ContactPage;
