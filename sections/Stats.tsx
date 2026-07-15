
import React, { useEffect, useRef, useState } from 'react';
import { useMouseGlowArray, glowDivStyle } from '../hooks/useMouseGlow';
import DotMatrixText from '../components/DotMatrixText';
import FloatingDots from '../components/FloatingDots';

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
    <div className="flex justify-center" style={{ filter: 'drop-shadow(0 0 10px rgba(var(--accent-rgb),0.4))' }}>
      <DotMatrixText text={`${stat.prefix}${count}${stat.suffix}`} dot={3.3} gap={1} charGap={3} />
    </div>
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
    <section className="py-24 bg-[var(--bg)] relative overflow-hidden">
      <FloatingDots />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--border-soft)] to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--border-soft)] to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="mono-label text-center text-sm mb-16" style={{ color: 'var(--accent)' }}>
          IN CIFRE
        </p>
        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12 max-w-4xl mx-auto">
          {stats.map((stat, i) => (
            <div key={i} className="relative">
              {/* bordo posteriore sfalsato */}
              <div
                className="absolute inset-0 rounded-md transition-colors duration-500"
                style={{ border: '1.5px solid rgba(var(--accent-rgb),0.6)', transform: 'translate(6px, 6px)' }}
              />
              <div
                className="text-center p-8 rounded-md bg-[var(--bg-alt)] hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden"
                style={{ border: '1.5px solid rgba(var(--title-rgb),0.85)' }}
                onMouseMove={onMouseMove(i)}
                onMouseLeave={onMouseLeave(i)}
              >
                <div ref={el => { glowRefs.current[i] = el; }} style={glowDivStyle} />
                <AnimatedNumber stat={stat} trigger={triggered} />
                <p className="text-[var(--body)] text-xs tracking-widest font-bold mt-3 transition-colors relative z-10">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
