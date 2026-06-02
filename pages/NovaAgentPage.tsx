import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Check, Zap, Settings, TrendingUp, Users } from 'lucide-react';
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

/* ── Lead Calculator ── */
const sectors = [
  { label: 'Ristoranti / Hotel',     rate: 0.40 },
  { label: 'Professionisti / Studi', rate: 0.40 },
  { label: 'Artigiani / Imprese',    rate: 0.40 },
  { label: 'Altro',                  rate: 0.40 },
];

const LeadCalculator: React.FC = () => {
  const [sector, setSector] = useState(0);
  const [leads, setLeads] = useState(20);
  const [display, setDisplay] = useState(Math.round(20 * 0.40 * 4));
  const displayRef = useRef(Math.round(20 * 0.40 * 4));
  const animRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const lostPerWeek = Math.round(leads * sectors[sector].rate);
  const recoveredMonthly = lostPerWeek * 4;
  const valueMonthly = recoveredMonthly * 150;

  useEffect(() => {
    if (animRef.current) clearInterval(animRef.current);
    const target = recoveredMonthly;
    animRef.current = setInterval(() => {
      const diff = target - displayRef.current;
      if (diff === 0) { clearInterval(animRef.current!); return; }
      const step = diff > 0 ? Math.max(1, Math.ceil(diff / 8)) : Math.min(-1, Math.floor(diff / 8));
      displayRef.current += step;
      setDisplay(displayRef.current);
    }, 30);
    return () => { if (animRef.current) clearInterval(animRef.current); };
  }, [recoveredMonthly]);

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
            Quanti lead stai<br />
            <span className="accent-italic">perdendo?</span>
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

            <p className="text-[#857E78] text-[10px] tracking-[0.25em] font-black mb-5">STEP 2 — LEAD RICEVUTI A SETTIMANA</p>
            <div className="flex items-center gap-5 mb-4">
              <button
                onClick={() => setLeads(h => Math.max(5, h - 1))}
                className="w-11 h-11 rounded-full border border-white/12 text-[#857E78] hover:border-[#2A5C3F]/50 hover:text-white transition-all duration-200 text-xl font-bold flex items-center justify-center flex-shrink-0"
              >−</button>
              <div className="flex-1 text-center">
                <span className="text-[#1C1C1C] font-black" style={{ fontFamily: 'Playfair Display, serif', fontSize: '52px', lineHeight: 1 }}>{leads}</span>
                <span className="text-[#857E78] text-sm ml-2">lead / sett.</span>
              </div>
              <button
                onClick={() => setLeads(h => Math.min(100, h + 1))}
                className="w-11 h-11 rounded-full border border-white/12 text-[#857E78] hover:border-[#2A5C3F]/50 hover:text-white transition-all duration-200 text-xl font-bold flex items-center justify-center flex-shrink-0"
              >+</button>
            </div>
            <input
              type="range" min={5} max={100} value={leads}
              onChange={e => setLeads(Number(e.target.value))}
              className="w-full"
              style={{ accentColor: '#2A5C3F' }}
            />
            <div className="flex justify-between text-[#857E78]/70 text-xs mt-1.5">
              <span>5 lead</span><span>100 lead</span>
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
                <span className="text-[#857E78] text-base ml-2">lead recuperati / mese</span>
              </div>

              <div className="space-y-3 mb-8">
                <div className="h-px bg-[#C8C3BB]/60" />
                <div className="flex justify-between items-center py-1">
                  <span className="text-[#857E78] text-sm">Valore stimato mensile</span>
                  <span className="text-[#1C1C1C] font-black text-2xl">€{valueMonthly.toLocaleString('it-IT')}</span>
                </div>
                <div className="h-px bg-[#C8C3BB]/60" />
                <div className="flex justify-between items-center py-1">
                  <span className="text-[#857E78] text-sm">Lead persi a settimana</span>
                  <span className="text-[#1C1C1C] font-black text-2xl">{lostPerWeek} lead</span>
                </div>
              </div>

              <button
                onClick={() => navigate('/contatti')}
                className="w-full bg-[#2A5C3F] text-white font-semibold px-7 py-[14px] rounded-xl text-sm tracking-widest flex items-center justify-center gap-3 transition-all duration-300 hover:shadow-[0_4px_20px_rgba(0,0,0,0.12)] hover:scale-[1.01] active:scale-[0.99]"
              >
                Recupera i tuoi lead
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
    Icon: Settings,
    label: 'Giorno 1: Configurazione',
    desc: 'Configuriamo Nova su misura per il tuo business. Definiamo i criteri di qualifica, i messaggi e le risposte automatiche.',
  },
  {
    Icon: Zap,
    label: 'Giorno 2: Integrazione CRM/WhatsApp',
    desc: 'Connettiamo Nova al tuo CRM e ai canali di comunicazione: WhatsApp, email, form. Ogni lead viene catturato in automatico.',
  },
  {
    Icon: Users,
    label: 'Giorno 3: Lancio',
    desc: 'Nova va live e inizia a qualificare i lead, rispondere ai contatti e prenotare appuntamenti. Zero intervento manuale.',
  },
  {
    Icon: TrendingUp,
    label: 'Mese 1+: Ottimizzazione continua',
    desc: 'Monitoriamo i risultati e ottimizziamo continuamente le strategie di qualifica. Più lead, più appuntamenti, più revenue.',
  },
];

const TimelineSection: React.FC = () => {
  const stepRefs    = useRef<(HTMLDivElement | null)[]>([null, null, null, null]);
  const circleRefs  = useRef<(HTMLDivElement | null)[]>([null, null, null, null]);
  const iconWrpRefs = useRef<(HTMLDivElement | null)[]>([null, null, null, null]);
  const textRefs    = useRef<(HTMLDivElement | null)[]>([null, null, null, null]);
  const lineRefs    = useRef<(HTMLDivElement | null)[]>([null, null, null]);

  useEffect(() => {
    const TRIGGER = 0.58;

    const update = () => {
      const triggerY = window.innerHeight * TRIGGER;

      stepRefs.current.forEach((el, i) => {
        if (!el) return;
        const rect  = el.getBoundingClientRect();
        const stepY = rect.top + rect.height * 0.25;
        const on    = stepY < triggerY;

        const circ = circleRefs.current[i];
        if (circ) {
          circ.style.borderColor = on ? '#2A5C3F'               : 'rgba(200,195,187,0.3)';
          circ.style.background  = on ? 'rgba(42,92,63,0.15)'   : 'rgba(200,195,187,0.1)';
          circ.style.boxShadow   = on ? '0 0 16px rgba(42,92,63,0.3)' : 'none';
        }

        const wrap = iconWrpRefs.current[i];
        if (wrap) wrap.style.color = on ? '#2A5C3F' : 'rgba(28,28,28,0.2)';

        const txt = textRefs.current[i];
        if (txt) {
          txt.style.opacity   = on ? '1'             : '0.12';
          txt.style.transform = on ? 'translateY(0)' : 'translateY(12px)';
        }

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

          {/* ── Left: sticky copy + results card ── */}
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

            {/* Results card */}
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
                        3<span className="text-[#2A5C3F]">x</span>
                      </div>
                      <p className="text-[#857E78] text-sm leading-snug">
                        lead qualificati ogni mese.<br />
                        <span className="text-[#1C1C1C]/70">Pipeline piena, agenda piena.</span>
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

/* ── NovaAgentPage ── */
const NovaAgentPage: React.FC = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const [heroVisible, setHeroVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setHeroVisible(true), 80); return () => clearTimeout(t); }, []);

  const stepGlows = useMouseGlowArray(3);
  const pricingGlows = useMouseGlowArray(3);
  const panel1Glow = useMouseGlow();

  return (
    <div style={{ background: '#EDEAE3' }} className="min-h-screen selection:bg-[#2A5C3F]/20 overflow-x-hidden">
      <CustomCursor />
      <Navbar ctaLabel="Prova Nova" />

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
            <span className="text-[#2A5C3F] text-[10px] tracking-[0.25em] font-black">AI AGENT & LEAD GENERATION</span>
          </div>

          {/* H1 */}
          <h1
            className={`tracking-tight leading-tight mb-5 transition-all duration-800 delay-100 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            style={{ fontFamily: 'Playfair Display, serif', fontSize: '96px', fontWeight: 900, letterSpacing: '-2.88px', lineHeight: '105.6px' }}
          >
            <span className="text-[#1C1C1C]">Nova </span>
            <em className="accent-italic">Agent</em>
          </h1>

          {/* subtitle */}
          <p className={`text-[#857E78] text-base sm:text-lg font-light leading-relaxed max-w-lg mx-auto mb-9 transition-all duration-700 delay-150 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            L'agente AI intelligente che gestisce i tuoi contatti, qualifica i lead e prenota appuntamenti automaticamente. Nova lavora per te 24/7.
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
                <pattern id="g-nova" width="48" height="48" patternUnits="userSpaceOnUse">
                  <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#C8C3BB" strokeWidth="0.6" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#g-nova)" />
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
          NUMERI IMPATTO
      ══════════════════════════════════════ */}
      <section className="py-16 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { value: '3x', label: 'Lead qualificati' },
                { value: '24/7', label: 'Operativo sempre' },
                { value: '-70%', label: 'Tempo acquisizione' },
                { value: '0', label: 'Contatti persi' },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="neon-card rounded-2xl border border-[#C8C3BB] bg-[#E4E0D8] p-6 text-center"
                >
                  <div
                    className="font-black leading-none mb-2"
                    style={{ fontFamily: 'Playfair Display, serif', fontSize: '48px', color: '#2A5C3F' }}
                  >
                    {stat.value}
                  </div>
                  <p className="text-[#857E78] text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════
          PROBLEMA / SOLUZIONE / RISULTATI
      ══════════════════════════════════════ */}
      <section className="py-20 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">

              {/* IL PROBLEMA */}
              <div
                className="rounded-lg p-8 relative overflow-hidden flex flex-col"
                style={{ background: '#f9f2f2', border: '1px solid rgba(200,100,100,0.3)' }}
              >
                <h3 className="font-black font-montserrat mb-6" style={{ fontSize: '30px', color: '#cc4444' }}>Il Problema</h3>
                <ul className="space-y-5 flex-1">
                  {[
                    { bold: 'Lead non seguiti', desc: 'I tuoi contatti aspettano ore senza risposta.' },
                    { bold: 'Contatti persi', desc: 'Nessun follow-up = opportunità buttate nel cestino.' },
                    { bold: 'Qualifica manuale', desc: 'Ore spese a filtrare lead che non comprano mai.' },
                    { bold: 'Pipeline cieca', desc: 'Non sai chi è caldo, chi è freddo, chi è pronto.' },
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm leading-relaxed">
                      <span className="flex-shrink-0 font-black mt-0.5" style={{ color: '#cc4444' }}>✗</span>
                      <span>
                        <span className="font-bold text-[#1C1C1C]/75">{item.bold}</span>
                        <span className="text-[#857E78]"> — {item.desc}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* LA SOLUZIONE + RISULTATI */}
              <div
                className="rounded-lg p-8 relative overflow-hidden flex flex-col"
                style={{ background: '#EDEAE3', border: '1px solid rgba(0,102,255,0.3)' }}
              >
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#2A5C3F]/40 to-transparent" />
                <h3 className="font-black font-montserrat mb-6 relative z-10" style={{ fontSize: '30px', color: '#2A5C3F' }}>
                  La Soluzione: Nova
                </h3>
                <ul className="space-y-5 flex-1 relative z-10">
                  {[
                    { bold: 'Qualifica automatica', desc: 'Nova filtra e punteggia ogni lead in tempo reale.' },
                    { bold: 'Follow-up immediato', desc: 'Risposta istantanea su ogni canale, h24.' },
                    { bold: 'Agenda piena da sola', desc: 'Gli appuntamenti vengono prenotati in autonomia.' },
                    { bold: 'Pipeline sempre viva', desc: 'Ogni contatto tracciato e aggiornato in tempo reale.' },
                    { bold: '3x lead qualificati', desc: 'Pipeline piena, revenue che cresce ogni mese.' },
                    { bold: 'ROI dal primo mese', desc: 'Zero contatti persi, risultati misurabili subito.' },
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm leading-relaxed">
                      <span className="flex-shrink-0 font-black mt-0.5" style={{ color: '#2A5C3F' }}>✓</span>
                      <span>
                        <span className="font-bold text-[#1C1C1C]/85">{item.bold}</span>
                        <span className="text-[#857E78]"> — {item.desc}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════
          HOW IT WORKS
      ══════════════════════════════════════ */}
      <section id="come-funziona" className="py-20 relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-16">
            <p className="text-[#857E78] text-[10px] tracking-[0.3em] font-black mb-4">— IL PROCESSO —</p>
            <h2 className="text-[#1C1C1C] tracking-tight" style={{ fontFamily: 'Playfair Display, serif', fontSize: '60px', fontWeight: 700, lineHeight: '60px' }}>
              Come funziona <em className="accent-italic">Nova</em>
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              { n: '01', title: 'Capta ogni lead', desc: 'Nova intercetta ogni contatto in arrivo: WhatsApp, form, email. Nessun lead passa inosservato.' },
              { n: '02', title: 'Qualifica in automatico', desc: 'Nova pone le domande giuste, analizza le risposte e segna ogni lead con il suo livello di interesse.' },
              { n: '03', title: 'Prenota l\'appuntamento', desc: 'I lead qualificati vengono guidati alla prenotazione. La tua agenda si riempie da sola.' },
            ].map((step, i) => (
              <Reveal key={i} delay={i * 100}>
                <div
                  className="neon-card relative rounded-lg border border-[#C8C3BB] bg-[#E4E0D8] h-full overflow-hidden group transition-all duration-300 hover:border-[#2A5C3F] hover:scale-[1.02] hover:shadow-[0_4px_20px_rgba(0,0,0,0.12)]"
                  style={{ padding: '32px 40px' }}
                  onMouseMove={stepGlows.onMouseMove(i)}
                  onMouseLeave={stepGlows.onMouseLeave(i)}
                >
                  <div ref={el => { stepGlows.glowRefs.current[i] = el; }} style={glowDivStyle} />
                  <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-transparent via-[#C8C3BB] to-transparent rounded-t-2xl" />
                  <div className="relative z-10">
                    <div className="text-[4rem] font-black font-montserrat leading-none mb-5" style={{ color: 'rgba(42,92,63,0.15)' }}>
                      {step.n}
                    </div>
                    <h3 className="text-[#1C1C1C] font-black text-xl font-montserrat mb-3 leading-snug">{step.title}</h3>
                    <p className="text-[#857E78] leading-relaxed" style={{ fontSize: '17px' }}>{step.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          CALCOLATORE LEAD
      ══════════════════════════════════════ */}
      <section className="py-20 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <LeadCalculator />
        </div>
      </section>

      {/* ══════════════════════════════════════
          FEATURE SHOWCASE — visual left, text right
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
                <NovaFlowVisual />
              </div>
            </Reveal>

            {/* Text */}
            <Reveal delay={100}>
              <p className="text-[#857E78] text-[10px] tracking-[0.3em] font-black mb-4">— INTEGRAZIONE —</p>
              <h2 className="text-[#1C1C1C] tracking-tight leading-tight mb-5" style={{ fontFamily: 'Playfair Display, serif', fontSize: '60px', fontWeight: 700, lineHeight: '60px' }}>
                Connette tutti<br />i tuoi canali
              </h2>
              <p className="text-[#857E78] text-base leading-relaxed mb-8">
                Nova si integra con WhatsApp, email, CRM e form di contatto. Ogni lead viene catturato, qualificato e gestito in automatico, senza nessun intervento manuale.
              </p>
              <ul className="space-y-3 mb-8">
                {['Integrazione nativa con WhatsApp e CRM', 'Qualifica automatica in tempo reale', 'Setup in meno di 48 ore'].map((t, i) => (
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

          {/* ── CONFIGURAZIONE INIZIALE ── */}
          <Reveal className="flex justify-center mb-16">
            <div
              className="neon-card relative rounded-[1.75rem] border border-[#C8C3BB] overflow-hidden"
              style={{ background: '#E4E0D8', width: '280px' }}
            >
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C8C3BB] to-transparent" />
              <div className="p-7 flex flex-col relative z-10">
                <p className="text-[#857E78] text-[10px] tracking-[0.3em] font-black mb-5">CONFIGURAZIONE INIZIALE</p>
                <div className="mb-1">
                  <span className="text-[#1C1C1C] font-black" style={{ fontFamily: 'Playfair Display, serif', fontSize: '38px', lineHeight: 1 }}>€1.500</span>
                </div>
                <p className="text-[#857E78] text-xs mb-6">una tantum + IVA</p>
                <ul className="space-y-2.5 mb-7">
                  {[
                    'Setup completo di Nova',
                    'Integrazione CRM e canali',
                    'Configurazione workflow',
                    'Test e go-live inclusi',
                  ].map((f, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-[#857E78] text-sm">
                      <span className="flex-shrink-0 mt-0.5" style={{ color: '#2A5C3F' }}>✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => navigate('/contatti')}
                  className="w-full font-semibold px-5 py-3 rounded-xl text-sm tracking-widest bg-[#C8C3BB]/30 border border-[#C8C3BB] text-white hover:bg-[#C8C3BB]/50 hover:border-[#2A5C3F]/40 transition-all duration-200"
                >
                  Inizia Ora
                </button>
              </div>
            </div>
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
                    <span className="text-[#1C1C1C] font-black" style={{ fontFamily: 'Playfair Display, serif', fontSize: '48px', lineHeight: 1 }}>€200</span>
                    <span className="text-[#857E78] text-sm ml-1">/mese + IVA</span>
                  </div>
                  <p className="text-[#857E78] text-xs mb-8">+ setup iniziale una tantum</p>
                  <ul className="space-y-3 mb-10 flex-1">
                    {[
                      'Fino a 3 workflow di qualifica',
                      'Integrazione fino a 5 canali',
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
                    <span className="text-[#1C1C1C] font-black" style={{ fontFamily: 'Playfair Display, serif', fontSize: '48px', lineHeight: 1 }}>€500</span>
                    <span className="text-[#857E78] text-sm ml-1">/mese + IVA</span>
                  </div>
                  <p className="text-[#857E78] text-xs mb-8">+ setup iniziale una tantum</p>
                  <ul className="space-y-3 mb-10 flex-1">
                    {[
                      'Workflow illimitati',
                      'Integrazione canali illimitata',
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
                    NOVA È PROGETTATO IN CONFORMITÀ AL GDPR EUROPEO
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
                          <span className="text-[#1C1C1C] text-base font-bold">{item.title}</span>
                          <span className="text-[#857E78] text-base"> — {item.desc}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Right — GDPR badge */}
                <div className="flex items-center justify-center py-12 px-8">
                  <div className="relative w-72 h-72 flex items-center justify-center">
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 260 260">
                      <defs>
                        <path id="nova-gdpr-path" d="M 130,130 m -100,0 a 100,100 0 1,1 200,0 a 100,100 0 1,1 -200,0" />
                      </defs>
                      <circle cx="130" cy="130" r="120" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                      <circle cx="130" cy="130" r="100" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
                      <text fontSize="8.5" fontWeight="700" letterSpacing="5" fill="rgba(255,255,255,0.25)" fontFamily="monospace">
                        <textPath href="#nova-gdpr-path">
                          DATA PROTECTION • GDPR COMPLIANT • SICUREZZA •&nbsp;
                        </textPath>
                      </text>
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

                    <div
                      className="relative w-48 h-48 rounded-full flex flex-col items-center justify-center border border-[#C8C3BB]"
                      style={{ background: '#DEDAD2', boxShadow: '0 0 50px rgba(255,255,255,0.04), inset 0 0 30px rgba(255,255,255,0.02)' }}
                    >
                      <svg className="w-16 h-16 mb-2" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={1.2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                      </svg>
                      <span className="text-[#1C1C1C] text-lg font-black tracking-[0.2em]">GDPR</span>
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
          CTA FINALE
      ══════════════════════════════════════ */}
      <section className="py-28 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        <div className="absolute inset-0  pointer-events-none" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[220px] pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(42,92,63,0.15) 0%, rgba(42,92,63,0.06) 40%, transparent 70%)', filter: 'blur(8px)' }} />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[300px] h-[120px] pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(42,92,63,0.2) 0%, transparent 65%)', filter: 'blur(4px)' }} />

        <div className="max-w-2xl mx-auto px-4 text-center relative z-10">
          <Reveal>
            <p className="text-[#857E78] text-[10px] tracking-[0.3em] font-black mb-5">— INIZIA ORA —</p>
            <h2 className="text-[#1C1C1C] tracking-tight leading-tight mb-5" style={{ fontFamily: 'Playfair Display, serif', fontSize: '96px', fontWeight: 900, letterSpacing: '-2.88px', lineHeight: '105.6px' }}>
              Pronto a non<br />
              <em className="accent-italic">perdere più</em><br />
              un lead?
            </h2>
            <p className="text-[#857E78] text-lg font-light leading-relaxed mb-10 max-w-sm mx-auto">
              Prenota una call gratuita e scopri come Nova può riempire la tua agenda in meno di 48 ore.
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

/* ── NovaFlowVisual — lead/CRM nodes ── */
const NovaFlowVisual: React.FC = () => {
  const nodes = [
    { x: 18, y: 25, label: 'WhatsApp' },
    { x: 18, y: 65, label: 'Form' },
    { x: 50, y: 47, label: 'Nova' },
    { x: 82, y: 22, label: 'CRM' },
    { x: 82, y: 50, label: 'Calendar' },
    { x: 82, y: 78, label: 'Email' },
  ];

  return (
    <svg className="absolute inset-0 w-full h-full" style={{ padding: '10%' }} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
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
              fill="rgba(28,28,28,0.35)"
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

export default NovaAgentPage;
