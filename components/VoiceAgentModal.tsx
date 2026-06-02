
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
        style={{ background: 'rgba(237,234,227,0.95)' }}
        onClick={onClose}
      />

      <div className="relative w-full max-w-7xl max-h-[calc(100vh-120px)] overflow-y-auto rounded-[2.5rem] border border-[#C8C3BB] animate-in fade-in zoom-in duration-300 scrollbar-hide" style={{ background: '#EDEAE3', boxShadow: '0 0 80px rgba(0,0,0,0.15)' }}>

        <button
          onClick={onClose}
          className="absolute top-8 right-8 p-3 rounded-full text-[#857E78] hover:bg-[#C8C3BB]/40 hover:text-[#1C1C1C] transition-all z-[110]"
          style={{ background: 'rgba(200,195,187,0.2)' }}
          title="Chiudi"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-8 md:p-16 lg:p-20">

          <div className="flex flex-col items-center text-center mb-20">
            <div className="inline-block px-4 py-1.5 rounded-full border border-[#2A5C3F]/40 bg-[#2A5C3F]/8 text-[#2A5C3F] text-[10px] font-black tracking-[0.2em] mb-8">
              VOICE AI INTEGRATION
            </div>

            <h1 className="text-[#1C1C1C] leading-tight mb-8 tracking-tight px-4" style={{ fontFamily: 'Playfair Display, serif', fontSize: '96px', fontWeight: 900, letterSpacing: '-2.88px', lineHeight: '105.6px' }}>
              Agente Vocale per <br />
              <em style={{ color: '#2A5C3F', fontStyle: 'italic' }}>Artigiani</em>
            </h1>

            <div className="w-full max-w-2xl bg-[#E4E0D8] border border-[#C8C3BB] rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden group" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#2A5C3F]/30 to-transparent opacity-50"></div>

              <div className="flex flex-col items-center gap-8">
                <button
                  onClick={speakDemo}
                  className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-500 shadow-2xl ${
                    isPlaying
                    ? 'bg-[#3D7055] text-white animate-pulse'
                    : 'bg-[#2A5C3F] text-white hover:scale-110 hover:bg-[#3D7055]'
                  }`}
                >
                  {isPlaying ? <Pause className="w-10 h-10 fill-current" /> : <Play className="w-10 h-10 fill-current ml-2" />}
                </button>

                <div className="text-center">
                  <span className="block text-[10px] font-black tracking-[0.3em] text-[#2A5C3F] mb-2">Demo Vocale Interattiva</span>
                  <h3 className="text-2xl font-bold text-[#1C1C1C] mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>Sara - Marco Coperture</h3>

                  <div className="flex justify-center items-center gap-1 h-8 mb-6">
                    {[...Array(12)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-1 bg-[#2A5C3F] rounded-full transition-all duration-300 ${
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
                    <p className="text-lg md:text-xl text-[#1C1C1C] font-medium leading-relaxed">
                      {currentLine || "Clicca Play per ascoltare l'Agente in azione..."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
            <div className="bg-[#E4E0D8] border border-[#C8C3BB] rounded-[2rem] p-10 transition-all duration-300 hover:border-red-400/50" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
              <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center mb-8">
                <AlertCircle className="w-6 h-6 text-red-500" />
              </div>
              <h3 className="text-3xl font-black text-[#1C1C1C] mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>Il Problema</h3>
              <div className="text-[#857E78] text-lg leading-relaxed space-y-4">
                <p>Un artigiano che lavora sui tetti trascorre l'80% della giornata in quota. Non può rispondere alle chiamate mentre lavora.</p>
                <ul className="space-y-4 mt-6">
                  <li className="flex gap-3 text-sm italic"><X className="w-4 h-4 text-red-500 shrink-0" /> Chiamate perse: il 60% dei clienti riattacca.</li>
                  <li className="flex gap-3 text-sm italic"><X className="w-4 h-4 text-red-500 shrink-0" /> Richieste incomplete in segreteria.</li>
                  <li className="flex gap-3 text-sm italic"><X className="w-4 h-4 text-red-500 shrink-0" /> Perdita di fatturato ogni mese.</li>
                </ul>
              </div>
            </div>

            <div className="bg-[#2A5C3F]/5 border-2 border-[#2A5C3F] rounded-[2.5rem] p-10 relative overflow-hidden" style={{ boxShadow: '0 2px 12px rgba(42,92,63,0.1)' }}>
               <div className="w-12 h-12 rounded-xl bg-[#2A5C3F]/20 flex items-center justify-center mb-8">
                <Mic className="w-6 h-6 text-[#2A5C3F]" />
              </div>
              <h3 className="text-3xl font-black text-[#2A5C3F] mb-6 leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>La Soluzione <br/><span className="text-xs tracking-widest opacity-70 text-[#857E78]">(n8n + Agente Vocale)</span></h3>
              <ul className="space-y-6">
                {[
                  { label: "Risposta 24/7", text: "L'AI risponde immediatamente con voce professionale." },
                  { label: "Qualifica Lead", text: "Chiede tipo di intervento e zona del cliente." },
                  { label: "Agenda Intelligente", text: "Prenota direttamente sopralluoghi per emergenze." },
                  { label: "Notifica Automatica", text: "Invia riepilogo scritto su WhatsApp all'artigiano." }
                ].map((item, i) => (
                  <li key={i} className="flex gap-4 items-start">
                    <Check className="w-5 h-5 text-[#2A5C3F] mt-1 flex-shrink-0" />
                    <span className="text-[#1C1C1C] text-base font-medium leading-snug">
                      <strong className="text-[#2A5C3F] text-[10px] tracking-widest block mb-0.5">{item.label}</strong>
                      {item.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[#2A5C3F]/8 border border-[#2A5C3F]/30 rounded-[2rem] p-10 transition-all duration-300 hover:border-[#2A5C3F]" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
               <div className="w-12 h-12 rounded-xl bg-[#2A5C3F]/10 flex items-center justify-center mb-8">
                <Zap className="w-6 h-6 text-[#2A5C3F]" />
              </div>
              <h3 className="text-3xl font-black text-[#2A5C3F] mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>Il Risultato</h3>
              <ul className="space-y-10">
                <li className="flex gap-4 items-start">
                  <Check className="w-5 h-5 text-[#2A5C3F] mt-1 flex-shrink-0" />
                  <span className="text-[#857E78] text-lg leading-snug">
                    <span className="marker-underline text-[#1C1C1C] font-black">Risposta al 100%</span> delle chiamate in entrata.
                  </span>
                </li>
                <li className="flex gap-4 items-start">
                  <Check className="w-5 h-5 text-[#2A5C3F] mt-1 flex-shrink-0" />
                  <span className="text-[#857E78] text-lg leading-snug">
                    <span className="text-[#2A5C3F] font-black">+40% di preventivi</span> fissati automaticamente.
                  </span>
                </li>
                <li className="flex gap-4 items-start">
                  <Check className="w-5 h-5 text-[#2A5C3F] mt-1 flex-shrink-0" />
                  <span className="text-[#857E78] text-lg leading-snug">Recupero di <span className="text-[#2A5C3F] font-black">2 ore di tempo</span> ogni sera.</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="max-w-4xl mx-auto mb-20">
            <h4 className="text-center text-[#857E78] tracking-[0.3em] font-black text-xs mb-10">Analisi Impatto: Prima vs Dopo</h4>
            <div className="grid grid-cols-2 bg-[#E4E0D8] rounded-[2rem] overflow-hidden border border-[#C8C3BB]">
              <div className="p-8 md:p-12 border-r border-[#C8C3BB]">
                <span className="text-red-500 font-black text-xs tracking-widest block mb-6">Prima</span>
                <div className="space-y-6">
                  <div className="flex justify-between items-end border-b border-[#C8C3BB] pb-4">
                    <span className="text-[#857E78] text-sm">Chiamate perse</span>
                    <span className="text-2xl font-black text-[#1C1C1C]" style={{ fontFamily: 'Playfair Display, serif' }}>60%</span>
                  </div>
                  <div className="flex justify-between items-end border-b border-[#C8C3BB] pb-4">
                    <span className="text-[#857E78] text-sm">Tempo richiami serali</span>
                    <span className="text-2xl font-black text-[#1C1C1C]" style={{ fontFamily: 'Playfair Display, serif' }}>120 min</span>
                  </div>
                  <div className="flex justify-between items-end pb-2">
                    <span className="text-[#857E78] text-sm">Organizzazione</span>
                    <span className="text-[#1C1C1C] font-bold italic">Caotica</span>
                  </div>
                </div>
              </div>
              <div className="p-8 md:p-12 bg-[#2A5C3F]/5">
                <span className="text-[#2A5C3F] font-black text-xs tracking-widest block mb-6">Dopo Patrick-AI</span>
                <div className="space-y-6">
                  <div className="flex justify-between items-end border-b border-[#2A5C3F]/10 pb-4">
                    <span className="text-[#857E78] text-sm">Risposta</span>
                    <span className="text-2xl font-black text-[#2A5C3F]" style={{ fontFamily: 'Playfair Display, serif' }}>100%</span>
                  </div>
                  <div className="flex justify-between items-end border-b border-[#2A5C3F]/10 pb-4">
                    <span className="text-[#857E78] text-sm">Tempo risparmiato</span>
                    <span className="text-2xl font-black text-[#2A5C3F]" style={{ fontFamily: 'Playfair Display, serif' }}>Full Recovery</span>
                  </div>
                  <div className="flex justify-between items-end pb-2">
                    <span className="text-[#857E78] text-sm">Prenotazioni</span>
                    <span className="text-[#1C1C1C] font-bold italic">Automatiche</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#2A5C3F]/8 border border-[#C8C3BB] rounded-[2.5rem] p-10 text-center relative">
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[#2A5C3F] text-white px-6 py-2 rounded-full text-xs font-black tracking-widest flex items-center gap-2 shadow-xl">
              <Zap className="w-4 h-4 fill-current" /> Live Update
            </div>
            <p className="text-xl md:text-2xl font-bold text-[#1C1C1C] leading-relaxed italic" style={{ fontFamily: 'Playfair Display, serif' }}>
              "L'artigiano riceve un <span className="text-[#25D366]">WhatsApp</span> con il riassunto della chiamata <br className="hidden md:block" />
              mentre è ancora sul tetto."
            </p>
          </div>

          <div className="mt-20 pt-10 border-t border-[#C8C3BB] flex flex-col sm:flex-row items-center justify-between gap-8">
            <div className="text-[#857E78] text-sm font-medium italic">
              * Voice Engine basato su Vapi / Bland.ai + n8n automation
            </div>
            <div className="flex gap-4 w-full sm:w-auto">
              <button
                onClick={onClose}
                className="flex-1 sm:flex-none px-7 py-[14px] rounded-full bg-[#C8C3BB]/30 text-[#1C1C1C] font-semibold hover:bg-[#C8C3BB]/60 transition-all tracking-widest text-sm"
              >
                Chiudi
              </button>
              <button
                className="flex-1 sm:flex-none bg-[#2A5C3F] text-white font-semibold px-7 py-[14px] rounded-full text-sm tracking-widest hover:scale-105 hover:bg-[#3D7055] transition-all flex items-center justify-center gap-3"
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
