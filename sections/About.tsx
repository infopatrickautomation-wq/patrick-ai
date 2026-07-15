
import React from 'react';
import { Check, Clock, Target, TrendingUp } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useMouseGlowArray, glowDivStyle } from '../hooks/useMouseGlow';

const About: React.FC = () => {
  const { ref: contentRef, isVisible: contentVisible } = useScrollReveal<HTMLDivElement>();
  const { glowRefs, onMouseMove, onMouseLeave } = useMouseGlowArray(3);

  const benefits = [
    { icon: Clock, title: 'Risparmio Tempo', description: 'Automatizza task ripetitivi e recupera ore preziose ogni giorno.' },
    { icon: Target, title: 'Precisione', description: 'Elimina errori umani e garantisci risultati sempre accurati.' },
    { icon: TrendingUp, title: 'Scalabilità', description: 'Cresci senza limiti, i tuoi processi si adattano automaticamente.' },
  ];

  return (
    <section id="chi-siamo" className="py-24 bg-[var(--bg)] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div ref={contentRef} className={`transition-all duration-700 ${contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--bg-alt)] border border-[var(--border-soft)] mb-6">
              <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
              <span className="text-[var(--body)] text-sm font-medium">Chi Sono</span>
            </div>

            <h2 className="text-[var(--title)] mb-6 tracking-tight" style={{ fontFamily: 'Outfit, sans-serif', fontSize: '60px', fontWeight: 700, lineHeight: '60px' }}>
              Trasformo il tuo modo di <span className="accent-italic">lavorare con l'AI.</span>
            </h2>

            <div className="space-y-6 text-[var(--body)] text-lg leading-relaxed mb-10">
              <p>
                Mi chiamo <strong className="text-[var(--title)]">Patrick Boccia</strong> e sono uno 
                specialista in automazione e ottimizzazione dei processi aziendali. 
              </p>
              <p>
                Attraverso l'integrazione di sistemi automatici e intelligenza artificiale, 
                permetto di risparmiare tempo prezioso e concentrarsi su ciò che conta davvero: far crescere il business.
              </p>
            </div>

            <div className="space-y-4">
              {['Analisi personalizzata', 'Soluzioni su misura', 'Formazione e supporto', 'Integrazione seamless'].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#1A2CB0]/10 flex items-center justify-center">
                    <Check className="w-4 h-4 text-[var(--accent)]" />
                  </div>
                  <span className="text-[var(--body)]">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <div className="grid grid-cols-1 gap-6">
              {benefits.map((b, i) => (
                <div key={i} className="neon-card p-8 rounded-3xl bg-[var(--bg-alt)] border border-[var(--border-soft)] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden" onMouseMove={onMouseMove(i)} onMouseLeave={onMouseLeave(i)}>
                  <div ref={el => { glowRefs.current[i] = el; }} style={glowDivStyle} />
                  <div className="flex gap-6 items-start relative z-10">
                    <div className="p-4 rounded-2xl bg-[#1A2CB0]/10 text-[var(--accent)]">
                      <b.icon className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[var(--title)] mb-2">{b.title}</h3>
                      <p className="text-[var(--body)]">{b.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
