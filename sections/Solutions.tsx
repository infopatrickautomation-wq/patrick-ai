
import React from 'react';
import { Mail, MessageSquare, FileSpreadsheet, Search, Share2, BarChart3 } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const solutions = [
  { icon: Mail, title: 'Email Automation', desc: 'Automatizza l\'invio di email personalizzate e follow-up intelligenti.' },
  { icon: MessageSquare, title: 'Chatbot AI', desc: 'Agenti conversazionali che qualificano lead e assistono i clienti 24/7.' },
  { icon: FileSpreadsheet, title: 'Gestione Dati', desc: 'Automazione compilazione, verifica e archiviazione documenti.' },
  { icon: Search, title: 'Web Scraping', desc: 'Estrazione automatica di dati da qualsiasi piattaforma online.' },
  { icon: Share2, title: 'Social Media', desc: 'Pubblicazione programmata e gestione automatica dell\'engagement.' },
  { icon: BarChart3, title: 'Reportistica', desc: 'Dashboard e KPI generati automaticamente in tempo reale.' },
];

const Solutions: React.FC = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <section className="py-32 bg-[#EDEAE3] relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C8C3BB]/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4">
        <div
          ref={headerRef}
          className={`text-center mb-16 transition-all duration-700 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <p className="text-[#2A5C3F] text-xs tracking-[0.3em] font-black mb-4">— Suite completa —</p>
          <h2 className="text-[#1C1C1C] mb-4 tracking-tight" style={{ fontFamily: 'Playfair Display, serif', fontSize: '60px', fontWeight: 700, lineHeight: '60px' }}>
            Soluzioni<br />
            <span className="accent-italic">Complete.</span>
          </h2>
          <p className="text-[#857E78] text-lg max-w-2xl mx-auto font-light">Una suite di strumenti pronti a scalare il tuo business.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutions.map((s, i) => (
            <div
              key={i}
              className="neon-card group p-10 rounded-[2rem] bg-[#E4E0D8] border border-[#C8C3BB] transition-all duration-500 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C8C3BB] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="w-14 h-14 rounded-2xl bg-[#2A5C3F]/10 border border-[#2A5C3F]/20 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-[#2A5C3F]/20 transition-all duration-300">
                <s.icon className="w-7 h-7 text-[#2A5C3F]" />
              </div>
              <h3 className="text-xl font-black text-[#1C1C1C] mb-3 tracking-tight">{s.title}</h3>
              <p className="text-[#857E78] leading-relaxed font-light">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Solutions;
