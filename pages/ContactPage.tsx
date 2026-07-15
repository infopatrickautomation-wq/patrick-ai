
import React, { useState, useEffect } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import Navbar from '../sections/Navbar';
import Footer from '../sections/Footer';
import CustomCursor from '../components/CustomCursor';
import { useMouseGlow, glowDivStyle } from '../hooks/useMouseGlow';
import DotMatrixText from '../components/DotMatrixText';

const inputClass =
  'w-full bg-[var(--bg)] border border-[var(--border-soft)] rounded-2xl px-5 py-4 text-[var(--title)] placeholder-[#8d8775]/60 text-sm outline-none transition-all duration-200 focus:border-[var(--accent)] focus:shadow-[0_0_0_3px_rgba(var(--accent-rgb),0.08)]';

const labelClass = 'block text-[10px] tracking-[0.25em] font-black text-[var(--body)] mb-2 ml-1';

const selectClass =
  'w-full bg-[var(--bg)] border border-[var(--border-soft)] rounded-2xl px-5 py-4 text-[var(--title)] text-sm outline-none transition-all duration-200 focus:border-[var(--accent)] focus:shadow-[0_0_0_3px_rgba(var(--accent-rgb),0.08)] appearance-none cursor-pointer';

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
    <div style={{ background: 'var(--bg)' }} className="min-h-screen selection:bg-[#1A2CB0]/15">
      <CustomCursor />
      <Navbar />

      <main className="pt-36 pb-32 px-4">
        <div className="max-w-3xl mx-auto">

          {/* Header */}
          <div className="mb-16">
            <p className="text-[var(--body)] text-[10px] tracking-[0.35em] font-medium mb-5 uppercase" style={{ letterSpacing: '0.14em' }}>— CONTATTACI —</p>
            <h1 className="text-[var(--title)] tracking-tight leading-tight mb-6 flex flex-col items-start gap-2" style={{ fontFamily: 'Outfit, sans-serif', fontSize: '96px', fontWeight: 900, letterSpacing: '-2.88px', lineHeight: '105.6px' }}>
              <span>Parliamo del</span>
              <DotMatrixText text="TUO PROGETTO" dot={5} gap={1.3} charGap={4} />
            </h1>
            <p className="text-[var(--body)] text-lg font-light">
              Compila il form per fissare una call conoscitiva gratuita.
            </p>
          </div>

          {/* Form card */}
          <div
            className="neon-card relative rounded-[2rem] overflow-hidden border border-[var(--border-soft)] transition-all duration-300"
            style={{ background: 'var(--bg-alt)', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
          >
            <div ref={glowRef} style={glowDivStyle} />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--border-soft)] to-transparent" />

            {isSubmitted ? (
              <div className="text-center py-24 px-8 relative z-10">
                <CheckCircle className="w-20 h-20 text-[var(--accent)] mx-auto mb-8" />
                <h2 className="text-[var(--title)] mb-3" style={{ fontFamily: 'Outfit, sans-serif', fontSize: '60px', fontWeight: 700, lineHeight: '60px' }}>Richiesta Inviata!</h2>
                <p className="text-[var(--body)] text-lg">Ti contatterò personalmente entro 24 ore.</p>
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
                      <span className="flex items-center px-4 bg-[var(--bg)] border border-r-0 border-[var(--border-soft)] rounded-l-2xl text-[var(--body)] text-sm font-bold whitespace-nowrap">
                        +39
                      </span>
                      <input
                        type="tel"
                        className="flex-1 bg-[var(--bg)] border border-[var(--border-soft)] rounded-r-2xl px-5 py-4 text-[var(--title)] placeholder-[#8d8775]/60 text-sm outline-none transition-all duration-200 focus:border-[var(--accent)] focus:shadow-[0_0_0_3px_rgba(var(--accent-rgb),0.08)]"
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
                        <svg className="w-4 h-4 text-[var(--body)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                        <svg className="w-4 h-4 text-[var(--body)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                        <svg className="w-4 h-4 text-[var(--body)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                      <svg className="w-4 h-4 text-[var(--body)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                  className="rubric-btn w-full px-7 py-[14px] rounded-lg text-sm tracking-widest flex items-center justify-center gap-3"
                >
                  Invia Richiesta
                  <Send className="w-5 h-5" />
                </button>

                <p className="text-center text-[var(--body)] text-xs tracking-wide">
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
