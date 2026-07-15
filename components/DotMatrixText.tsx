import React, { useEffect, useRef, useState } from 'react';

/*
 * Testo/numeri stile display a LED — ogni carattere è una matrice 5x7 di
 * pallini. I pallini "accesi" compaiono in sequenza (uno alla volta) quando
 * il componente entra nel viewport, per l'effetto "si disegna da solo".
 */

const FONT: Record<string, string[]> = {
  '0': ['01110', '10001', '10011', '10101', '11001', '10001', '01110'],
  '1': ['00100', '01100', '00100', '00100', '00100', '00100', '01110'],
  '2': ['01110', '10001', '00001', '00010', '00100', '01000', '11111'],
  '3': ['11111', '00010', '00100', '00010', '00001', '10001', '01110'],
  '4': ['00010', '00110', '01010', '10010', '11111', '00010', '00010'],
  '5': ['11111', '10000', '11110', '00001', '00001', '10001', '01110'],
  '6': ['00110', '01000', '10000', '11110', '10001', '10001', '01110'],
  '7': ['11111', '00001', '00010', '00100', '01000', '01000', '01000'],
  '8': ['01110', '10001', '10001', '01110', '10001', '10001', '01110'],
  '9': ['01110', '10001', '10001', '01111', '00001', '00010', '01100'],
  'A': ['01110', '10001', '10001', '11111', '10001', '10001', '10001'],
  'B': ['11110', '10001', '10001', '11110', '10001', '10001', '11110'],
  'C': ['01111', '10000', '10000', '10000', '10000', '10000', '01111'],
  'D': ['11110', '10001', '10001', '10001', '10001', '10001', '11110'],
  'E': ['11111', '10000', '10000', '11110', '10000', '10000', '11111'],
  'F': ['11111', '10000', '10000', '11110', '10000', '10000', '10000'],
  'G': ['01111', '10000', '10000', '10011', '10001', '10001', '01111'],
  'H': ['10001', '10001', '10001', '11111', '10001', '10001', '10001'],
  'I': ['01110', '00100', '00100', '00100', '00100', '00100', '01110'],
  'J': ['00001', '00001', '00001', '00001', '00001', '10001', '01110'],
  'K': ['10001', '10010', '10100', '11000', '10100', '10010', '10001'],
  'L': ['10000', '10000', '10000', '10000', '10000', '10000', '11111'],
  'M': ['10001', '11011', '10101', '10101', '10001', '10001', '10001'],
  'N': ['10001', '11001', '10101', '10101', '10011', '10001', '10001'],
  'O': ['01110', '10001', '10001', '10001', '10001', '10001', '01110'],
  'P': ['11110', '10001', '10001', '11110', '10000', '10000', '10000'],
  'Q': ['01110', '10001', '10001', '10001', '10101', '10010', '01101'],
  'R': ['11110', '10001', '10001', '11110', '10100', '10010', '10001'],
  'S': ['01111', '10000', '10000', '01110', '00001', '00001', '11110'],
  'T': ['11111', '00100', '00100', '00100', '00100', '00100', '00100'],
  'U': ['10001', '10001', '10001', '10001', '10001', '10001', '01110'],
  'V': ['10001', '10001', '10001', '10001', '10001', '01010', '00100'],
  'W': ['10001', '10001', '10001', '10101', '10101', '10101', '01010'],
  'X': ['10001', '10001', '01010', '00100', '01010', '10001', '10001'],
  'Y': ['10001', '10001', '01010', '00100', '00100', '00100', '00100'],
  'Z': ['11111', '00001', '00010', '00100', '01000', '10000', '11111'],
  '%': ['11001', '11010', '00100', '01011', '10011', '00000', '00000'],
  '+': ['00000', '00100', '00100', '11111', '00100', '00100', '00000'],
  '-': ['00000', '00000', '00000', '11111', '00000', '00000', '00000'],
  '.': ['00000', '00000', '00000', '00000', '00000', '01100', '01100'],
  "'": ['01100', '01100', '00100', '00000', '00000', '00000', '00000'],
  '?': ['01110', '10001', '00001', '00010', '00100', '00000', '00100'],
  '!': ['00100', '00100', '00100', '00100', '00100', '00000', '00100'],
  '/': ['00001', '00001', '00010', '00100', '01000', '10000', '10000'],
  ' ': ['000', '000', '000', '000', '000', '000', '000'],
};

interface DotMatrixTextProps {
  text: string;
  dot?: number;
  gap?: number;
  charGap?: number;
  color?: string;
  className?: string;
  staggerMs?: number;
}

const DotMatrixText: React.FC<DotMatrixTextProps> = ({
  text,
  dot = 8,
  gap = 2,
  charGap = 6,
  color = 'var(--accent)',
  className = '',
  staggerMs = 9,
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const cell = dot + gap;
  const chars = text.toUpperCase().split('');
  let dotIndex = 0;
  // dot/gap/charGap sono la dimensione "a schermo largo"; il wrapper porta un
  // proprio font-size responsive (indipendente da quello, spesso enorme, del
  // titolo che lo contiene) e tutto il resto è espresso in "em" relativi a
  // quello — così l'intera parola si rimpicciolisce da sola sotto ~640px
  // invece di restare sempre alla dimensione desktop.
  const REF_PX_PER_EM = 16;

  return (
    <span
      ref={ref}
      className={`inline-flex items-end align-baseline ${className}`}
      style={{ gap: `${charGap / REF_PX_PER_EM}em`, fontSize: 'clamp(9px, 2.6vw, 16px)' }}
      aria-label={text}
    >
      {chars.map((ch, ci) => {
        const glyph = FONT[ch] ?? FONT[' '];
        const cols = glyph[0].length;
        return (
          <svg
            key={ci}
            viewBox={`0 0 ${cols * cell} ${7 * cell}`}
            style={{
              display: 'block',
              overflow: 'visible',
              width: `${(cols * cell) / REF_PX_PER_EM}em`,
              height: `${(7 * cell) / REF_PX_PER_EM}em`,
            }}
            aria-hidden="true"
          >
            {glyph.map((row, ry) =>
              row.split('').map((bit, rx) => {
                if (bit !== '1') return null;
                const i = dotIndex++;
                return (
                  <circle
                    key={`${ry}-${rx}`}
                    cx={rx * cell + dot / 2}
                    cy={ry * cell + dot / 2}
                    r={dot / 2}
                    fill={color}
                    style={{
                      opacity: revealed ? 1 : 0,
                      transform: revealed ? 'scale(1)' : 'scale(0)',
                      transformOrigin: 'center',
                      transformBox: 'fill-box',
                      transition: `opacity 0.2s ease ${i * staggerMs}ms, transform 0.2s ease ${i * staggerMs}ms`,
                    }}
                  />
                );
              })
            )}
          </svg>
        );
      })}
    </span>
  );
};

export default DotMatrixText;
