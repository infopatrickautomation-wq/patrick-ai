import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Check, Zap, Search, Settings, TrendingUp } from 'lucide-react';
import Navbar from '../sections/Navbar';
import Footer from '../sections/Footer';
import CustomCursor from '../components/CustomCursor';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useMouseGlow, useMouseGlowArray, glowDivStyle } from '../hooks/useMouseGlow';
import { navigate } from '../hooks/useRoute';


/* ── Reveal wrapper ── */
const Reveal: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({ children, delay = 0, className = '' }) => {
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

/* ── Time Calculator ── */
const sectors = [
  { label: 'Ristoranti / Hotel',     rate: 0.70 },
  { label: 'Professionisti / Studi', rate: 0.65 },
  { label: 'Artigiani / Imprese',    rate: 0.60 },
  { label: 'Altro',                  rate: 0.55 },
];

const TimeCalculator: React.FC = () => {
  const [sector, setSector] = useState(0);
  const [hours, setHours] = useState(20);
  const [display, setDisplay] = useState(Math.round(20 * 0.70));
  const displayRef = useRef(Math.round(20 * 0.70));
  const animRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const savedWeekly = Math.round(hours * sectors[sector].rate);
  const savedMonthly = savedWeekly * 4;
  const savedDays = Math.round(savedMonthly / 8);

  useEffect(() => {
    if (animRef.current) clearInterval(animRef.current);
    const target = savedWeekly;
    animRef.current = setInterval(() => {
      const diff = target - displayRef.current;
      if (diff === 0) { clearInterval(animRef.current!); return; }
      const step = diff > 0 ? Math.max(1, Math.ceil(diff / 8)) : Math.min(-1, Math.floor(diff / 8));
      displayRef.current += step;
      setDisplay(displayRef.current);
    }, 30);
    return () => { if (animRef.current) clearInterval(animRef.current); };
  }, [savedWeekly]);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const glow = glowRef.current;
    if (!glow) return;
    const rect = e.currentTarget.getBoundingClientRect();
    glow.style.left = `${e.clientX - rect.left - 250}px`;
    glow.style.top  = `${e.clientY - rect.top  - 250}px`;
    glow.style.opacity = '1';
  };
  const onMouseLeave = () => { if (glowRef.current) glowRef.current.style.opacity = '0'; };

  return (
    <Reveal>
      <div
        className="neon-card relative rounded-[2rem] overflow-hidden border border-[#C8C3BB] p-8 md:p-12"
        style={{ background: '#E4E0D8' }}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
      >
        <div ref={glowRef} style={glowDivStyle} />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C8C3BB] to-transparent" />

        {/* Title */}
        <div className="text-center mb-12 relative z-10">
          <p className="text-[#857E78] text-[10px] tracking-[0.3em] font-black mb-5">— CALCOLATORE —</p>
          <h2 className="text-[#1C1C1C] tracking-tight" style={{ fontFamily: 'Playfair Display, serif', fontSize: '60px', fontWeight: 700, lineHeight: '60px' }}>
            Quanto tempo puoi<br />
            <span className="accent-italic">risparmiare con Flux?</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-10 relative z-10">
          {/* Left — inputs */}
          <div>
            <p className="text-[#857E78] text-[10px] tracking-[0.25em] font-black mb-4">STEP 1 — SETTORE</p>
            <div className="flex flex-wrap gap-3 mb-10">
              {sectors.map((s, i) => (
                <button
                  key={i}
                  onClick={() => setSector(i)}
                  className="px-5 py-2.5 rounded-full text-sm font-semibold tracking-wide transition-all duration-200"
                  style={
                    sector === i
                      ? { background: '#2A5C3F', color: '#fff', border: '1px solid #2A5C3F' }
                      : { background: 'transparent', color: 'rgba(255,255,255,0.4)', border: '1px solid rgba(255,255,255,0.12)' }
                  }
                >
                  {s.label}
                </button>
              ))}
            </div>

            <p className="text-[#857E78] text-[10px] tracking-[0.25em] font-black mb-5">STEP 2 — ORE MANUALI A SETTIMANA</p>
            <div className="flex items-center gap-5 mb-4">
              <button
                onClick={() => setHours(h => Math.max(5, h - 1))}
                className="w-11 h-11 rounded-full border border-white/12 text-[#857E78] hover:border-[#2A5C3F]/50 hover:text-white transition-all duration-200 text-xl font-bold flex items-center justify-center flex-shrink-0"
              >−</button>
              <div className="flex-1 text-center">
                <span className="text-[#1C1C1C] font-black" style={{ fontFamily: 'Playfair Display, serif', fontSize: '52px', lineHeight: 1 }}>{hours}</span>
                <span className="text-[#857E78] text-sm ml-2">ore / sett.</span>
              </div>
              <button
                onClick={() => setHours(h => Math.min(60, h + 1))}
                className="w-11 h-11 rounded-full border border-white/12 text-[#857E78] hover:border-[#2A5C3F]/50 hover:text-white transition-all duration-200 text-xl font-bold flex items-center justify-center flex-shrink-0"
              >+</button>
            </div>
            <input
              type="range" min={5} max={60} value={hours}
              onChange={e => setHours(Number(e.target.value))}
              className="w-full"
              style={{ accentColor: '#2A5C3F' }}
            />
            <div className="flex justify-between text-[#857E78]/70 text-xs mt-1.5">
              <span>5 ore</span><span>60 ore</span>
            </div>
          </div>

          {/* Right — result */}
          <div className="flex flex-col justify-center">
            <div
              className="rounded-2xl border border-[#C8C3BB] p-8"
              style={{ background: 'rgba(0,102,255,0.04)' }}
            >
              <p className="text-[#857E78] text-[10px] tracking-[0.25em] font-black mb-6">RISULTATO STIMATO</p>

              <div className="mb-6">
                <span
                  className="font-black leading-none"
                  style={{ fontFamily: 'Playfair Display, serif', fontSize: '64px', color: '#2A5C3F' }}
                >
                  {display}
                </span>
                <span className="text-[#857E78] text-base ml-2">ore risparmiate / settimana</span>
              </div>

              <div className="space-y-3 mb-8">
                <div className="h-px bg-[#C8C3BB]/60" />
                <div className="flex justify-between items-center py-1">
                  <span className="text-[#857E78] text-sm">Al mese</span>
                  <span className="text-[#1C1C1C] font-black text-2xl">{savedMonthly} ore</span>
                </div>
                <div className="h-px bg-[#C8C3BB]/60" />
                <div className="flex justify-between items-center py-1">
                  <span className="text-[#857E78] text-sm">Giorni lavorativi recuperati</span>
                  <span className="text-[#1C1C1C] font-black text-2xl">{savedDays} giorni</span>
                </div>
              </div>

              <button
                onClick={() => navigate('/contatti')}
                className="w-full bg-[#2A5C3F] text-white font-semibold px-7 py-[14px] rounded-xl text-sm tracking-widest flex items-center justify-center gap-3 transition-all duration-300 hover:shadow-[0_4px_20px_rgba(0,0,0,0.12)] hover:scale-[1.01] active:scale-[0.99]"
              >
                Inizia a risparmiare tempo
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
};

/* ── Timeline Section ── */
const timelineSteps = [
  {
    Icon: Search,
    label: 'Giorno 1: Analisi',
    desc: 'Analizziamo i tuoi processi e configuriamo Flux su misura per il tuo settore. Mappiamo ogni attività ripetitiva.',
  },
  {
    Icon: Settings,
    label: 'Giorno 2: Setup',
    desc: 'Integriamo Flux con i tuoi strumenti esistenti. Operativo in meno di 48 ore, senza toccare i tuoi flussi attuali.',
  },
  {
    Icon: Zap,
    label: 'Giorno 3: Lancio',
    desc: 'Flux va live. Zero formazione necessaria per il tuo team. Se sanno usare uno smartphone, sanno usare Flux.',
  },
  {
    Icon: TrendingUp,
    label: 'Mese 1+: Crescita',
    desc: 'Monitoriamo i risultati e ottimizziamo continuamente. Vedi le ore risparmiate, i report puntuali, il ROI reale.',
  },
];

const TimelineSection: React.FC = () => {
  const stepRefs    = useRef<(HTMLDivElement | null)[]>([null, null, null, null]);
  const circleRefs  = useRef<(HTMLDivElement | null)[]>([null, null, null, null]);
  const iconWrpRefs = useRef<(HTMLDivElement | null)[]>([null, null, null, null]);
  const textRefs    = useRef<(HTMLDivElement | null)[]>([null, null, null, null]);
  const lineRefs    = useRef<(HTMLDivElement | null)[]>([null, null, null]);

  useEffect(() => {
    const TRIGGER = 0.58; // fraction of viewport height that acts as activation line

    const update = () => {
      const triggerY = window.innerHeight * TRIGGER;

      stepRefs.current.forEach((el, i) => {
        if (!el) return;
        const rect  = el.getBoundingClientRect();
        const stepY = rect.top + rect.height * 0.25;
        const on    = stepY < triggerY;

        /* ── circle glow ── */
        const circ = circleRefs.current[i];
        if (circ) {
          circ.style.borderColor = on ? '#2A5C3F'               : 'rgba(200,195,187,0.3)';
          circ.style.background  = on ? 'rgba(42,92,63,0.15)'   : 'rgba(200,195,187,0.1)';
          circ.style.boxShadow   = on ? '0 0 16px rgba(42,92,63,0.3)' : 'none';
        }

        /* ── icon colour ── */
        const wrap = iconWrpRefs.current[i];
        if (wrap) wrap.style.color = on ? '#2A5C3F' : 'rgba(28,28,28,0.2)';

        /* ── text fade + slide ── */
        const txt = textRefs.current[i];
        if (txt) {
          txt.style.opacity   = on ? '1'             : '0.12';
          txt.style.transform = on ? 'translateY(0)' : 'translateY(12px)';
        }

        /* ── connector fill (between i → i+1) ── */
        if (i < 3) {
          const nextEl = stepRefs.current[i + 1];
          const line   = lineRefs.current[i];
          if (nextEl && line) {
            const nextRect = nextEl.getBoundingClientRect();
            const nextY    = nextRect.top + nextRect.height * 0.25;
            const nextOn   = nextY < triggerY;

            let fill = 0;
            if (!on)     fill = 0;
            else if (nextOn) fill = 1;
            else fill = Math.min(1, Math.max(0, (triggerY - stepY) / (nextY - stepY)));

            line.style.height    = `${fill * 100}%`;
            line.style.opacity   = fill > 0.01 ? '1' : '0';
            line.style.boxShadow = fill > 0.05 ? '0 0 10px rgba(42,92,63,0.3)' : 'none';
          }
        }
      });
    };

    window.addEventListener('scroll', update, { passive: true });
    const t = setTimeout(update, 120);
    return () => { window.removeEventListener('scroll', update); clearTimeout(t); };
  }, []);

  return (
    <section className="pt-16 pb-28 relative" style={{ background: '#EDEAE3' }}>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-14 items-start">

          {/* ── Left: sticky copy + CEO card ── */}
          <div className="md:sticky md:top-12 -ml-1">
            <p className="text-[#857E78] text-[10px] tracking-[0.3em] font-black mb-5">— COME FUNZIONA —</p>
            <h2
              className="text-[#1C1C1C] tracking-tight leading-tight mb-3"
              style={{ fontFamily: 'Playfair Display, serif', fontSize: '60px', fontWeight: 700, letterSpacing: '-1.8px', lineHeight: '66px' }}
            >
              Attivo in 72h.<br />Tuo per sempre.
            </h2>
            <p className="accent-italic mb-8" style={{ fontSize: '60px', lineHeight: '66px' }}>
              Supporto Incluso.
            </p>
            <button
              onClick={() => navigate('/contatti')}
              className="group flex items-center gap-2 bg-[#2A5C3F] text-white font-semibold px-7 py-[14px] rounded-xl text-sm tracking-widest transition-all duration-300 hover:shadow-[0_4px_20px_rgba(0,0,0,0.12)] hover:scale-105 active:scale-95 mb-10"
            >
              Prenota una Call
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>

            {/* CEO results card */}
            <div
              className="neon-card relative rounded-[1.75rem] overflow-hidden border border-[#C8C3BB]"
              style={{ background: '#E4E0D8' }}
            >
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C8C3BB] to-transparent" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(42,92,63,0.05)_0%,transparent_60%)]" />
              <div className="p-8 relative z-10">
                <p className="text-[#857E78] text-[9px] tracking-[0.3em] font-black mb-7">— RISULTATI MEDI DEI NOSTRI CLIENTI —</p>
                <div className="space-y-6">
                  <div className="flex items-start gap-5">
                    <div
                      className="flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center"
                      style={{ background: 'rgba(42,92,63,0.06)', border: '1px solid rgba(59,130,246,0.2)' }}
                    >
                      <TrendingUp className="w-6 h-6 text-[#2A5C3F]" />
                    </div>
                    <div>
                      <div className="text-[#1C1C1C] font-black leading-none mb-1" style={{ fontFamily: 'Playfair Display, serif', fontSize: '36px' }}>
                        −80<span className="text-[#2A5C3F]">%</span>
                      </div>
                      <p className="text-[#857E78] text-sm leading-snug">
                        di tempo perso su attività manuali.<br />
                        <span className="text-[#1C1C1C]/70">Il tuo team torna a fare business.</span>
                      </p>
                    </div>
                  </div>
                  <div className="h-px bg-[#C8C3BB]/50" />
                  <div className="flex items-start gap-5">
                    <div
                      className="flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center"
                      style={{ background: 'rgba(42,92,63,0.06)', border: '1px solid rgba(59,130,246,0.2)' }}
                    >
                      <Zap className="w-6 h-6 text-[#2A5C3F]" />
                    </div>
                    <div>
                      <div className="text-[#1C1C1C] font-black leading-none mb-1" style={{ fontFamily: 'Playfair Display, serif', fontSize: '36px' }}>
                        ROI <span className="text-[#2A5C3F]">+</span>
                      </div>
                      <p className="text-[#857E78] text-sm leading-snug">
                        misurabile già dal primo mese.<br />
                        <span className="text-[#1C1C1C]/70">Costi fissi, risultati che scalano.</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right: timeline ── */}
          <div className="pt-2">
            {timelineSteps.map((step, i) => (
              <React.Fragment key={i}>

                {/* Step row */}
                <div ref={el => { stepRefs.current[i] = el; }} className="flex gap-7 items-start">

                  {/* Icon circle */}
                  <div
                    ref={el => { circleRefs.current[i] = el; }}
                    className="flex-shrink-0 w-16 h-16 rounded-full border-2 flex items-center justify-center"
                    style={{
                      borderColor: 'rgba(255,255,255,0.08)',
                      background: 'rgba(255,255,255,0.02)',
                      transition: 'border-color 0.45s ease, background 0.45s ease, box-shadow 0.45s ease',
                    }}
                  >
                    <div
                      ref={el => { iconWrpRefs.current[i] = el; }}
                      style={{ color: 'rgba(255,255,255,0.18)', transition: 'color 0.45s ease' }}
                    >
                      <step.Icon size={26} />
                    </div>
                  </div>

                  {/* Text */}
                  <div
                    ref={el => { textRefs.current[i] = el; }}
                    className="pt-3"
                    style={{
                      opacity: 0.12,
                      transform: 'translateY(12px)',
                      transition: 'opacity 0.55s ease, transform 0.55s ease',
                    }}
                  >
                    <h3 className="text-[#1C1C1C] font-black mb-2 leading-snug" style={{ fontSize: '24px' }}>
                      {step.label}
                    </h3>
                    <p className="text-[#857E78] leading-relaxed" style={{ fontSize: '15px' }}>
                      {step.desc}
                    </p>
                  </div>
                </div>

                {/* Connector */}
                {i < 3 && (
                  <div className="ml-[31px] relative" style={{ height: '96px' }}>
                    {/* track */}
                    <div className="absolute left-0 top-0 bottom-0 w-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
                    {/* fill */}
                    <div
                      ref={el => { lineRefs.current[i] = el; }}
                      className="absolute left-0 top-0 w-[2px]"
                      style={{
                        height: '0%',
                        background: 'linear-gradient(to bottom, #2A5C3F, rgba(42,92,63,0.35))',
                        transition: 'height 0.08s linear, opacity 0.2s ease',
                        borderRadius: '2px',
                      }}
                    />
                  </div>
                )}

              </React.Fragment>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

/* ── FAQ ── */
const faqs = [
  {
    q: 'Quanto tempo ci vuole per configurare Flux?',
    a: 'Il setup tipico richiede 2-3 giorni lavorativi. Analizziamo i tuoi processi il giorno 1, configuriamo le integrazioni il giorno 2 e andiamo live il giorno 3. Processi semplici possono essere attivati in 24 ore.',
  },
  {
    q: 'Ho bisogno di competenze tecniche per usare Flux?',
    a: 'Zero. Flux è progettato per essere completamente trasparente: una volta configurato lavora in autonomia. Il tuo team riceve solo i risultati — non gestisce la tecnologia.',
  },
  {
    q: 'Posso integrare Flux con i software che uso già?',
    a: 'Sì. Flux si integra con oltre 300 applicazioni: Gmail, Google Sheets, Notion, CRM, gestionali, e-commerce e molto altro. Se usi uno strumento non ancora supportato, valutiamo insieme un\'integrazione custom.',
  },
  {
    q: 'Cosa succede se ho un problema tecnico?',
    a: 'Il piano Starter include supporto via email (risposta entro 24h). Il piano Business include supporto prioritario dedicato (risposta entro 4h). L\'Enterprise include account manager dedicato e SLA garantito.',
  },
  {
    q: 'Come funziona il costo del setup iniziale?',
    a: 'Il setup è una fee una tantum che varia in base alla complessità delle integrazioni richieste. Dopo una call conoscitiva gratuita, ti forniamo un preventivo dettagliato e trasparente. Nessuna sorpresa.',
  },
  {
    q: 'Posso cambiare piano o disdire quando voglio?',
    a: 'Assolutamente sì. Il canone mensile è senza vincoli: puoi fare upgrade, downgrade o disdire in qualsiasi momento con 30 giorni di preavviso. Nessuna penale, nessun costo nascosto.',
  },
];

const FAQSection: React.FC = () => {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-24 relative" style={{ background: '#EDEAE3' }}>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        <Reveal className="text-center mb-14">
          <p className="text-[#857E78] text-[10px] tracking-[0.3em] font-black mb-4">— FAQ —</p>
          <h2 className="text-[#1C1C1C] tracking-tight" style={{ fontFamily: 'Playfair Display, serif', fontSize: '60px', fontWeight: 700, lineHeight: '60px' }}>
            Domande <em className="accent-italic">Frequenti.</em>
          </h2>
        </Reveal>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <Reveal key={i} delay={i * 40}>
              <div
                className="neon-card rounded-2xl border overflow-hidden transition-colors duration-300 relative"
                style={{
                  background: '#E4E0D8',
                  borderColor: open === i ? 'rgba(59,130,246,0.8)' : 'rgba(255,255,255,0.06)',
                }}
              >
                <button
                  className="w-full flex items-center justify-between gap-4 px-7 py-5 text-left"
                  onClick={() => setOpen(open === i ? null : i)}
                >
                  <span className="text-[#1C1C1C] font-semibold text-base leading-snug">{faq.q}</span>
                  <span
                    className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300"
                    style={{
                      border: `1px solid ${open === i ? '#2A5C3F' : '#C8C3BB'}`,
                      color: open === i ? '#2A5C3F' : '#857E78',
                      transform: open === i ? 'rotate(45deg)' : 'rotate(0deg)',
                    }}
                  >
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M5 1v8M1 5h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </span>
                </button>
                <div
                  className="grid transition-all duration-300 ease-in-out"
                  style={{ gridTemplateRows: open === i ? '1fr' : '0fr' }}
                >
                  <div className="overflow-hidden">
                    <p className="px-7 pb-6 text-[#857E78] text-sm leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
};

/* ── FluxAgentPage ── */
const FluxAgentPage: React.FC = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const [heroVisible, setHeroVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setHeroVisible(true), 80); return () => clearTimeout(t); }, []);

  const featureGlows = useMouseGlowArray(6);
  const stepGlows = useMouseGlowArray(3);
  const pricingGlows = useMouseGlowArray(3);
  const panel1Glow = useMouseGlow();
  const panel2Glow = useMouseGlow();

  const features = [
    'Integrazione con n8n, Gmail, Notion, Google Sheets',
    'Workflow automatici personalizzati per il tuo business',
    'Notifiche in tempo reale su ogni azione completata',
    'Report automatici settimanali nella tua inbox',
    'Gestione e archiviazione documenti automatica',
    'Attivo 24/7 senza interruzioni, ferie o errori',
    'Trigger su eventi: email ricevuta, form compilato, pagamento',
    'Connessione con CRM, e-commerce e gestionali',
    'Log completo di ogni operazione eseguita',
  ];

  return (
    <div style={{ background: '#EDEAE3' }} className="min-h-screen selection:bg-[#2A5C3F]/20 overflow-x-hidden">
      <CustomCursor />
      <Navbar ctaLabel="Prova Flux" />

      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
      <section className="relative pt-36 pb-0 px-4 overflow-hidden">
        {/* bg glow */}
        <div className="absolute inset-0  pointer-events-none" />

        <div className="max-w-3xl mx-auto text-center relative z-10">

          {/* badge */}
          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-7 border border-[#2A5C3F]/25 bg-[#2A5C3F]/8 transition-all duration-600 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3'}`}>
            <Zap className="w-3 h-3 text-[#2A5C3F]" />
            <span className="text-[#2A5C3F] text-[10px] tracking-[0.25em] font-black">AUTOMAZIONE PROCESSI</span>
          </div>

          {/* H1 */}
          <h1
            className={`tracking-tight leading-tight mb-5 transition-all duration-800 delay-100 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            style={{ fontFamily: 'Playfair Display, serif', fontSize: '96px', fontWeight: 900, letterSpacing: '-2.88px', lineHeight: '105.6px' }}
          >
            <span className="text-[#1C1C1C]">Flux </span>
            <em className="accent-italic">Agent</em>
          </h1>

          {/* subtitle */}
          <p className={`text-[#857E78] text-base sm:text-lg font-light leading-relaxed max-w-lg mx-auto mb-9 transition-all duration-700 delay-150 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            Automatizza i tuoi processi aziendali ed elimina il lavoro manuale ripetitivo. Flux lavora per te 24/7 senza mai fermarsi.
          </p>

          {/* CTA */}
          <div className={`flex flex-col sm:flex-row items-center justify-center gap-3 mb-14 transition-all duration-700 delay-200 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            <button
              onClick={() => navigate('/contatti')}
              className="group flex items-center gap-2 bg-[#2A5C3F] text-white font-semibold px-7 py-[14px] rounded-xl text-sm tracking-widest transition-all duration-300 hover:shadow-[0_4px_20px_rgba(0,0,0,0.12)] hover:scale-105 active:scale-95"
            >
              Inizia Ora
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
            <button
              onClick={() => document.querySelector('#come-funziona')?.scrollIntoView({ behavior: 'smooth' })}
              className="group flex items-center gap-2 bg-[#2A5C3F] text-white font-semibold px-7 py-[14px] rounded-xl text-sm tracking-widest transition-all duration-300 hover:shadow-[0_4px_20px_rgba(0,0,0,0.12)] hover:scale-105 active:scale-95"
            >
              Scopri di più
            </button>
          </div>
        </div>

        {/* Video box — full bleed feel */}
        <div className={`relative max-w-5xl mx-auto transition-all duration-1000 delay-300 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* outer glow */}
          <div className="absolute -inset-1 rounded-[2rem] bg-[#2A5C3F]/10 blur-2xl pointer-events-none" />
          <div
            className="relative rounded-[1.75rem] overflow-hidden border border-[#C8C3BB]"
            style={{ background: '#E4E0D8', aspectRatio: '16/9' }}
          >
            {/* top bar */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C8C3BB] to-transparent" />
            {/* grid */}
            <svg className="absolute inset-0 w-full h-full opacity-[0.035]">
              <defs>
                <pattern id="g" width="48" height="48" patternUnits="userSpaceOnUse">
                  <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#2A5C3F" strokeWidth="0.6" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#g)" />
            </svg>
            {/* center radial glow */}
            <div className="absolute inset-0 " />
            {/* play button */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              <div className="w-16 h-16 rounded-full border border-[#2A5C3F]/35 bg-[#2A5C3F]/10 flex items-center justify-center hover:bg-[#2A5C3F]/20 hover:border-[#2A5C3F]/60 hover:scale-110 transition-all duration-300 cursor-pointer group">
                <svg className="w-5 h-5 text-[#2A5C3F] ml-0.5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <p className="text-[#857E78]/70 text-[10px] tracking-[0.3em] font-bold">DEMO VIDEO IN ARRIVO</p>
            </div>
            {/* bottom fade */}
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#DEDAD2] to-transparent" />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          PROBLEMA / SOLUZIONE / RISULTATI
      ══════════════════════════════════════ */}
      <section className="py-20 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

              {/* IL PROBLEMA */}
              <div className="neon-card rounded-2xl border border-[#C8C3BB] bg-[#E4E0D8] p-8 relative overflow-hidden">
                <h3 className="text-[#1C1C1C] font-black font-inter mb-6" style={{ fontSize: '30px' }}>Il Problema</h3>
                <ul className="space-y-4">
                  {[
                    'Processi manuali che rubano ore ogni giorno',
                    'Errori umani che si ripetono continuamente',
                    'Team sovraccarico di attività ripetitive',
                    'Dati sparsi tra decine di tool diversi',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-[#857E78] text-sm leading-relaxed">
                      <span className="flex-shrink-0 font-bold" style={{ color: '#FF3333' }}>✗</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* LA SOLUZIONE */}
              <div
                className="neon-card relative rounded-2xl border border-[#2A5C3F]/40 p-8 overflow-hidden"
                style={{ background: '#DEDAD2' }}
              >
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C8C3BB] to-transparent" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(42,92,63,0.06)_0%,transparent_65%)] pointer-events-none" />
                <h3 className="font-black font-inter mb-6 relative z-10" style={{ fontSize: '30px', color: '#2A5C3F' }}>
                  La Soluzione
                </h3>
                <ul className="space-y-4 relative z-10">
                  {[
                    'Flux automatizza ogni processo ripetitivo in autonomia',
                    'Integrazione in tempo reale tra tutti i tuoi strumenti',
                    'Workflow personalizzati attivi 24/7 senza interruzioni',
                    'Zero errori manuali, zero supervisione necessaria',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-[#1C1C1C]/80 text-sm leading-relaxed">
                      <span className="flex-shrink-0 font-bold" style={{ color: '#2A5C3F' }}>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* I RISULTATI */}
              <div className="neon-card rounded-2xl border border-[#C8C3BB] bg-[#E4E0D8] p-8 relative overflow-hidden">
                <h3 className="font-black font-inter mb-6" style={{ fontSize: '30px', color: '#FFFFFF' }}>I Risultati</h3>
                <ul className="space-y-4">
                  {[
                    '80% di tempo operativo risparmiato ogni mese',
                    'Lead e clienti gestiti senza intervento umano',
                    'Business operativo anche quando sei offline',
                    'ROI misurabile già dal primo mese',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-[#1C1C1C]/70 text-sm leading-relaxed">
                      <span className="flex-shrink-0 font-bold" style={{ color: '#FFFFFF' }}>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════
          CALCOLATORE RISPARMIO TEMPO
      ══════════════════════════════════════ */}
      <section className="py-20 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <TimeCalculator />
        </div>
      </section>

      {/* ══════════════════════════════════════
          FEATURE SHOWCASE 1 — visual left, text right
      ══════════════════════════════════════ */}
      <section className="py-24 relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6 items-center">

            {/* Visual */}
            <Reveal className="h-full">
              <div
                className="neon-card relative rounded-[1.75rem] overflow-hidden border border-[#C8C3BB] h-[340px] md:h-[420px] transition-all duration-300"
                style={{ background: '#E4E0D8' }}
                onMouseMove={panel1Glow.onMouseMove}
                onMouseLeave={panel1Glow.onMouseLeave}
              >
                <div ref={panel1Glow.glowRef} style={glowDivStyle} />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C8C3BB] to-transparent" />
                <div className="absolute inset-0 " />
                <WorkflowVisual />
              </div>
            </Reveal>

            {/* Text */}
            <Reveal delay={100}>
              <p className="text-[#857E78] text-[10px] tracking-[0.3em] font-black mb-4">— INTEGRAZIONE —</p>
              <h2 className="text-[#1C1C1C] tracking-tight leading-tight mb-5" style={{ fontFamily: 'Playfair Display, serif', fontSize: '60px', fontWeight: 700, lineHeight: '60px' }}>
                Connette tutti<br />i tuoi strumenti
              </h2>
              <p className="text-[#857E78] text-base leading-relaxed mb-8">
                Flux si integra con oltre 300 applicazioni. Gmail, Notion, Google Sheets, CRM, e-commerce e molto altro. Nessun codice, nessuna complessità.
              </p>
              <ul className="space-y-3 mb-8">
                {['Connessione nativa con n8n e Zapier', 'Sincronizzazione dati in tempo reale', 'Setup in meno di 48 ore'].map((t, i) => (
                  <li key={i} className="flex items-center gap-3 text-[#1C1C1C]/70 text-base">
                    <span className="w-4 h-4 rounded-full bg-[#2A5C3F]/15 border border-[#2A5C3F]/30 flex items-center justify-center flex-shrink-0">
                      <Check className="w-2.5 h-2.5 text-[#2A5C3F]" />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => navigate('/contatti')}
                className="group flex items-center gap-2 bg-[#2A5C3F] text-white font-semibold px-7 py-[14px] rounded-xl text-sm tracking-widest transition-all duration-300 hover:shadow-[0_4px_20px_rgba(0,0,0,0.12)] hover:scale-105 active:scale-95"
              >
                Inizia ora <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          TIMELINE — OPERATIVO IN 72 ORE
      ══════════════════════════════════════ */}
      <TimelineSection />

      {/* ══════════════════════════════════════
          HOW IT WORKS
      ══════════════════════════════════════ */}
      <section id="come-funziona" className="py-28 relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-16">
            <p className="text-[#857E78] text-[10px] tracking-[0.3em] font-black mb-4">— IL PROCESSO —</p>
            <h2 className="text-[#1C1C1C] tracking-tight" style={{ fontFamily: 'Playfair Display, serif', fontSize: '60px', fontWeight: 700, lineHeight: '60px' }}>
              Come funziona <em className="accent-italic">Flux</em>
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              { n: '01', title: 'Analizziamo i tuoi processi', desc: 'Call conoscitiva per mappare dove perdi tempo e quali attività si ripetono ogni giorno.' },
              { n: '02', title: 'Costruiamo il workflow', desc: 'Il nostro team progetta e sviluppa l\'automazione, testandola in ogni scenario.' },
              { n: '03', title: 'Flux lavora in autonomia', desc: 'Una volta live, Flux gestisce i tuoi processi 24/7. Tu controlli, noi ottimizziamo.' },
            ].map((step, i) => (
              <Reveal key={i} delay={i * 100}>
                <div
                  className="neon-card relative rounded-2xl border border-[#C8C3BB] bg-[#E4E0D8] p-8 h-full hover:-translate-y-1 transition-all duration-300 group overflow-hidden"
                  onMouseMove={stepGlows.onMouseMove(i)}
                  onMouseLeave={stepGlows.onMouseLeave(i)}
                >
                  <div ref={el => { stepGlows.glowRefs.current[i] = el; }} style={glowDivStyle} />
                  <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-transparent via-[#C8C3BB] to-transparent rounded-t-2xl" />
                  <div className="relative z-10">
                    <div className="text-[4rem] font-black font-inter leading-none mb-5" style={{ color: 'rgba(42,92,63,0.08)' }}>
                      {step.n}
                    </div>
                    <h3 className="text-[#1C1C1C] font-black text-lg font-inter mb-3 leading-snug">{step.title}</h3>
                    <p className="text-[#857E78] text-base leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          PRICING
      ══════════════════════════════════════ */}
      <section className="py-28 relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C8C3BB]/50 to-transparent" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          <Reveal className="text-center mb-16">
            <p className="text-[#857E78] text-[10px] tracking-[0.3em] font-black mb-4">— PRICING —</p>
            <h2 className="text-[#1C1C1C] tracking-tight" style={{ fontFamily: 'Playfair Display, serif', fontSize: '60px', fontWeight: 700, lineHeight: '60px' }}>
              Pricing <em className="accent-italic">Trasparente.</em>
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6 items-stretch">

            {/* ── STARTER ── */}
            <Reveal delay={0}>
              <div
                className="neon-card relative rounded-[1.75rem] border border-[#C8C3BB] flex flex-col h-full overflow-hidden group hover:-translate-y-1 transition-all duration-300"
                style={{ background: '#E4E0D8' }}
                onMouseMove={pricingGlows.onMouseMove(0)}
                onMouseLeave={pricingGlows.onMouseLeave(0)}
              >
                <div ref={el => { pricingGlows.glowRefs.current[0] = el; }} style={glowDivStyle} />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                <div className="p-8 flex flex-col flex-1 relative z-10">
                  <p className="text-[#857E78] text-[10px] tracking-[0.3em] font-black mb-6">STARTER</p>
                  <div className="mb-2">
                    <span className="text-[#1C1C1C] font-black" style={{ fontFamily: 'Playfair Display, serif', fontSize: '48px', lineHeight: 1 }}>€150</span>
                    <span className="text-[#857E78] text-sm ml-1">/mese + IVA</span>
                  </div>
                  <p className="text-[#857E78] text-xs mb-8">+ setup iniziale una tantum</p>
                  <ul className="space-y-3 mb-10 flex-1">
                    {[
                      'Fino a 3 workflow automatizzati',
                      'Integrazione fino a 5 strumenti',
                      'Report automatici settimanali',
                      'Supporto via email',
                      'Aggiornamenti inclusi',
                    ].map((f, i) => (
                      <li key={i} className="flex items-start gap-3 text-[#1C1C1C]/70 text-sm">
                        <span className="flex-shrink-0 font-bold mt-0.5" style={{ color: '#2A5C3F' }}>✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => navigate('/contatti')}
                    className="w-full font-semibold px-7 py-[14px] rounded-xl text-sm tracking-widest bg-[#C8C3BB]/30 border border-[#C8C3BB] text-white hover:bg-[#C8C3BB]/50 hover:border-[#2A5C3F]/40 transition-all duration-200"
                  >
                    Inizia Ora
                  </button>
                </div>
              </div>
            </Reveal>

            {/* ── BUSINESS (featured) ── */}
            <Reveal delay={100}>
              <div
                className="neon-card relative rounded-[1.75rem] flex flex-col h-full overflow-hidden group hover:-translate-y-2 transition-all duration-300"
                style={{ background: '#E4E0D8', border: '1.5px solid rgba(42,92,63,0.2)', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
                onMouseMove={pricingGlows.onMouseMove(1)}
                onMouseLeave={pricingGlows.onMouseLeave(1)}
              >
                <div ref={el => { pricingGlows.glowRefs.current[1] = el; }} style={glowDivStyle} />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C8C3BB] to-transparent" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(42,92,63,0.05)_0%,transparent_60%)] pointer-events-none" />

                {/* Badge */}
                <div className="absolute top-5 right-5 z-20">
                  <span className="bg-[#2A5C3F] text-white text-[10px] font-black tracking-[0.2em] px-4 py-1.5 rounded-full">
                    PIÙ SCELTO
                  </span>
                </div>

                <div className="p-8 flex flex-col flex-1 relative z-10">
                  <p className="text-[#2A5C3F] text-[10px] tracking-[0.3em] font-black mb-6">BUSINESS</p>
                  <div className="mb-2">
                    <span className="text-[#1C1C1C] font-black" style={{ fontFamily: 'Playfair Display, serif', fontSize: '48px', lineHeight: 1 }}>€349</span>
                    <span className="text-[#857E78] text-sm ml-1">/mese + IVA</span>
                  </div>
                  <p className="text-[#857E78] text-xs mb-8">+ setup iniziale una tantum</p>
                  <ul className="space-y-3 mb-10 flex-1">
                    {[
                      'Workflow illimitati',
                      'Integrazione strumenti illimitata',
                      'Tutto il piano Starter incluso',
                      'Report giornalieri e mensili',
                      'Supporto prioritario dedicato',
                      'Accesso anticipato nuove funzionalità',
                    ].map((f, i) => (
                      <li key={i} className="flex items-start gap-3 text-[#1C1C1C]/80 text-sm">
                        <span className="flex-shrink-0 font-bold mt-0.5" style={{ color: '#2A5C3F' }}>✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => navigate('/contatti')}
                    className="w-full bg-[#2A5C3F] text-white font-semibold px-7 py-[14px] rounded-xl text-sm tracking-widest transition-all duration-300 hover:shadow-[0_4px_20px_rgba(0,0,0,0.12)] hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Inizia Ora
                  </button>
                </div>
              </div>
            </Reveal>

            {/* ── ENTERPRISE ── */}
            <Reveal delay={200}>
              <div
                className="neon-card relative rounded-[1.75rem] border border-[#C8C3BB] flex flex-col h-full overflow-hidden group hover:-translate-y-1 transition-all duration-300"
                style={{ background: '#E4E0D8' }}
                onMouseMove={pricingGlows.onMouseMove(2)}
                onMouseLeave={pricingGlows.onMouseLeave(2)}
              >
                <div ref={el => { pricingGlows.glowRefs.current[2] = el; }} style={glowDivStyle} />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                <div className="p-8 flex flex-col flex-1 relative z-10">
                  <p className="text-[#857E78] text-[10px] tracking-[0.3em] font-black mb-6">ENTERPRISE</p>
                  <div className="mb-2">
                    <span className="text-[#1C1C1C] font-black" style={{ fontFamily: 'Playfair Display, serif', fontSize: '36px', lineHeight: 1.2 }}>Contattaci</span>
                  </div>
                  <p className="text-[#857E78] text-xs mb-8">+ setup iniziale una tantum</p>
                  <ul className="space-y-3 mb-10 flex-1">
                    {[
                      'Tutto il piano Business incluso',
                      'Soluzione completamente personalizzata',
                      'Integrazioni custom',
                      'Account manager dedicato',
                      'SLA garantito',
                      'Formazione del team inclusa',
                    ].map((f, i) => (
                      <li key={i} className="flex items-start gap-3 text-[#1C1C1C]/70 text-sm">
                        <span className="flex-shrink-0 font-bold mt-0.5" style={{ color: '#2A5C3F' }}>✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => navigate('/contatti')}
                    className="w-full font-semibold px-7 py-[14px] rounded-xl text-sm tracking-widest bg-[#C8C3BB]/30 border border-[#C8C3BB] text-white hover:bg-[#C8C3BB]/50 hover:border-[#2A5C3F]/40 transition-all duration-200"
                  >
                    Prenota una Call
                  </button>
                </div>
              </div>
            </Reveal>

          </div>

          {/* Nota */}
          <Reveal>
            <p className="text-center text-[#857E78] text-xs italic mt-10 max-w-xl mx-auto leading-relaxed">
              Il canone mensile è fisso. Il setup iniziale è una fee una tantum il cui costo varia in base alle integrazioni richieste.
            </p>
          </Reveal>

        </div>
      </section>

      {/* ══════════════════════════════════════
          ALL FEATURES LIST
      ══════════════════════════════════════ */}
      <section className="py-24 relative" style={{ background: '#EDEAE3' }}>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-14">
            <p className="text-[#857E78] text-[10px] tracking-[0.3em] font-black mb-4">— FUNZIONALITÀ —</p>
            <h2 className="text-[#1C1C1C] tracking-tight" style={{ fontFamily: 'Playfair Display, serif', fontSize: '60px', fontWeight: 700, lineHeight: '60px' }}>
              Tutte le funzioni di <em className="accent-italic">Flux</em>
            </h2>
          </Reveal>

          <Reveal delay={100}>
            <div className="neon-card rounded-2xl border border-[#C8C3BB] overflow-hidden relative" style={{ background: '#E4E0D8' }}>
              {features.map((feat, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-4 px-7 py-4 hover:bg-[#C8C3BB]/20 transition-colors duration-200 ${i < features.length - 1 ? 'border-b border-[#C8C3BB]/50' : ''}`}
                >
                  <span className="w-5 h-5 rounded-full bg-[#2A5C3F]/12 border border-[#2A5C3F]/25 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-[#2A5C3F]" />
                  </span>
                  <span className="text-[#1C1C1C]/70 text-base">{feat}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SICUREZZA / GDPR
      ══════════════════════════════════════ */}
      <section className="py-28 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Title */}
          <Reveal className="text-center mb-16">
            <h2 className="text-[#1C1C1C] tracking-tight leading-tight" style={{ fontFamily: 'Playfair Display, serif', fontSize: '60px', fontWeight: 700, lineHeight: '60px' }}>
              I tuoi dati sono{' '}
              <em className="accent-italic">al sicuro.</em>
            </h2>
          </Reveal>

          {/* Single wide card */}
          <Reveal>
            <div
              className="neon-card relative rounded-[2rem] border border-[#C8C3BB] overflow-hidden"
              style={{ background: '#E4E0D8' }}
            >
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

              <div className="grid md:grid-cols-[3fr_2fr] gap-0 items-center">

                {/* Left — compliance list */}
                <div className="p-10 md:p-14 border-b md:border-b-0 md:border-r border-[#C8C3BB]">
                  <p className="text-[#857E78] text-[10px] tracking-[0.3em] font-black mb-8">
                    FLUX È PROGETTATO IN CONFORMITÀ AL GDPR EUROPEO
                  </p>
                  <ul className="space-y-6">
                    {[
                      { title: 'Server in Europa',        desc: 'Dati ospitati su data center europei certificati.' },
                      { title: 'Crittografia end-to-end', desc: 'Protetti in transito e a riposo con AES-256.' },
                      { title: 'Provider certificati',    desc: 'ISO/IEC 27001 — standard internazionale di sicurezza.' },
                      { title: 'DPA disponibile',         desc: 'Data Processing Agreement disponibile su richiesta.' },
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-4">
                        <span className="mt-1 flex-shrink-0 font-black text-white" style={{ fontSize: '16px' }}>✓</span>
                        <div>
                          <span className="text-white text-base font-bold">{item.title}</span>
                          <span className="text-[#857E78] text-base"> — {item.desc}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Right — GDPR badge B&W */}
                <div className="flex items-center justify-center py-12 px-8">
                  <div className="relative w-72 h-72 flex items-center justify-center">
                    {/* outer rings */}
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 260 260">
                      <defs>
                        <path id="gdpr-path" d="M 130,130 m -100,0 a 100,100 0 1,1 200,0 a 100,100 0 1,1 -200,0" />
                      </defs>
                      <circle cx="130" cy="130" r="120" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                      <circle cx="130" cy="130" r="100" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
                      {/* rotating text */}
                      <text fontSize="8.5" fontWeight="700" letterSpacing="5" fill="rgba(255,255,255,0.25)" fontFamily="monospace">
                        <textPath href="#gdpr-path">
                          DATA PROTECTION • GDPR COMPLIANT • SICUREZZA •&nbsp;
                        </textPath>
                      </text>
                      {/* tick marks */}
                      {Array.from({ length: 32 }).map((_, i) => {
                        const angle = (i / 32) * Math.PI * 2 - Math.PI / 2;
                        const r1 = 108, r2 = 115;
                        return (
                          <line
                            key={i}
                            x1={130 + r1 * Math.cos(angle)} y1={130 + r1 * Math.sin(angle)}
                            x2={130 + r2 * Math.cos(angle)} y2={130 + r2 * Math.sin(angle)}
                            stroke="rgba(255,255,255,0.15)" strokeWidth="0.8"
                          />
                        );
                      })}
                    </svg>

                    {/* center badge */}
                    <div
                      className="relative w-48 h-48 rounded-full flex flex-col items-center justify-center border border-[#C8C3BB]"
                      style={{ background: '#DEDAD2', boxShadow: '0 0 50px rgba(255,255,255,0.04), inset 0 0 30px rgba(255,255,255,0.02)' }}
                    >
                      {/* shield icon — large, white */}
                      <svg className="w-16 h-16 mb-2" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={1.2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                      </svg>
                      <span className="text-white text-lg font-black tracking-[0.2em]">GDPR</span>
                      <span className="text-[#857E78] text-[9px] tracking-[0.25em] font-bold mt-0.5">COMPLIANT</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════
          FAQ
      ══════════════════════════════════════ */}
      <FAQSection />

      {/* ══════════════════════════════════════
          CTA FINALE
      ══════════════════════════════════════ */}
      <section className="py-28 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        {/* center glow */}
        <div className="absolute inset-0  pointer-events-none" />
        {/* bottom permanent blue glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[220px] pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(42,92,63,0.15) 0%, rgba(42,92,63,0.06) 40%, transparent 70%)', filter: 'blur(8px)' }} />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[300px] h-[120px] pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(42,92,63,0.2) 0%, transparent 65%)', filter: 'blur(4px)' }} />

        <div className="max-w-2xl mx-auto px-4 text-center relative z-10">
          <Reveal>
            <p className="text-[#857E78] text-[10px] tracking-[0.3em] font-black mb-5">— INIZIA ORA —</p>
            <h2 className="text-[#1C1C1C] tracking-tight leading-tight mb-5" style={{ fontFamily: 'Playfair Display, serif', fontSize: '96px', fontWeight: 900, letterSpacing: '-2.88px', lineHeight: '105.6px' }}>
              Pronto ad<br />
              <em className="accent-italic">automatizzare?</em>
            </h2>
            <p className="text-[#857E78] text-lg font-light leading-relaxed mb-10 max-w-sm mx-auto">
              Prenota una call gratuita e scopri come Flux può trasformare il tuo business in meno di 48 ore.
            </p>
            <button
              onClick={() => navigate('/contatti')}
              className="group inline-flex items-center gap-3 bg-[#2A5C3F] text-white font-semibold px-7 py-[14px] rounded-xl text-sm tracking-widest transition-all duration-300 hover:shadow-[0_4px_20px_rgba(0,0,0,0.12)] hover:scale-105 active:scale-95"
            >
              Prenota una Call Gratuita
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
};

/* ── WorkflowVisual ── animated nodes/connections ── */
const WorkflowVisual: React.FC = () => {
  const nodes = [
    { x: 18, y: 30, label: 'Gmail' },
    { x: 18, y: 65, label: 'Form' },
    { x: 50, y: 47, label: 'Flux' },
    { x: 82, y: 25, label: 'Notion' },
    { x: 82, y: 52, label: 'Sheets' },
    { x: 82, y: 78, label: 'Slack' },
  ];

  return (
    <svg className="absolute inset-0 w-full h-full" style={{ padding: '10%' }} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
      {/* connections */}
      {[[0,2],[1,2],[2,3],[2,4],[2,5]].map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a].x} y1={nodes[a].y}
          x2={nodes[b].x} y2={nodes[b].y}
          stroke="rgba(42,92,63,0.25)"
          strokeWidth="0.6"
          strokeDasharray="2 2"
        >
          <animate attributeName="stroke-dashoffset" values="0;-8" dur={`${1.5 + i * 0.3}s`} repeatCount="indefinite" />
        </line>
      ))}

      {nodes.map((node, i) => {
        const isCenter = i === 2;
        return (
          <g key={i}>
            {isCenter && (
              <circle cx={node.x} cy={node.y} r="7" fill="rgba(42,92,63,0.06)" stroke="rgba(59,130,246,0.2)" strokeWidth="0.4">
                <animate attributeName="r" values="7;9;7" dur="2.5s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.6;1;0.6" dur="2.5s" repeatCount="indefinite" />
              </circle>
            )}
            <circle
              cx={node.x} cy={node.y}
              r={isCenter ? 5 : 3.5}
              fill={isCenter ? '#2A5C3F' : '#E4E0D8'}
              stroke={isCenter ? '#2A5C3F' : 'rgba(42,92,63,0.4)'}
              strokeWidth={isCenter ? '0' : '0.6'}
            />
            <text
              x={node.x} y={node.y + (isCenter ? 9 : 7.5)}
              textAnchor="middle"
              fill="rgba(255,255,255,0.35)"
              fontSize={isCenter ? '3.5' : '3'}
              fontWeight="700"
            >
              {node.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

/* ── ActivityVisual ── animated activity feed ── */
const ACTIVITIES = [
  { time: '09:42', text: 'Email ricevuta → lead aggiunto al CRM', done: true },
  { time: '09:43', text: 'Form compilato → appuntamento creato', done: true },
  { time: '09:44', text: 'Documento archiviato in Google Drive', done: true },
  { time: '09:45', text: 'Report settimanale generato e inviato', done: true },
  { time: 'ora',   text: 'Workflow in esecuzione...', done: false },
];

const ActivityVisual: React.FC = () => (
  <div className="absolute inset-0 flex flex-col justify-center px-7 py-8 gap-2">
    <p className="text-[9px] tracking-[0.25em] font-black text-[#857E78]/70 mb-3">ATTIVITÀ RECENTI</p>
    {ACTIVITIES.map((a, i) => (
      <div
        key={i}
        className="flex items-center gap-3 rounded-xl px-4 py-3"
        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}
      >
        <span className="text-[9px] text-[#857E78] font-mono w-8 flex-shrink-0">{a.time}</span>
        <span className="text-[10px] text-[#857E78] flex-1 leading-snug">{a.text}</span>
        {a.done
          ? <Check className="w-3 h-3 text-[#2A5C3F] flex-shrink-0" />
          : <span className="w-2 h-2 rounded-full bg-[#2A5C3F] flex-shrink-0 animate-pulse" />
        }
      </div>
    ))}
  </div>
);

export default FluxAgentPage;
