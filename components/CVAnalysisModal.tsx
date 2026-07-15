
import React, { useEffect, useState } from 'react';
import { X, Check, ArrowRight, Calendar, Calculator, Plus, Minus, TrendingUp, Clock, Euro } from 'lucide-react';

interface CVAnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CVAnalysisModal: React.FC<CVAnalysisModalProps> = ({ isOpen, onClose }) => {
  const [sector, setSector] = useState('Ristoranti');
  const [employees, setEmployees] = useState(30);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleContactClick = () => {
    onClose();
    setTimeout(() => {
      const contactSection = document.getElementById('contatti');
      contactSection?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  if (!isOpen) return null;

  const sectors = ['Ristoranti', 'Hotel', 'Immobiliare', 'Altro'];

  const calculateSavings = () => {
    const hourlyCost = 22;
    let hours = 0;

    switch (sector) {
      case 'Ristoranti':
      case 'Hotel':
        hours = 15 + (employees * 0.5);
        break;
      case 'Immobiliare':
        hours = employees * 5;
        break;
      default:
        hours = employees * 2;
        break;
    }

    return {
      hours: Math.round(hours),
      money: Math.round(hours * hourlyCost)
    };
  };

  const { hours: hoursSaved, money: moneySaved } = calculateSavings();

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10 pt-24">
      <div
        className="absolute inset-0 backdrop-blur-md transition-opacity duration-300"
        style={{ background: 'rgba(var(--bg-rgb),0.95)' }}
        onClick={onClose}
      />

      <div className="relative w-full max-w-7xl max-h-[calc(100vh-120px)] overflow-y-auto rounded-[2.5rem] border border-[var(--border-soft)] animate-in fade-in zoom-in duration-300 scrollbar-hide" style={{ background: 'var(--bg)', boxShadow: '0 0 80px rgba(0,0,0,0.15)' }}>

        <button
          onClick={onClose}
          className="absolute top-8 right-8 p-3 rounded-full text-[var(--body)] hover:bg-[#332A20]/40 hover:text-[var(--title)] transition-all z-[110]"
          style={{ background: 'rgba(var(--border-soft-rgb),0.2)' }}
          title="Chiudi"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-8 md:p-16 lg:p-20">

          <div className="flex flex-col items-center text-center mb-20">
            <div className="inline-block px-4 py-1.5 rounded-full border border-[#1A2CB0]/40 bg-[#1A2CB0]/8 text-[var(--accent)] text-[10px] font-black tracking-[0.2em] mb-8">
              OPERATIVO IN 48 ORE
            </div>

            <h1 className="text-[var(--title)] leading-tight mb-12 tracking-tight" style={{ fontFamily: 'Outfit, sans-serif', fontSize: '96px', fontWeight: 900, letterSpacing: '-2.88px', lineHeight: '105.6px' }}>
              Fino a <span className="marker-underline">100 Ore</span> <br className="hidden md:block" />
              Risparmiate.
            </h1>

            <div className="flex flex-col sm:flex-row gap-6 w-full max-w-2xl">
              <button
                onClick={() => window.location.href = 'tel:3518302839'}
                className="flex-1 bg-[var(--accent)] text-white font-semibold px-7 py-[14px] rounded-full text-xs tracking-widest hover:scale-105 hover:bg-[var(--accent-light)] transition-all flex items-center justify-center gap-3"
              >
                <Calendar className="w-4 h-4" />
                Prenota una Call
              </button>
              <button
                onClick={() => {
                  const el = document.getElementById('calcolatore');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex-1 bg-transparent border border-[var(--border-soft)] text-[var(--title)] font-semibold px-7 py-[14px] rounded-full text-xs tracking-widest hover:bg-[#332A20]/30 hover:border-[#1A2CB0]/40 transition-all flex items-center justify-center gap-3"
              >
                <Calculator className="w-4 h-4 text-[var(--accent)]" />
                Calcola il tuo Risparmio
              </button>
            </div>
          </div>

          <div className="mb-16 border-t border-[var(--border-soft)] pt-16">
            <h2 className="text-[var(--title)] tracking-tight mb-4" style={{ fontFamily: 'Outfit, sans-serif', fontSize: '60px', fontWeight: 700, lineHeight: '60px' }}>
              Automazione Screening <br />
              <em style={{ color: 'var(--accent)', fontStyle: 'italic' }}>CV &amp; Recruitment</em>
            </h2>
            <div className="h-1 w-20 bg-[var(--accent)] rounded-full mb-16"></div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-20">
              <div className="bg-[var(--bg-alt)] border border-[var(--border-soft)] rounded-[2rem] p-10 flex flex-col transition-all duration-300 hover:border-[var(--accent)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)]" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                <h3 className="text-3xl font-black text-[var(--title)] mb-10" style={{ fontFamily: 'Outfit, sans-serif' }}>Il Problema</h3>
                <div className="text-[var(--body)] text-lg leading-relaxed space-y-4">
                  <p>
                    Ogni mese l'ufficio HR riceve centinaia di candidature. La selezione manuale è un processo lento e ripetitivo che richiede oltre 15 ore a settimana.
                  </p>
                  <p>
                    Spesso i talenti migliori vengono persi tra le email perché non c'è un sistema rapido per filtrarli in base alle competenze reali.
                  </p>
                </div>
              </div>

              <div className="bg-[#1A2CB0]/5 border-2 border-[var(--accent)] rounded-[2.5rem] p-10 flex flex-col hover:shadow-[0_4px_20px_rgba(var(--accent-rgb),0.2)] transition-all duration-300 relative" style={{ boxShadow: '0 2px 12px rgba(var(--accent-rgb),0.08)' }}>
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[var(--accent)] text-white text-[10px] font-black tracking-widest px-4 py-1 rounded-full shadow-lg">
                  Consigliato
                </div>
                <h3 className="text-3xl font-black text-[var(--accent)] mb-10" style={{ fontFamily: 'Outfit, sans-serif' }}>La Soluzione <br/><span className="text-xs tracking-widest opacity-70 text-[var(--body)]">(n8n + AI)</span></h3>
                <ul className="space-y-6">
                  {[
                    { label: "Ricezione", text: "Il flusso monitora le email o i form di candidatura." },
                    { label: "Analisi", text: "L'IA estrae i dati dai PDF e confronta il profilo con la Job Description." },
                    { label: "Ranking", text: "Il sistema assegna un punteggio da 1 a 100 ad ogni candidato." },
                    { label: "Organizzazione", text: "I dati salvati su Google Sheets e i profili migliori segnalati su Telegram." }
                  ].map((item, i) => (
                    <li key={i} className="flex gap-4 items-start">
                      <Check className="w-5 h-5 text-[var(--accent)] mt-1 flex-shrink-0" />
                      <span className="text-[var(--title)] text-base font-medium leading-snug">
                        <strong className="text-[var(--accent)] text-[10px] tracking-widest block mb-0.5">{item.label}</strong>
                        {item.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-[var(--bg-alt)] border border-[var(--border-soft)] rounded-[2rem] p-10 flex flex-col transition-all duration-300 hover:border-[var(--accent)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)]" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                <h3 className="text-3xl font-black text-[var(--title)] mb-10" style={{ fontFamily: 'Outfit, sans-serif' }}>Il Risultato</h3>
                <ul className="space-y-8">
                  <li className="flex gap-4 items-start">
                    <Check className="w-5 h-5 text-[var(--accent)] mt-1 flex-shrink-0" />
                    <span className="text-[var(--body)] text-lg leading-snug">
                      <span className="marker-underline text-[var(--title)] font-black">-85% di tempo</span> dedicato allo screening iniziale.
                    </span>
                  </li>
                  <li className="flex gap-4 items-start">
                    <Check className="w-5 h-5 text-[var(--accent)] mt-1 flex-shrink-0" />
                    <span className="text-[var(--body)] text-lg leading-snug">Zero errori di valutazione manuale.</span>
                  </li>
                  <li className="flex gap-4 items-start">
                    <Check className="w-5 h-5 text-[var(--accent)] mt-1 flex-shrink-0" />
                    <span className="text-[var(--body)] text-lg leading-snug">Risposta immediata ai candidati qualificati, migliorando il brand aziendale.</span>
                  </li>
                </ul>
              </div>
            </div>

            <div id="calcolatore" className="max-w-4xl mx-auto bg-[var(--bg-alt)] border border-[var(--border-soft)] rounded-[3rem] p-8 md:p-14 mb-20" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
              <h3 className="text-3xl md:text-5xl font-black text-[var(--title)] text-center mb-16 leading-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Quanto puoi <span className="marker-underline">risparmiare</span> con <br /> il nostro <em style={{ color: 'var(--accent)' }}>Sistema</em>?
              </h3>

              <div className="grid md:grid-cols-2 gap-12 items-end">
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-[var(--body)] tracking-[0.2em] ml-2">Settore</label>
                  <div className="grid grid-cols-2 gap-3">
                    {sectors.map((s) => (
                      <button
                        key={s}
                        onClick={() => { setSector(s); setShowResult(false); }}
                        className={`px-7 py-[14px] rounded-full text-sm font-semibold border transition-all ${
                          sector === s
                            ? 'bg-[var(--accent)] text-white border-[var(--accent)]'
                            : 'bg-transparent border-[var(--border-soft)] text-[var(--body)] hover:border-[#1A2CB0]/40'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-black text-[var(--body)] tracking-[0.2em] ml-2">Numero Dipendenti</label>
                  <div className="flex items-center justify-between bg-[var(--bg)] border border-[var(--border-soft)] rounded-2xl p-2">
                    <button
                      onClick={() => { setEmployees(Math.max(1, employees - 1)); setShowResult(false); }}
                      className="w-12 h-12 flex items-center justify-center text-[var(--body)] hover:text-[var(--title)] hover:bg-[#332A20]/30 rounded-xl transition-all"
                    >
                      <Minus className="w-5 h-5" />
                    </button>
                    <span className="text-2xl font-black text-[var(--title)]" style={{ fontFamily: 'Outfit, sans-serif' }}>{employees}</span>
                    <button
                      onClick={() => { setEmployees(employees + 1); setShowResult(false); }}
                      className="w-12 h-12 flex items-center justify-center text-[var(--body)] hover:text-[var(--title)] hover:bg-[#332A20]/30 rounded-xl transition-all"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {showResult && (
                <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="bg-[#1A2CB0]/10 border border-[#1A2CB0]/20 rounded-3xl p-8 flex items-center gap-6">
                    <div className="w-14 h-14 rounded-2xl bg-[var(--accent)] flex items-center justify-center shrink-0">
                      <Clock className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <div className="text-3xl font-black text-[var(--title)]" style={{ fontFamily: 'Outfit, sans-serif' }}>{hoursSaved}h</div>
                      <div className="text-[10px] font-bold text-[var(--accent)] tracking-widest">Ore Risparmiate / Mese</div>
                    </div>
                  </div>
                  <div className="bg-[#1A2CB0]/10 border border-[#1A2CB0]/20 rounded-3xl p-8 flex items-center gap-6">
                    <div className="w-14 h-14 rounded-2xl bg-[var(--accent)] flex items-center justify-center shrink-0">
                      <Euro className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <div className="text-3xl font-black text-[var(--title)]" style={{ fontFamily: 'Outfit, sans-serif' }}>{moneySaved.toLocaleString()}€</div>
                      <div className="text-[10px] font-bold text-[var(--accent)] tracking-widest">Risparmio Stimato / Mese</div>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-16 flex justify-center">
                <button
                  onClick={() => setShowResult(true)}
                  className="bg-[var(--accent)] hover:scale-105 hover:bg-[var(--accent-light)] text-white font-semibold px-7 py-[14px] rounded-full text-sm tracking-widest transition-all flex items-center gap-3"
                >
                  <TrendingUp className="w-5 h-5" />
                  Scopri il Risparmio
                </button>
              </div>
            </div>
          </div>

          <div className="mt-20 pt-10 border-t border-[var(--border-soft)] flex flex-col sm:flex-row items-center justify-between gap-8">
            <div className="text-[var(--body)] text-sm font-medium italic">
              * Implementazione basata su stack N8N + OpenAI + WhatsApp API
            </div>
            <div className="flex gap-4 w-full sm:w-auto">
              <button
                onClick={onClose}
                className="flex-1 sm:flex-none px-7 py-[14px] rounded-full bg-[#332A20]/30 text-[var(--title)] font-semibold hover:bg-[#332A20]/60 transition-all tracking-widest text-sm"
              >
                Chiudi
              </button>
              <button
                className="flex-1 sm:flex-none bg-[var(--accent)] text-white font-semibold px-7 py-[14px] rounded-full text-sm tracking-widest hover:scale-105 hover:bg-[var(--accent-light)] transition-all flex items-center justify-center gap-3"
                onClick={handleContactClick}
              >
                Contattami Ora
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CVAnalysisModal;
