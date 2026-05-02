
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
        className="absolute inset-0 bg-[#050d1a]/95 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-7xl max-h-[calc(100vh-120px)] overflow-y-auto bg-[#050d1a] rounded-[2.5rem] border border-white/5 shadow-[0_0_80px_rgba(0,0,0,0.8)] animate-in fade-in zoom-in duration-300 scrollbar-hide">
        
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 p-3 rounded-full bg-white/5 text-white/50 hover:bg-white/10 hover:text-white transition-all z-[110]"
          title="Chiudi"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-8 md:p-16 lg:p-20">
          
          <div className="flex flex-col items-center text-center mb-20">
            <div className="inline-block px-4 py-1.5 rounded-full border border-blue-500/40 bg-blue-500/5 text-blue-500 text-[10px] font-black tracking-[0.2em] mb-8">
              VOICE AI INTEGRATION
            </div>
            
            <h1 className="text-white leading-tight mb-8 tracking-tight px-4" style={{ fontFamily: 'Manrope, sans-serif', fontSize: '96px', fontWeight: 500, letterSpacing: '-2.88px', lineHeight: '105.6px' }}>
              Agente Vocale per <br />
              <span className="text-white inline-block pr-6">Artigiani</span>
            </h1>

            <div className="w-full max-w-2xl bg-white/[0.02] border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-30"></div>
              
              <div className="flex flex-col items-center gap-8">
                <button 
                  onClick={speakDemo}
                  className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-500 shadow-2xl ${
                    isPlaying 
                    ? 'bg-blue-600 text-white animate-pulse' 
                    : 'bg-[#3B82F6] text-white hover:scale-110'
                  }`}
                >
                  {isPlaying ? <Pause className="w-10 h-10 fill-current" /> : <Play className="w-10 h-10 fill-current ml-2" />}
                </button>

                <div className="text-center">
                  <span className="block text-[10px] font-black tracking-[0.3em] text-[#3B82F6] mb-2">Demo Vocale Interattiva</span>
                  <h3 className="text-2xl font-bold text-white mb-4">Sara - Marco Coperture</h3>
                  
                  <div className="flex justify-center items-center gap-1 h-8 mb-6">
                    {[...Array(12)].map((_, i) => (
                      <div 
                        key={i} 
                        className={`w-1 bg-blue-500 rounded-full transition-all duration-300 ${
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
                    <p className="text-lg md:text-xl text-white font-medium leading-relaxed">
                      {currentLine || "Clicca Play per ascoltare l'Agente in azione..."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
            <div className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-10 transition-all duration-300 hover:border-red-500/30">
              <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center mb-8">
                <AlertCircle className="w-6 h-6 text-red-500" />
              </div>
              <h3 className="text-3xl font-black text-white mb-6 font-montserrat">Il Problema</h3>
              <div className="text-white/60 text-lg leading-relaxed space-y-4">
                <p>Un artigiano che lavora sui tetti trascorre l'80% della giornata in quota. Non può rispondere alle chiamate mentre lavora.</p>
                <ul className="space-y-4 mt-6">
                  <li className="flex gap-3 text-sm italic"><X className="w-4 h-4 text-red-500 shrink-0" /> Chiamate perse: il 60% dei clienti riattacca.</li>
                  <li className="flex gap-3 text-sm italic"><X className="w-4 h-4 text-red-500 shrink-0" /> Richieste incomplete in segreteria.</li>
                  <li className="flex gap-3 text-sm italic"><X className="w-4 h-4 text-red-500 shrink-0" /> Perdita di fatturato ogni mese.</li>
                </ul>
              </div>
            </div>

            <div className="bg-[#3B82F6]/5 border-2 border-[#3B82F6] rounded-[2.5rem] p-10 shadow-[0_0_40px_rgba(59,130,246,0.1)] relative overflow-hidden">
               <div className="w-12 h-12 rounded-xl bg-[#3B82F6]/20 flex items-center justify-center mb-8">
                <Mic className="w-6 h-6 text-[#3B82F6]" />
              </div>
              <h3 className="text-3xl font-black text-[#3B82F6] mb-6 font-montserrat leading-tight">La Soluzione <br/><span className="text-xs tracking-widest opacity-70 text-white">(n8n + Agente Vocale)</span></h3>
              <ul className="space-y-6">
                {[
                  { label: "Risposta 24/7", text: "L'AI risponde immediatamente con voce professionale." },
                  { label: "Qualifica Lead", text: "Chiede tipo di intervento e zona del cliente." },
                  { label: "Agenda Intelligente", text: "Prenota direttamente sopralluoghi per emergenze." },
                  { label: "Notifica Automatica", text: "Invia riepilogo scritto su WhatsApp all'artigiano." }
                ].map((item, i) => (
                  <li key={i} className="flex gap-4 items-start">
                    <Check className="w-5 h-5 text-[#3B82F6] mt-1 flex-shrink-0" />
                    <span className="text-white text-base font-medium leading-snug">
                      <strong className="text-[#3B82F6] text-[10px] tracking-widest block mb-0.5">{item.label}</strong>
                      {item.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-blue-600/10 border border-blue-600/30 rounded-[2rem] p-10 transition-all duration-300 hover:border-blue-600">
               <div className="w-12 h-12 rounded-xl bg-blue-600/10 flex items-center justify-center mb-8">
                <Zap className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-3xl font-black text-blue-600 mb-6 font-montserrat">Il Risultato</h3>
              <ul className="space-y-10">
                <li className="flex gap-4 items-start">
                  <Check className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <span className="text-white/70 text-lg leading-snug">
                    <span className="marker-underline text-white font-black">Risposta al 100%</span> delle chiamate in entrata.
                  </span>
                </li>
                <li className="flex gap-4 items-start">
                  <Check className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <span className="text-white/70 text-lg leading-snug">
                    <span className="text-blue-500 font-black">+40% di preventivi</span> fissati automaticamente.
                  </span>
                </li>
                <li className="flex gap-4 items-start">
                  <Check className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <span className="text-white/70 text-lg leading-snug">Recupero di <span className="text-blue-500 font-black">2 ore di tempo</span> ogni sera.</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="max-w-4xl mx-auto mb-20">
            <h4 className="text-center text-white/30 tracking-[0.3em] font-black text-xs mb-10">Analisi Impatto: Prima vs Dopo</h4>
            <div className="grid grid-cols-2 bg-white/[0.03] rounded-[2rem] overflow-hidden border border-white/10">
              <div className="p-8 md:p-12 border-r border-white/5">
                <span className="text-red-500 font-black text-xs tracking-widest block mb-6">Prima</span>
                <div className="space-y-6">
                  <div className="flex justify-between items-end border-b border-white/5 pb-4">
                    <span className="text-white/40 text-sm">Chiamate perse</span>
                    <span className="text-2xl font-black text-white">60%</span>
                  </div>
                  <div className="flex justify-between items-end border-b border-white/5 pb-4">
                    <span className="text-white/40 text-sm">Tempo richiami serali</span>
                    <span className="text-2xl font-black text-white">120 min</span>
                  </div>
                  <div className="flex justify-between items-end pb-2">
                    <span className="text-white/40 text-sm">Organizzazione</span>
                    <span className="text-white font-bold italic">Caotica</span>
                  </div>
                </div>
              </div>
              <div className="p-8 md:p-12 bg-blue-600/5">
                <span className="text-blue-500 font-black text-xs tracking-widest block mb-6">Dopo Patrick-AI</span>
                <div className="space-y-6">
                  <div className="flex justify-between items-end border-b border-blue-600/10 pb-4">
                    <span className="text-white/40 text-sm">Risposta</span>
                    <span className="text-2xl font-black text-blue-500">100%</span>
                  </div>
                  <div className="flex justify-between items-end border-b border-blue-600/10 pb-4">
                    <span className="text-white/40 text-sm">Tempo risparmiato</span>
                    <span className="text-2xl font-black text-blue-500">Full Recovery</span>
                  </div>
                  <div className="flex justify-between items-end pb-2">
                    <span className="text-white/40 text-sm">Prenotazioni</span>
                    <span className="text-white font-bold italic">Automatiche</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-[#00d1b2]/20 to-blue-600/20 border border-white/10 rounded-[2.5rem] p-10 text-center relative">
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[#00d1b2] text-white px-6 py-2 rounded-full text-xs font-black tracking-widest flex items-center gap-2 shadow-xl">
              <Zap className="w-4 h-4 fill-current" /> Live Update
            </div>
            <p className="text-xl md:text-2xl font-bold text-white leading-relaxed italic">
              "L'artigiano riceve un <span className="text-[#25D366]">WhatsApp</span> con il riassunto della chiamata <br className="hidden md:block" />
              mentre è ancora sul tetto."
            </p>
          </div>

          <div className="mt-20 pt-10 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-8">
            <div className="text-white/30 text-sm font-medium italic">
              * Voice Engine basato su Vapi / Bland.ai + n8n automation
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
