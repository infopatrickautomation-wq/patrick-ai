
import React, { useEffect, useRef, useState } from 'react';
import { useMouseGlowArray, glowDivStyle } from '../hooks/useMouseGlow';

interface StatItem {
  prefix?: string;
  value: number;
  suffix: string;
  label: string;
  decimals?: boolean;
}

const stats: StatItem[] = [
  { value: 300, suffix: '%', label: 'Lead qualificati in più', prefix: '+' },
  { value: 80, suffix: '%', label: 'Riduzione tempo operativo', prefix: '-' },
  { value: 10, suffix: 'h', label: 'Risparmiate ogni mese', prefix: '' },
];

const AnimatedNumber: React.FC<{ stat: StatItem; trigger: boolean }> = ({ stat, trigger }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;
    let start = 0;
    const duration = 2000;
    const step = stat.value / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= stat.value) {
        setCount(stat.value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [trigger, stat.value]);

  return (
    <span className="text-5xl sm:text-6xl md:text-7xl font-black font-montserrat text-transparent bg-clip-text bg-gradient-to-r from-[#0066FF] to-[#0066FF]">
      {stat.prefix}{count}{stat.suffix}
    </span>
  );
};

const Stats: React.FC = () => {
  const [triggered, setTriggered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { glowRefs, onMouseMove, onMouseLeave } = useMouseGlowArray(3);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setTriggered(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-24 bg-black relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0066FF]/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0066FF]/10 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(0,102,255,0.04)_0%,transparent_70%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-[#0066FF] text-xs tracking-[0.3em] font-black mb-16">
          — Risultati misurabili —
        </p>
        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12 max-w-4xl mx-auto">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="text-center p-8 rounded-3xl border border-[rgba(0,102,255,0.15)] bg-[#161B22] hover:border-[#0066FF]/60 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,102,255,0.15)] transition-all duration-300 group relative overflow-hidden"
              onMouseMove={onMouseMove(i)}
              onMouseLeave={onMouseLeave(i)}
            >
              <div ref={el => { glowRefs.current[i] = el; }} style={glowDivStyle} />
              <AnimatedNumber stat={stat} trigger={triggered} />
              <p className="text-white/40 text-xs tracking-widest font-bold mt-3 group-hover:text-white/60 transition-colors relative z-10">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
