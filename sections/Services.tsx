
import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useMouseGlow, useMouseGlowArray, glowDivStyle } from '../hooks/useMouseGlow';

interface ServicesProps {
  onOpenCaseStudy: () => void;
  onOpenVoiceAgent: () => void;
}

const Services: React.FC<ServicesProps> = ({ onOpenCaseStudy, onOpenVoiceAgent }) => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal<HTMLDivElement>();
  const { ref: card0Ref, isVisible: card0Visible } = useScrollReveal<HTMLDivElement>();
  const { ref: card1Ref, isVisible: card1Visible } = useScrollReveal<HTMLDivElement>();
  const { ref: card2Ref, isVisible: card2Visible } = useScrollReveal<HTMLDivElement>();
  const bigGlow = useMouseGlow();
  const smallGlows = useMouseGlowArray(2);

  const services = [
    {
      title: 'Automazione',
      subtitle: 'Processi',
      description: 'Soluzioni personalizzate per automatizzare i tuoi flussi di lavoro. Dalla raccolta dati alla gestione documentale, trasformiamo le attività manuali in processi automatici efficienti.',
      features: ['Workflow automatizzati', 'Integrazione API', 'Risparmio tempo'],
      cta: 'Approfondisci',
      onClick: onOpenCaseStudy,
    },
    {
      title: 'AI',
      subtitle: 'Agent',
      description: 'Agenti intelligenti pronti all\'uso per lead generation, customer service e gestione dati. Soluzioni rapide ed efficaci per le tue esigenze immediate.',
      features: ['Lead Generation', 'Chatbot intelligenti', 'Analisi dati'],
      cta: 'Esplora Agent',
      onClick: onOpenVoiceAgent,
    },
  ];

  return (
    <section id="soluzioni" className="py-32 bg-black relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0066FF]/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={headerRef}
          className={`text-center mb-20 transition-all duration-700 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <p className="text-[#0066FF] text-xs tracking-[0.3em] font-black mb-4">— I nostri servizi —</p>
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-black text-white mb-6 font-montserrat tracking-tight">
            Scegli il tuo<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0066FF] to-[#0066FF]">Percorso</span>
          </h2>
          <p className="text-white/40 text-lg max-w-2xl mx-auto font-light">
            Automazioni sartoriali o agenti pronti all'azione.<br />
            Qualunque sia la tua sfida, abbiamo il sistema.
          </p>
        </div>

        {/* Card grande in alto */}
        <div
          ref={card0Ref}
          className={`group relative bg-[#161B22] rounded-[2.5rem] overflow-hidden border border-[rgba(0,102,255,0.15)] transition-all duration-300 p-12 md:p-16 mb-8 hover:border-[#0066FF]/60 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,102,255,0.15)] ${card0Visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
          onMouseMove={bigGlow.onMouseMove}
          onMouseLeave={bigGlow.onMouseLeave}
        >
          <div ref={bigGlow.glowRef} style={glowDivStyle} />
          <div className="absolute top-0 left-0 right-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-[#0066FF]/60 to-transparent" />
          <div className="max-w-3xl relative z-10">
            <h3 className="text-3xl lg:text-5xl font-black text-white mb-1 font-montserrat tracking-tight">
              Analisi &amp; Progettazione
            </h3>
            <span className="text-3xl lg:text-5xl font-black font-montserrat tracking-tight text-[#0066FF]">
              Strategic Partner
            </span>
            <p className="text-white/55 text-lg mt-8 mb-10 leading-relaxed font-light">
              Analizziamo i tuoi processi, identifichiamo le opportunità di automazione e progettiamo soluzioni su misura per far crescere il tuo business.
            </p>
            <div className="inline-flex items-center gap-4 font-black text-lg cursor-pointer">
              <span className="pb-1 tracking-tighter border-b-2 text-[#0066FF] border-[#0066FF]/40">
                Scopri di più
              </span>
              <div className="w-10 h-10 rounded-full border border-[#0066FF]/30 bg-[#0066FF]/10 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                <ArrowUpRight className="w-5 h-5 text-[#0066FF]" />
              </div>
            </div>
          </div>
        </div>

        {/* Due card piccole sotto */}
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => {
            const cardRef = index === 0 ? card1Ref : card2Ref;
            const cardVisible = index === 0 ? card1Visible : card2Visible;

            return (
              <div
                key={index}
                ref={cardRef}
                className={`group relative bg-[#161B22] rounded-[2.5rem] overflow-hidden border border-[rgba(0,102,255,0.15)] transition-all duration-300 p-12 cursor-pointer hover:border-[#0066FF]/60 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,102,255,0.15)] ${
                  cardVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
                onClick={service.onClick}
                onMouseMove={smallGlows.onMouseMove(index)}
                onMouseLeave={smallGlows.onMouseLeave(index)}
              >
                <div ref={el => { smallGlows.glowRefs.current[index] = el; }} style={glowDivStyle} />
                <div className="absolute top-0 left-0 right-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-[#0066FF]/60 to-transparent" />
                <div className="mb-12 relative z-10">
                  <h3 className="text-3xl lg:text-5xl font-black text-white mb-1 font-montserrat tracking-tight">
                    {service.title}
                  </h3>
                  <span className="text-3xl lg:text-5xl font-black font-montserrat tracking-tight text-[#0066FF]">
                    {service.subtitle}
                  </span>
                </div>

                <p className="text-white/55 text-lg mb-10 leading-relaxed font-light">
                  {service.description}
                </p>

                <div className="flex flex-wrap gap-3 mb-14">
                  {service.features.map((feature, fIndex) => (
                    <span
                      key={fIndex}
                      className="px-4 py-2 rounded-full bg-white/5 text-white/50 text-xs tracking-widest font-bold border border-white/8"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                <div className="inline-flex items-center gap-4 font-black text-lg">
                  <span className="pb-1 tracking-tighter border-b-2 text-[#0066FF] border-[#0066FF]/40">
                    {service.cta}
                  </span>
                  <div className="w-10 h-10 rounded-full border border-[#0066FF]/30 bg-[#0066FF]/10 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                    <ArrowUpRight className="w-5 h-5 text-[#0066FF]" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
