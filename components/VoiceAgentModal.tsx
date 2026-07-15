
import React, { useEffect, useState, useRef } from 'react';
import { X, Check, ArrowRight, Mic, Phone, AlertCircle, Zap, Play, Pause, Volume2 } from 'lucide-react';

interface VoiceAgentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const VoiceAgentModal: React.FC<VoiceAgentModalProps> = ({ isOpen, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentLine, setCurrentLine] = useState('');
  const synthRef = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      synthRef.current = window.speechSynthesis;
    } else {
      document.body.style.overflow = 'unset';
      stopVoice();
    }
    return () => {
      document.body.style.overflow = 'unset';
      stopVoice();
    };
  }, [isOpen]);

  const stopVoice = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
    }
    setIsPlaying(false);
    setCurrentLine('');
  };

  const handleContactClick = () => {
    onClose();
    setTimeout(() => {
      const contactSection = document.getElementById('contatti');
      contactSection?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const speakDemo = () => {
    if (!synthRef.current) return;

    if (isPlaying) {
      stopVoice();
      return;
    }

    setIsPlaying(true);

    const lines = [
      "Buongiorno! Sono Sara di Marco Coperture, come posso esserle utile?",
      "Offriamo riparazione tetti, pulizia grondaie e isolamenti termici. Le interesserebbe fissare un appuntamento per un sopralluogo gratuito?"
    ];

    let current = 0;

    const speakNext = () => {
      if (current >= lines.length) {
        setIsPlaying(false);
        setCurrentLine('');
        return;
      }

      const utterance = new SpeechSynthesisUtterance(lines[current]);
      utterance.lang = 'it-IT';
      utterance.rate = 0.9;
      utterance.pitch = 1.1;

      utterance.onstart = () => {
        setCurrentLine(lines[current]);
      };

      utterance.onend = () => {
        current++;
        setTimeout(speakNext, 1000);
      };

      synthRef.current?.speak(utterance);
    };

    speakNext();
  };

  if (!isOpen) return null;

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
              VOICE AI INTEGRATION
            </div>

            <h1 className="text-[var(--title)] leading-tight mb-8 tracking-tight px-4" style={{ fontFamily: 'Outfit, sans-serif', fontSize: '96px', fontWeight: 900, letterSpacing: '-2.88px', lineHeight: '105.6px' }}>
              Agente Vocale per <br />
              <em style={{ color: 'var(--accent)', fontStyle: 'italic' }}>Artigiani</em>
            </h1>

            <div className="w-full max-w-2xl bg-[var(--bg-alt)] border border-[var(--border-soft)] rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden group" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#1A2CB0]/30 to-transparent opacity-50"></div>

              <div className="flex flex-col items-center gap-8">
                <button
                  onClick={speakDemo}
                  className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-500 shadow-2xl ${
                    isPlaying
                    ? 'bg-[var(--accent-light)] text-white animate-pulse'
                    : 'bg-[var(--accent)] text-white hover:scale-110 hover:bg-[var(--accent-light)]'
                  }`}
                >
                  {isPlaying ? <Pause className="w-10 h-10 fill-current" /> : <Play className="w-10 h-10 fill-current ml-2" />}
                </button>

                <div className="text-center">
                  <span className="block text-[10px] font-black tracking-[0.3em] text-[var(--accent)] mb-2">Demo Vocale Interattiva</span>
                  <h3 className="text-2xl font-bold text-[var(--title)] mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>Sara - Marco Coperture</h3>

                  <div className="flex justify-center items-center gap-1 h-8 mb-6">
                    {[...Array(12)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-1 bg-[var(--accent)] rounded-full transition-all duration-300 ${
                          isPlaying ? 'animate-bounce' : 'h-1 opacity-20'
                        }`}
                        style={{
                          animationDelay: `${i * 0.1}s`,
                          height: isPlaying ? `${Math.random() * 100 + 20}%` : '4px'
                        }}
                      />
                    ))}
                  </div>

                  <div className={`min-h-[60px] transition-all duration-500 ${isPlaying ? 'opacity-100' : 'opacity-40'}`}>
                    <p className="text-lg md:text-xl text-[var(--title)] font-medium leading-relaxed">
                      {currentLine || "Clicca Play per ascoltare l'Agente in azione..."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
            <div className="bg-[var(--bg-alt)] border border-[var(--border-soft)] rounded-[2rem] p-10 transition-all duration-300 hover:border-red-400/50" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
              <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center mb-8">
                <AlertCircle className="w-6 h-6 text-red-500" />
              </div>
              <h3 className="text-3xl font-black text-[var(--title)] mb-6" style={{ fontFamily: 'Outfit, sans-serif' }}>Il Problema</h3>
              <div className="text-[var(--body)] text-lg leading-relaxed space-y-4">
                <p>Un artigiano che lavora sui tetti trascorre l'80% della giornata in quota. Non può rispondere alle chiamate mentre lavora.</p>
                <ul className="space-y-4 mt-6">
                  <li className="flex gap-3 text-sm italic"><X className="w-4 h-4 text-red-500 shrink-0" /> Chiamate perse: il 60% dei clienti riattacca.</li>
                  <li className="flex gap-3 text-sm italic"><X className="w-4 h-4 text-red-500 shrink-0" /> Richieste incomplete in segreteria.</li>
                  <li className="flex gap-3 text-sm italic"><X className="w-4 h-4 text-red-500 shrink-0" /> Perdita di fatturato ogni mese.</li>
                </ul>
              </div>
            </div>

            <div className="bg-[#1A2CB0]/5 border-2 border-[var(--accent)] rounded-[2.5rem] p-10 relative overflow-hidden" style={{ boxShadow: '0 2px 12px rgba(var(--accent-rgb),0.1)' }}>
               <div className="w-12 h-12 rounded-xl bg-[#1A2CB0]/20 flex items-center justify-center mb-8">
                <Mic className="w-6 h-6 text-[var(--accent)]" />
              </div>
              <h3 className="text-3xl font-black text-[var(--accent)] mb-6 leading-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>La Soluzione <br/><span className="text-xs tracking-widest opacity-70 text-[var(--body)]">(n8n + Agente Vocale)</span></h3>
              <ul className="space-y-6">
                {[
                  { label: "Risposta 24/7", text: "L'AI risponde immediatamente con voce professionale." },
                  { label: "Qualifica Lead", text: "Chiede tipo di intervento e zona del cliente." },
                  { label: "Agenda Intelligente", text: "Prenota direttamente sopralluoghi per emergenze." },
                  { label: "Notifica Automatica", text: "Invia riepilogo scritto su WhatsApp all'artigiano." }
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

            <div className="bg-[#1A2CB0]/8 border border-[#1A2CB0]/30 rounded-[2rem] p-10 transition-all duration-300 hover:border-[var(--accent)]" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
               <div className="w-12 h-12 rounded-xl bg-[#1A2CB0]/10 flex items-center justify-center mb-8">
                <Zap className="w-6 h-6 text-[var(--accent)]" />
              </div>
              <h3 className="text-3xl font-black text-[var(--accent)] mb-6" style={{ fontFamily: 'Outfit, sans-serif' }}>Il Risultato</h3>
              <ul className="space-y-10">
                <li className="flex gap-4 items-start">
                  <Check className="w-5 h-5 text-[var(--accent)] mt-1 flex-shrink-0" />
                  <span className="text-[var(--body)] text-lg leading-snug">
                    <span className="marker-underline text-[var(--title)] font-black">Risposta al 100%</span> delle chiamate in entrata.
                  </span>
                </li>
                <li className="flex gap-4 items-start">
                  <Check className="w-5 h-5 text-[var(--accent)] mt-1 flex-shrink-0" />
                  <span className="text-[var(--body)] text-lg leading-snug">
                    <span className="text-[var(--accent)] font-black">+40% di preventivi</span> fissati automaticamente.
                  </span>
                </li>
                <li className="flex gap-4 items-start">
                  <Check className="w-5 h-5 text-[var(--accent)] mt-1 flex-shrink-0" />
                  <span className="text-[var(--body)] text-lg leading-snug">Recupero di <span className="text-[var(--accent)] font-black">2 ore di tempo</span> ogni sera.</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="max-w-4xl mx-auto mb-20">
            <h4 className="text-center text-[var(--body)] tracking-[0.3em] font-black text-xs mb-10">Analisi Impatto: Prima vs Dopo</h4>
            <div className="grid grid-cols-2 bg-[var(--bg-alt)] rounded-[2rem] overflow-hidden border border-[var(--border-soft)]">
              <div className="p-8 md:p-12 border-r border-[var(--border-soft)]">
                <span className="text-red-500 font-black text-xs tracking-widest block mb-6">Prima</span>
                <div className="space-y-6">
                  <div className="flex justify-between items-end border-b border-[var(--border-soft)] pb-4">
                    <span className="text-[var(--body)] text-sm">Chiamate perse</span>
                    <span className="text-2xl font-black text-[var(--title)]" style={{ fontFamily: 'Outfit, sans-serif' }}>60%</span>
                  </div>
                  <div className="flex justify-between items-end border-b border-[var(--border-soft)] pb-4">
                    <span className="text-[var(--body)] text-sm">Tempo richiami serali</span>
                    <span className="text-2xl font-black text-[var(--title)]" style={{ fontFamily: 'Outfit, sans-serif' }}>120 min</span>
                  </div>
                  <div className="flex justify-between items-end pb-2">
                    <span className="text-[var(--body)] text-sm">Organizzazione</span>
                    <span className="text-[var(--title)] font-bold italic">Caotica</span>
                  </div>
                </div>
              </div>
              <div className="p-8 md:p-12 bg-[#1A2CB0]/5">
                <span className="text-[var(--accent)] font-black text-xs tracking-widest block mb-6">Dopo Patrick-AI</span>
                <div className="space-y-6">
                  <div className="flex justify-between items-end border-b border-[#1A2CB0]/10 pb-4">
                    <span className="text-[var(--body)] text-sm">Risposta</span>
                    <span className="text-2xl font-black text-[var(--accent)]" style={{ fontFamily: 'Outfit, sans-serif' }}>100%</span>
                  </div>
                  <div className="flex justify-between items-end border-b border-[#1A2CB0]/10 pb-4">
                    <span className="text-[var(--body)] text-sm">Tempo risparmiato</span>
                    <span className="text-2xl font-black text-[var(--accent)]" style={{ fontFamily: 'Outfit, sans-serif' }}>Full Recovery</span>
                  </div>
                  <div className="flex justify-between items-end pb-2">
                    <span className="text-[var(--body)] text-sm">Prenotazioni</span>
                    <span className="text-[var(--title)] font-bold italic">Automatiche</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#1A2CB0]/8 border border-[var(--border-soft)] rounded-[2.5rem] p-10 text-center relative">
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[var(--accent)] text-white px-6 py-2 rounded-full text-xs font-black tracking-widest flex items-center gap-2 shadow-xl">
              <Zap className="w-4 h-4 fill-current" /> Live Update
            </div>
            <p className="text-xl md:text-2xl font-bold text-[var(--title)] leading-relaxed italic" style={{ fontFamily: 'Outfit, sans-serif' }}>
              "L'artigiano riceve un <span className="text-[#25D366]">WhatsApp</span> con il riassunto della chiamata <br className="hidden md:block" />
              mentre è ancora sul tetto."
            </p>
          </div>

          <div className="mt-20 pt-10 border-t border-[var(--border-soft)] flex flex-col sm:flex-row items-center justify-between gap-8">
            <div className="text-[var(--body)] text-sm font-medium italic">
              * Voice Engine basato su Vapi / Bland.ai + n8n automation
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
                Configura Ora
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceAgentModal;
