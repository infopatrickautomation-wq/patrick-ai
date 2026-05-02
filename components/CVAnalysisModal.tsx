
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
    const hourlyCost = 22; // Costo orario medio fisso (costo aziendale)
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
        className="absolute inset-0 bg-[#050d1a]/95 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-7xl max-h-[calc(100vh-120px)] overflow-y-auto bg-[#050d1a] rounded-[2.5rem] border border-white/5 shadow-[0_0_80px_rgba(0,0,0,0.8)] animate-in fade-in zoom-in duration-300 scrollbar-hide">
        
        {/* Adjusted Close Button to be inside the modal body or slightly shifted */}
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 p-3 rounded-full bg-white/5 text-white/50 hover:bg-white/10 hover:text-white transition-all z-[110]"
          title="Chiudi"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-8 md:p-16 lg:p-20">
          
          <div className="flex flex-col items-center text-center mb-20">
            <div className="inline-block px-4 py-1.5 rounded-full border border-blue-600/40 bg-blue-600/5 text-blue-500 text-[10px] font-black tracking-[0.2em] mb-8">
              OPERATIVO IN 48 ORE
            </div>
            
            <h1 className="text-white leading-tight mb-12 tracking-tight" style={{ fontFamily: 'Manrope, sans-serif', fontSize: '96px', fontWeight: 500, letterSpacing: '-2.88px', lineHeight: '105.6px' }}>
              Fino a <span className="marker-underline">100 Ore</span> <br className="hidden md:block" />
              Risparmiate.
            </h1>

            <div className="flex flex-col sm:flex-row gap-6 w-full max-w-2xl">
              <button 
                onClick={() => window.location.href = 'tel:3518302839'}
                className="flex-1 bg-[#3B82F6] text-white font-semibold px-7 py-[14px] rounded-full text-xs tracking-widest hover:scale-105 transition-all shadow-[0_10px_30px_rgba(59,130,246,0.2)] flex items-center justify-center gap-3"
              >
                <Calendar className="w-4 h-4" />
                Prenota una Call
              </button>
              <button 
                onClick={() => {
                  const el = document.getElementById('calcolatore');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex-1 bg-transparent border border-white/10 text-white font-semibold px-7 py-[14px] rounded-full text-xs tracking-widest hover:bg-white/5 hover:border-white/20 transition-all flex items-center justify-center gap-3"
              >
                <Calculator className="w-4 h-4 text-blue-500" />
                Calcola il tuo Risparmio
              </button>
            </div>
          </div>

          <div className="mb-16 border-t border-white/5 pt-16">
            <h2 className="text-white tracking-tight mb-4" style={{ fontFamily: 'Manrope, sans-serif', fontSize: '60px', fontWeight: 400, lineHeight: '60px' }}>
              Automazione Screening <br />
              <span className="text-blue-600">CV & Recruitment</span>
            </h2>
            <div className="h-1 w-20 bg-blue-600 rounded-full mb-16"></div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-20">
              <div className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-10 flex flex-col transition-all duration-300 hover:border-blue-600 hover:shadow-[0_0_20px_rgba(37,99,235,0.3)]">
                <h3 className="text-3xl font-black text-white mb-10 font-montserrat">Il Problema</h3>
                <div className="text-white/60 text-lg leading-relaxed space-y-4">
                  <p>
                    Ogni mese l’ufficio HR riceve centinaia di candidature. La selezione manuale è un processo lento e ripetitivo che richiede oltre 15 ore a settimana.
                  </p>
                  <p>
                    Spesso i talenti migliori vengono persi tra le email perché non c'è un sistema rapido per filtrarli in base alle competenze reali.
                  </p>
                </div>
              </div>

              <div className="bg-blue-900/10 border-2 border-[#3B82F6] rounded-[2.5rem] p-10 flex flex-col shadow-[0_0_40px_rgba(59,130,246,0.1)] hover:shadow-[0_0_25px_rgba(59,130,246,0.4)] transition-all duration-300 relative">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#3B82F6] text-white text-[10px] font-black tracking-widest px-4 py-1 rounded-full shadow-lg">
                  Consigliato
                </div>
                <h3 className="text-3xl font-black text-blue-500 mb-10 font-montserrat leading-tight">La Soluzione <br/><span className="text-xs tracking-widest opacity-70">(n8n + AI)</span></h3>
                <ul className="space-y-6">
                  {[
                    { label: "Ricezione", text: "Il flusso monitora le email o i form di candidatura." },
                    { label: "Analisi", text: "L’IA estrae i dati dai PDF e confronta il profilo con la Job Description." },
                    { label: "Ranking", text: "Il sistema assegna un punteggio da 1 a 100 ad ogni candidato." },
                    { label: "Organizzazione", text: "I dati salvati su Google Sheets e i profili migliori segnalati su Telegram." }
                  ].map((item, i) => (
                    <li key={i} className="flex gap-4 items-start">
                      <Check className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                      <span className="text-white text-base font-medium leading-snug">
                        <strong className="text-blue-500 text-[10px] tracking-widest block mb-0.5">{item.label}</strong>
                        {item.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-10 flex flex-col transition-all duration-300 hover:border-blue-600 hover:shadow-[0_0_20px_rgba(37,99,235,0.3)]">
                <h3 className="text-3xl font-black text-white mb-10 font-montserrat">Il Risultato</h3>
                <ul className="space-y-8">
                  <li className="flex gap-4 items-start">
                    <Check className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                    <span className="text-white/60 text-lg leading-snug">
                      <span className="marker-underline text-white font-black">-85% di tempo</span> dedicato allo screening iniziale.
                    </span>
                  </li>
                  <li className="flex gap-4 items-start">
                    <Check className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                    <span className="text-white/60 text-lg leading-snug">Zero errori di valutazione manuale.</span>
                  </li>
                  <li className="flex gap-4 items-start">
                    <Check className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                    <span className="text-white/60 text-lg leading-snug">Risposta immediata ai candidati qualificati, migliorando il brand aziendale.</span>
                  </li>
                </ul>
              </div>
            </div>

            <div id="calcolatore" className="max-w-4xl mx-auto bg-[#050d1a] border border-white/5 rounded-[3rem] p-8 md:p-14 mb-20">
              <h3 className="text-3xl md:text-5xl font-black text-white text-center mb-16 font-montserrat leading-tight">
                Quanto puoi <span className="marker-underline">risparmiare</span> con <br /> il nostro <span className="text-blue-600">Sistema</span>?
              </h3>

              <div className="grid md:grid-cols-2 gap-12 items-end">
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-white/30 tracking-[0.2em] ml-2">Settore</label>
                  <div className="grid grid-cols-2 gap-3">
                    {sectors.map((s) => (
                      <button
                        key={s}
                        onClick={() => { setSector(s); setShowResult(false); }}
                        className={`px-7 py-[14px] rounded-full text-sm font-semibold border transition-all ${
                          sector === s 
                            ? 'bg-white text-black border-white' 
                            : 'bg-transparent border-white/10 text-white/50 hover:border-white/20'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-black text-white/30 tracking-[0.2em] ml-2">Numero Dipendenti</label>
                  <div className="flex items-center justify-between bg-[#151515] border border-white/10 rounded-2xl p-2">
                    <button 
                      onClick={() => { setEmployees(Math.max(1, employees - 1)); setShowResult(false); }}
                      className="w-12 h-12 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                    >
                      <Minus className="w-5 h-5" />
                    </button>
                    <span className="text-2xl font-black text-white font-montserrat">{employees}</span>
                    <button 
                      onClick={() => { setEmployees(employees + 1); setShowResult(false); }}
                      className="w-12 h-12 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {showResult && (
                <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="bg-blue-600/10 border border-blue-600/20 rounded-3xl p-8 flex items-center gap-6">
                    <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center shrink-0">
                      <Clock className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <div className="text-3xl font-black text-white font-montserrat">{hoursSaved}h</div>
                      <div className="text-[10px] font-bold text-blue-400 tracking-widest">Ore Risparmiate / Mese</div>
                    </div>
                  </div>
                  <div className="bg-[#1FAF8B]/10 border border-[#1FAF8B]/20 rounded-3xl p-8 flex items-center gap-6">
                    <div className="w-14 h-14 rounded-2xl bg-[#1FAF8B] flex items-center justify-center shrink-0">
                      <Euro className="w-7 h-7 text-black" />
                    </div>
                    <div>
                      <div className="text-3xl font-black text-white font-montserrat">{moneySaved.toLocaleString()}€</div>
                      <div className="text-[10px] font-bold text-[#1FAF8B] tracking-widest">Risparmio Stimato / Mese</div>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-16 flex justify-center">
                <button 
                  onClick={() => setShowResult(true)}
                  className="bg-[#3B82F6] hover:scale-105 text-white font-semibold px-7 py-[14px] rounded-full text-sm tracking-widest transition-all shadow-[0_15px_40px_rgba(59,130,246,0.3)] flex items-center gap-3"
                >
                  <TrendingUp className="w-5 h-5" />
                  Scopri il Risparmio
                </button>
              </div>
            </div>
          </div>

          <div className="mt-20 pt-10 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-8">
            <div className="text-white/30 text-sm font-medium italic">
              * Implementazione basata su stack N8N + OpenAI + WhatsApp API
            </div>
            <div className="flex gap-4 w-full sm:w-auto">
              <button 
                onClick={onClose}
                className="flex-1 sm:flex-none px-7 py-[14px] rounded-full bg-white/5 text-white font-semibold hover:bg-white/10 transition-all tracking-widest text-sm"
              >
                Chiudi
              </button>
              <button 
                className="flex-1 sm:flex-none bg-[#3B82F6] text-white font-semibold px-7 py-[14px] rounded-full text-sm tracking-widest hover:scale-105 transition-all shadow-[0_10px_30px_rgba(59,130,246,0.3)] flex items-center justify-center gap-3"
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
