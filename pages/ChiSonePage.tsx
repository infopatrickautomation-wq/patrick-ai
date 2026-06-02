import React, { useRef } from 'react';
import { Heart, Target, Lightbulb } from 'lucide-react';
import Navbar from '../sections/Navbar';
import Footer from '../sections/Footer';
import CustomCursor from '../components/CustomCursor';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { navigate } from '../hooks/useRoute';

/* ── Reveal wrapper ── */
const Reveal: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({
  children,
  delay = 0,
  className = '',
}) => {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

/* ── Mouse glow for value cards ── */
function useCardGlows(count: number) {
  const glowRefs = useRef<(HTMLDivElement | null)[]>(Array(count).fill(null));
  const onMouseMove = (i: number) => (e: React.MouseEvent<HTMLElement>) => {
    const glow = glowRefs.current[i];
    if (!glow) return;
    const rect = e.currentTarget.getBoundingClientRect();
    glow.style.left = `${e.clientX - rect.left - 250}px`;
    glow.style.top = `${e.clientY - rect.top - 250}px`;
    glow.style.opacity = '1';
  };
  const onMouseLeave = (i: number) => () => {
    const glow = glowRefs.current[i];
    if (glow) glow.style.opacity = '0';
  };
  return { glowRefs, onMouseMove, onMouseLeave };
}

const glowDivStyle: React.CSSProperties = {
  position: 'absolute',
  width: 500,
  height: 500,
  borderRadius: '50%',
  background: 'radial-gradient(circle, rgba(42,92,63,0.08) 0%, transparent 65%)',
  opacity: 0,
  pointerEvents: 'none',
  transition: 'opacity 0.3s ease',
  zIndex: 1,
};

/* ── Value cards data ── */
const values = [
  {
    Icon: Heart,
    title: 'Fiducia Prima di Tutto',
    text: 'Non vendo tecnologia. Costruisco relazioni. Ogni cliente è un partner, non una transazione.',
  },
  {
    Icon: Target,
    title: 'Risultati Reali',
    text: 'Zero promesse vuote. Ogni progetto ha obiettivi misurabili e risultati concreti che puoi toccare con mano.',
  },
  {
    Icon: Lightbulb,
    title: 'Il Futuro è Adesso',
    text: "L'AI non è fantascienza. È uno strumento concreto che può trasformare la tua azienda già da domani mattina.",
  },
];

/* ── Stats data ── */
const stats = [
  { value: '5+', label: 'Clienti Seguiti' },
  { value: '10+', label: 'Automazioni Consegnate' },
  { value: '100h+', label: 'Risparmiate ai Clienti' },
  { value: '34', label: 'Anni di Determinazione' },
];

/* ── Page ── */
const ChiSonePage: React.FC = () => {
  const { glowRefs, onMouseMove, onMouseLeave } = useCardGlows(3);

  return (
    <div style={{ background: '#EDEAE3' }} className="min-h-screen selection:bg-[#2A5C3F]/15">
      <CustomCursor />
      <Navbar ctaLabel="Contattaci" />

      <main className="pt-36 pb-32 px-4">
        <div className="max-w-6xl mx-auto">

          {/* ── SEZIONE 1 — Hero personale ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-32">
            {/* Left */}
            <Reveal>
              <p className="text-[#2A5C3F] text-[10px] tracking-[0.35em] font-black mb-5">
                — CHI SONO —
              </p>
              <h1
                className="text-[#1C1C1C] tracking-tight leading-tight mb-4"
                style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: '80px',
                  fontWeight: 700,
                  letterSpacing: '-2.5px',
                  lineHeight: '88px',
                }}
              >
                Patrick<br />Boccia
              </h1>
              <p
                className="mb-8 accent-italic"
                style={{ fontSize: '24px', color: '#2A5C3F' }}
              >
                Fondatore di PatrickAI Automation
              </p>
              <p className="text-[#857E78] text-lg leading-relaxed max-w-lg">
                34 anni, tre figli, e una convinzione profonda: l'AI non è il futuro — è il
                presente. E chi non lo capisce oggi, resterà indietro domani.
              </p>
            </Reveal>

            {/* Right — foto placeholder */}
            <Reveal delay={150}>
              <div
                className="w-full aspect-[4/5] rounded-3xl flex items-center justify-center relative overflow-hidden"
                style={{
                  background: '#E4E0D8',
                  border: '1.5px solid #C8C3BB',
                }}
              >
                {/* glow */}
                <div className="absolute inset-0 " />
                <span className="relative z-10 text-[#857E78]/50 text-sm tracking-widest font-semibold uppercase">
                  Foto Patrick
                </span>
                {/* top line */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 1,
                    background: 'linear-gradient(90deg, transparent, #C8C3BB, transparent)',
                  }}
                />
              </div>
            </Reveal>
          </div>

          {/* ── SEZIONE 2 — La mia storia ── */}
          <div className="mb-32">
            <Reveal className="mb-12">
              <p className="text-[#2A5C3F] text-[10px] tracking-[0.35em] font-black mb-4">
                — LA MIA STORIA —
              </p>
              <h2
                className="text-[#1C1C1C] tracking-tight leading-tight"
                style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: '60px',
                  fontWeight: 700,
                  letterSpacing: '-1.5px',
                  lineHeight: '66px',
                }}
              >
                Come è nata{' '}
                <em className="accent-italic">PatrickAI</em>
              </h2>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                "Ho sempre avuto un obiettivo chiaro: costruire qualcosa di mio. Per anni ho lavorato come dipendente, rispettando orari e seguendo regole di altri. Poi ho scoperto il mondo dell'intelligenza artificiale e qualcosa è cambiato dentro di me. Ho capito che questa non era solo una tecnologia — era la mia strada.",
                "Ho iniziato a studiare, sperimentare, costruire. Il primo progetto consegnato a un cliente reale mi ha dato qualcosa di più prezioso del compenso: la fiducia. Vedere qualcuno risparmiarsi ore di stress ogni giorno grazie a un sistema che avevo costruito io — quella sensazione non ha prezzo.",
                "Oggi con PatrickAI Automation aiuto aziende, professionisti e imprenditori a eliminare il lavoro manuale ripetitivo e abbracciare gli strumenti AI che stanno ridisegnando il mondo del lavoro. La mia missione è semplice: eliminare i pregiudizi sull'AI e guidare chi vuole evolvere, prima che sia troppo tardi.",
              ].map((text, i) => (
                <Reveal key={i} delay={i * 100}>
                  <div
                    className="h-full rounded-2xl p-8"
                    style={{
                      background: '#E4E0D8',
                      border: '1px solid rgba(42,92,63,0.10)',
                    }}
                  >
                    <span
                      className="block font-black mb-4"
                      style={{ fontFamily: 'Inter, sans-serif', fontSize: '40px', color: '#2A5C3F', opacity: 0.18 }}
                    >
                      0{i + 1}
                    </span>
                    <p className="text-[#857E78] text-base leading-relaxed">{text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* ── SEZIONE 3 — I miei valori ── */}
          <div className="mb-32">
            <Reveal className="text-center mb-14">
              <p className="text-[#2A5C3F] text-[10px] tracking-[0.35em] font-black mb-4">
                — I MIEI VALORI —
              </p>
              <h2
                className="text-[#1C1C1C] tracking-tight"
                style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: '60px',
                  fontWeight: 700,
                  letterSpacing: '-1.5px',
                  lineHeight: '66px',
                }}
              >
                Cosa mi guida{' '}
                <em className="accent-italic">ogni giorno</em>
              </h2>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {values.map(({ Icon, title, text }, i) => (
                <Reveal key={i} delay={i * 100}>
                  <div
                    className="neon-card relative rounded-2xl overflow-hidden h-full"
                    style={{
                      background: '#E4E0D8',
                      border: '1.5px solid rgba(42,92,63,0.12)',
                      cursor: 'default',
                    }}
                    onMouseMove={onMouseMove(i)}
                    onMouseLeave={onMouseLeave(i)}
                  >
                    {/* mouse glow */}
                    <div ref={el => { glowRefs.current[i] = el; }} style={glowDivStyle} />
                    {/* top line */}
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, #C8C3BB, transparent)', zIndex: 2 }} />

                    <div className="relative z-10 p-8">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                        style={{ background: 'rgba(42,92,63,0.10)', border: '1px solid rgba(42,92,63,0.2)' }}
                      >
                        <Icon className="w-6 h-6" style={{ color: '#2A5C3F' }} />
                      </div>
                      <h3
                        className="text-[#1C1C1C] font-black mb-3"
                        style={{ fontFamily: 'Inter, sans-serif', fontSize: '20px', letterSpacing: '-0.3px' }}
                      >
                        {title}
                      </h3>
                      <p className="text-[#857E78] text-sm leading-relaxed">{text}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* ── SEZIONE 4 — Numeri ── */}
          <div className="mb-32">
            <div
              className="rounded-3xl p-12 grid grid-cols-2 md:grid-cols-4 gap-8"
              style={{
                background: '#E4E0D8',
                border: '1px solid rgba(42,92,63,0.10)',
              }}
            >
              {stats.map(({ value, label }, i) => (
                <Reveal key={i} delay={i * 80} className="text-center">
                  <div
                    className="font-black mb-2"
                    style={{
                      fontFamily: 'Playfair Display, serif',
                      fontSize: '52px',
                      color: '#2A5C3F',
                      letterSpacing: '-1.5px',
                    }}
                  >
                    {value}
                  </div>
                  <div className="text-[#857E78] text-sm tracking-widest font-semibold uppercase">
                    {label}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* ── SEZIONE 5 — CTA finale ── */}
          <Reveal className="flex justify-center">
            <div
              className="relative rounded-3xl overflow-hidden max-w-3xl w-full text-center p-14"
              style={{
                background: '#E4E0D8',
                border: '1.5px solid #C8C3BB',
              }}
            >
              {/* glow */}
              <div className="absolute inset-0  pointer-events-none" />
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, #C8C3BB, transparent)' }} />

              <div className="relative z-10">
                <p className="text-[#2A5C3F] text-[10px] tracking-[0.35em] font-black mb-5">
                  — LAVORIAMO INSIEME —
                </p>
                <h2
                  className="text-[#1C1C1C] font-black mb-5 tracking-tight"
                  style={{ fontFamily: 'Playfair Display, serif', fontSize: '44px', letterSpacing: '-1.2px', lineHeight: '50px' }}
                >
                  Parliamo del tuo progetto
                </h2>
                <p className="text-[#857E78] text-base leading-relaxed mb-10 max-w-md mx-auto">
                  Sono una persona diretta e concreta. Niente presentazioni lunghe — una call di
                  30 minuti per capire se posso aiutarti davvero.
                </p>
                <button
                  onClick={() => navigate('/contatti')}
                  className="inline-flex items-center gap-3 bg-[#2A5C3F] text-white font-semibold px-8 py-4 rounded-xl text-sm tracking-widest transition-all duration-300 hover:shadow-[0_4px_20px_rgba(0,0,0,0.1)] hover:scale-105 active:scale-95"
                >
                  Prenota una Call Gratuita →
                </button>
              </div>
            </div>
          </Reveal>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ChiSonePage;
