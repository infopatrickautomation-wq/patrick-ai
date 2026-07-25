import React from 'react';
import { HexFloat } from './canvasui/HexFloat';
import Hero from '../sections/Hero';
import { useTheme } from '../hooks/useTheme';

/**
 * L'hero con lo sfondo a esagoni (HexFloat di canvasui.dev).
 *
 * L'effetto avvolge l'intera sezione: nessun contenitore, nessun bordo arrotondato,
 * copre lo sfondo da bordo a bordo. Il contenuto dell'hero resta HTML vero, quindi
 * titolo, logo e bottoni funzionano normalmente.
 *
 * SOLO SUL TEMA SCURO, apposta. Sul crema gli esagoni non hanno abbastanza contrasto
 * per leggersi: restano righe grigie sparse e attorno al logo compare un alone
 * rettangolare, che sembra un difetto di rendering più che un effetto. Sul chiaro
 * quindi si mostra l'hero originale, senza. Il cambio è istantaneo perché il tema
 * arriva dal context, non da una media query.
 */
const HERO_HEX = {
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
  flow: 0,
  swirl: 0,
  trail: 0,
  iridescence: 1,
  bloom: 0,
  grain: 0.8,
} as const;

const HeroHexFloat: React.FC = () => {
  const { theme } = useTheme();

  if (theme !== 'dark') return <Hero />;

  return (
    <HexFloat {...HERO_HEX} gapColor="auto" className="block w-full">
      <Hero />
    </HexFloat>
  );
};

export default HeroHexFloat;
