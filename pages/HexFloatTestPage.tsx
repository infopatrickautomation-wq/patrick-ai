/**
 * PAGINA DI PROVA — /prova-hexfloat. Non è linkata da nessuna parte del sito.
 *
 * Prova l'effetto HexFloat di CanvasUI (canvasui.dev) come SFONDO INTERO dell'hero
 * del sito: niente riquadro, niente bordi arrotondati, l'effetto copre tutta la
 * sezione. L'hero è quello vero (sections/Hero.tsx), non una copia: quello che si
 * vede qui è esattamente quello che si vedrebbe in produzione.
 *
 * Le manopole sono nascoste dietro un bottone in basso a destra, per poter regolare
 * i parametri dal vivo senza ricompilare. Non fanno parte dell'effetto.
 *
 * Se non convince: si riporta questo file allo stato precedente, si toglie il blocco
 * della rotta in App.tsx e si cancella components/canvasui/. Nient'altro è stato toccato.
 */
import React, { useState } from 'react';
import { HexFloat } from '@/components/canvasui/HexFloat';
import Hero from '../sections/Hero';
import Navbar from '../sections/Navbar';
import { navigate } from '../hooks/useRoute';
import CustomCursor from '../components/CustomCursor';

/* Valori di partenza. Rispetto a quelli passati da Patrick: esagoni piu' grandi
   (160 -> 260) e rilievo/luce piu' marcati, perche' con i valori originali
   l'effetto si leggeva appena. Le manopole restano per regolare. */
const PRESET = {
  size: 260,
  gap: 0,
  bevel: 2.2,
  tilt: 24,
  perspective: 0.5,
  float: 0,
  speed: 1,
  shine: 0.85,
  lift: 0.1,
  radius: 1200,
  iridescence: 1,
  bloom: 0,
  grain: 0.8,
};

type Params = typeof PRESET;

const CONTROLS: { key: keyof Params; min: number; max: number; step: number }[] = [
  { key: 'size', min: 40, max: 400, step: 4 },
  { key: 'gap', min: 0, max: 20, step: 1 },
  { key: 'bevel', min: 0, max: 4, step: 0.1 },
  { key: 'tilt', min: 0, max: 60, step: 1 },
  { key: 'perspective', min: 0, max: 1.5, step: 0.05 },
  { key: 'float', min: 0, max: 3, step: 0.1 },
  { key: 'speed', min: 0, max: 3, step: 0.1 },
  { key: 'shine', min: 0, max: 2, step: 0.05 },
  { key: 'lift', min: 0, max: 1, step: 0.05 },
  { key: 'radius', min: 200, max: 3000, step: 50 },
  { key: 'iridescence', min: 0, max: 2, step: 0.05 },
  { key: 'bloom', min: 0, max: 2, step: 0.05 },
  { key: 'grain', min: 0, max: 2, step: 0.05 },
];

const HexFloatTestPage: React.FC = () => {
  const [p, setP] = useState<Params>(PRESET);
  const [panelOpen, setPanelOpen] = useState(false);
  const [effectOn, setEffectOn] = useState(true);

  const set = (k: keyof Params) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setP((prev) => ({ ...prev, [k]: Number(e.target.value) }));

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--title)]">
      {/* Il cursore del sito e' ora lo stesso cerchio vuoto sperimentato qui,
          quindi si usa quello invece di tenerne due che possono divergere. */}
      <CustomCursor />
      <Navbar />

      {/* ─────────── HERO ───────────
          L'effetto avvolge l'intera sezione: nessun contenitore, nessun raggio,
          nessun margine. Con effectOn a false si vede l'hero originale, per il
          confronto diretto. */}
      {effectOn ? (
        <HexFloat
          size={p.size}
          gap={p.gap}
          bevel={p.bevel}
          tilt={p.tilt}
          perspective={p.perspective}
          float={p.float}
          speed={p.speed}
          shine={p.shine}
          lift={p.lift}
          radius={p.radius}
          flow={0}
          swirl={0}
          trail={0}
          iridescence={p.iridescence}
          bloom={p.bloom}
          grain={p.grain}
          gapColor="auto"
          className="block w-full"
        >
          <Hero />
        </HexFloat>
      ) : (
        <Hero />
      )}

      {/* ─────────── Comandi della prova ───────────
          Esistono solo qui. Non fanno parte dell'effetto. */}
      <div className="fixed bottom-6 right-6 z-[600] flex flex-col items-end gap-3">
        {panelOpen && (
          <div className="w-[min(92vw,420px)] max-h-[70vh] overflow-y-auto rounded-2xl border border-[var(--border-soft)] bg-[var(--bg-alt)] p-5 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <p className="text-[10px] font-semibold uppercase tracking-[.26em] text-[var(--body)]">
                Manopole
              </p>
              <button
                onClick={() => setP(PRESET)}
                className="text-[10px] font-semibold uppercase tracking-[.16em] text-[var(--accent-light)] hover:underline"
              >
                valori di partenza
              </button>
            </div>

            <div className="grid grid-cols-2 gap-x-5 gap-y-3.5">
              {CONTROLS.map(({ key, min, max, step }) => (
                <label key={key} className="flex flex-col gap-1">
                  <span className="flex justify-between text-[10px] text-[var(--body)]">
                    <span className="font-semibold uppercase tracking-[.1em]">{key}</span>
                    <span className="tabular-nums text-[var(--title)]">{p[key]}</span>
                  </span>
                  <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={p[key]}
                    onChange={set(key)}
                    className="w-full accent-[var(--accent-light)]"
                  />
                </label>
              ))}
            </div>

            <pre className="mt-5 p-3 rounded-lg bg-[var(--bg)] border border-[var(--border-soft)] text-[10px] leading-relaxed overflow-x-auto text-[var(--body)]">
{`<HexFloat
${CONTROLS.map(({ key }) => `  ${key}={${p[key]}}`).join('\n')}
  gapColor="auto"
>`}
            </pre>
          </div>
        )}

        <div className="flex gap-2">
          <button
            onClick={() => setEffectOn((v) => !v)}
            className="px-4 py-2.5 rounded-full text-[11px] font-semibold uppercase tracking-[.16em] border border-[var(--border-soft)] bg-[var(--bg-alt)] text-[var(--title)] hover:border-[var(--accent-light)] transition-colors"
          >
            {effectOn ? 'senza effetto' : 'con effetto'}
          </button>
          <button
            onClick={() => setPanelOpen((v) => !v)}
            className="px-4 py-2.5 rounded-full text-[11px] font-semibold uppercase tracking-[.16em] bg-[var(--accent)] text-white hover:bg-[var(--accent-light)] transition-colors"
          >
            {panelOpen ? 'chiudi' : 'manopole'}
          </button>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2.5 rounded-full text-[11px] font-semibold uppercase tracking-[.16em] border border-[var(--border-soft)] bg-[var(--bg-alt)] text-[var(--body)] hover:text-[var(--title)] transition-colors"
          >
            esci
          </button>
        </div>
      </div>
    </div>
  );
};

export default HexFloatTestPage;
