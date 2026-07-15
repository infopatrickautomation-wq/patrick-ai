import React, { useMemo } from 'react';

/*
 * Sfondo animato di pallini che salgono dal basso e svaniscono — lo stesso
 * effetto usato nella sezione "Tre agenti", estratto come componente
 * riutilizzabile. Puro CSS/DOM (anima solo transform + opacity, quindi è
 * accelerato dalla GPU) e theme-aware tramite var(--dot-rgb).
 *
 * Va inserito come primo figlio di un contenitore `relative overflow-hidden`;
 * il contenuto della sezione deve stare sopra con `relative z-10`.
 */

interface FloatingDotsProps {
  /** numero di pallini (default 34) */
  count?: number;
  /** quanti px salgono prima di svanire (default 240) */
  rise?: number;
  /** opacità dei pallini (default 0.5) */
  opacity?: number;
  className?: string;
}

const FloatingDots: React.FC<FloatingDotsProps> = ({
  count = 34,
  rise = 240,
  opacity = 0.5,
  className = '',
}) => {
  const dots = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        left: (i * 37) % 100,
        delay: (i * 0.37) % 6,
        duration: 5 + ((i * 13) % 7),
        size: 2 + (i % 3),
      })),
    [count]
  );

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <style>{`
        @keyframes floatingDotRise {
          0%   { transform: translateY(0); opacity: 0; }
          12%  { opacity: 1; }
          88%  { opacity: 1; }
          100% { transform: translateY(calc(-1 * var(--fd-rise, 240px))); opacity: 0; }
        }
      `}</style>
      {dots.map((d, i) => (
        <span
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${d.left}%`,
            bottom: '-10px',
            width: d.size,
            height: d.size,
            backgroundColor: `rgba(var(--dot-rgb),${opacity})`,
            ['--fd-rise' as string]: `${rise}px`,
            animation: `floatingDotRise ${d.duration}s linear ${d.delay}s infinite`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
};

export default FloatingDots;
