import React from 'react';
import { X, Check, Clock, Target, TrendingUp, Users, Heart, Rocket } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const values = [
    {
      icon: Heart,
      title: 'Approccio Umano',
      description: 'Non sono un esperto tecnico, sono uno che vuole aiutare. Lavoriamo insieme, passo dopo passo.'
    },
    {
      icon: Users,
      title: 'Relazione Autentica',
      description: 'Creo un percorso piacevole e sicuro con le aziende. Nessun tecnicismo inutile, solo soluzioni concrete.'
    },
    {
      icon: Rocket,
      title: 'Tecnologia Accessibile',
      description: 'Oggi tutti possono creare qualcosa grazie agli strumenti giusti. Ti mostro come.'
    },
  ];

  const results = [
    { icon: Clock, text: 'Risparmio Tempo reale e misurabile' },
    { icon: Target, text: 'Zero errori nei processi ripetitivi' },
    { icon: TrendingUp, text: 'Crescita senza limiti di risorse' },
  ];

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-[#e8e2d2]/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[var(--bg)] border border-[var(--border-soft)] rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-[#131311]/95 backdrop-blur-xl border-b border-[var(--border-soft)] p-6 flex justify-between items-center z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--bg-alt)] border border-[var(--border-soft)]">
            <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
            <span className="text-[var(--body)] text-sm font-medium">Chi Sono</span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-[var(--bg-alt)] hover:bg-[#1B212C] transition-colors"
          >
            <X className="w-6 h-6 text-[var(--body)]" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 md:p-12">
          {/* Story Section */}
          <div className="mb-12">
            <h2 className="text-[var(--title)] mb-6 tracking-tight" style={{ fontFamily: 'Outfit, sans-serif', fontSize: '60px', fontWeight: 700, lineHeight: '60px' }}>
              Da <em style={{ color: 'var(--accent)', fontStyle: 'italic' }}>appassionato</em> a <em style={{ color: 'var(--accent)', fontStyle: 'italic' }}>imprenditore digitale</em>
            </h2>
            <div className="space-y-6 text-[var(--body)] text-lg leading-relaxed">
              <p>
                Mi chiamo <strong className="text-[var(--title)]">Patrick Boccia</strong> e sono un appassionato di tecnologia che ha sempre sognato di diventare un imprenditore digitale.
              </p>
              <p>
                Oggi, grazie a strumenti come <strong className="text-[var(--title)]">n8n</strong> e <strong className="text-[var(--title)]">l'intelligenza artificiale</strong>, mi sono reso conto che <strong className="text-[var(--accent)]">tutti possiamo creare qualcosa di concreto</strong>, anche senza essere programmatori esperti.
              </p>
              <p>
                Ho fondato <strong className="text-[var(--title)]">PatrickAi Automation</strong> con una missione chiara: aiutare <strong className="text-[var(--title)]">ristoranti e hotel</strong> a risparmiare tempo prezioso attraverso automazioni intelligenti, lavorando fianco a fianco con un approccio naturale e umano.
              </p>
            </div>
          </div>

          {/* Values Grid */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-[var(--title)] mb-6 tracking-tight">Il mio approccio</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {values.map((v, i) => (
                <div key={i} className="p-6 rounded-2xl bg-[var(--bg-alt)] border border-[var(--border-soft)] hover:border-[#1A2CB0]/40 transition-all">
                  <div className="p-3 rounded-xl bg-[#1A2CB0]/10 text-[var(--accent)] w-fit mb-4">
                    <v.icon className="w-7 h-7" />
                  </div>
                  <h4 className="text-lg font-bold text-[var(--title)] mb-2">{v.title}</h4>
                  <p className="text-[var(--body)] text-sm leading-relaxed">{v.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Results */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-[var(--title)] mb-6 tracking-tight">Cosa ottieni</h3>
            <div className="space-y-4">
              {results.map((r, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-[var(--bg-alt)] border border-[var(--border-soft)]">
                  <div className="p-2 rounded-lg bg-[#1A2CB0]/10">
                    <r.icon className="w-5 h-5 text-[var(--accent)]" />
                  </div>
                  <span className="text-[var(--body)] text-lg">{r.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Vision */}
          <div className="p-8 rounded-2xl bg-[var(--bg-alt)] border border-[var(--border-soft)]">
            <h3 className="text-xl font-bold text-[var(--title)] mb-4 flex items-center gap-2">
              <Rocket className="w-6 h-6 text-[var(--accent)]" />
              La mia visione
            </h3>
            <p className="text-[var(--body)] leading-relaxed">
              Voglio costruire un'agenzia con <strong className="text-[var(--title)]">5-10 clienti fissi</strong>,
              crescere insieme a loro ed esplorare nuove esperienze nel mondo dell'automazione.
              Non mi presento come un esperto tecnico, ma come qualcuno che vuole davvero <strong className="text-[var(--accent)]">aiutare
              e integrare soluzioni</strong> che fanno la differenza nella vita quotidiana delle aziende.
            </p>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="sticky bottom-0 bg-gradient-to-t from-[var(--bg)] to-transparent p-6 border-t border-[var(--border-soft)]">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="/#contatti"
              onClick={onClose}
              className="bg-[var(--accent)] text-white font-semibold px-7 py-[14px] rounded-full text-sm tracking-widest transition-all duration-300 hover:bg-[var(--accent-light)] hover:scale-105 active:scale-95"
            >
              Prenota una Call
            </a>
            <p className="text-[var(--body)] text-sm">Costruiamo insieme il tuo percorso di automazione</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutModal;
