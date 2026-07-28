
import React from 'react';
import { Linkedin, Instagram } from 'lucide-react';
import FloatingDots from '../components/FloatingDots';
import { HexFloat } from '../components/canvasui/HexFloat';

/**
 * Il fondo del footer è scuro in entrambi i temi (prima era un radial-gradient
 * che partiva da questo blu quasi nero), quindi qui l'effetto a esagoni può
 * restare sempre acceso: il problema di contrasto che si ha sul crema non si
 * presenta. Nell'hero invece l'effetto è solo sul tema scuro.
 */
const FOOTER_BG = '#080B12';

/* Stessi valori dell'hero, così le due sezioni si somigliano. */
const FOOTER_HEX = {
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

const Footer: React.FC = () => {
  const linkClass = 'block text-gray-400 hover:text-white transition-colors duration-200 text-sm leading-relaxed';

  return (
   <HexFloat {...FOOTER_HEX} gapColor="auto" className="block w-full">
    <footer style={{ background: FOOTER_BG }} className="relative overflow-hidden">
      {/* Sfondo pallini animati */}
      <FloatingDots count={50} rise={360} />

      {/* Top green line */}
      <div className="relative z-10 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(var(--accent-rgb),0.4), transparent)' }} />

      {/* Main grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-16">

          {/* Col 1 — Brand */}
          <div className="md:col-span-1">
            <img
              src="/logo-blue-dark.png"
              alt="PatrickAI Logo"
              className="h-14 w-auto mb-5 opacity-90"
              style={{ filter: 'drop-shadow(0 0 12px rgba(var(--accent-rgb),0.3))' }}
            />
            <p className="text-white text-base font-semibold leading-snug mb-3">
              L'Evoluzione Intelligente<br />del Business
            </p>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Automazioni su misura e intelligenza artificiale per far crescere il tuo business.
            </p>
            <div className="space-y-1.5 text-gray-500 text-xs leading-relaxed">
              <p>PatrickAI Automation</p>
              <p>Molinella, Bologna</p>
              <a href="mailto:info.patrickautomation@gmail.com" className="hover:text-[var(--accent)] transition-colors block">
                info.patrickautomation@gmail.com
              </a>
              <a href="tel:3518302839" className="hover:text-[var(--accent)] transition-colors block">
                351 830 2839
              </a>
            </div>
          </div>

          {/* Col 2 — Servizi */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: 'var(--accent)', boxShadow: '0 0 8px rgba(var(--accent-rgb),0.6)' }} />
              <h4 className="text-white text-xs font-black tracking-widest">Servizi</h4>
            </div>
            <ul className="space-y-3">
              <li><a href="/#soluzioni" className={linkClass}>Automazione Processi</a></li>
              <li><a href="/#soluzioni" className={linkClass}>AI Agent</a></li>
              <li><a href="/#soluzioni" className={linkClass}>Analisi &amp; Progettazione</a></li>
              <li><a href="/#casi-studio" className={linkClass}>Casi Studio</a></li>
            </ul>
          </div>

          {/* Col 3 — Risorse */}
          <div>
            <h4 className="text-white text-xs font-black tracking-widest mb-5">Risorse</h4>
            <ul className="space-y-3">
              <li><a href="/#chi-siamo" className={linkClass}>Chi Sono</a></li>
              <li><a href="/blog" className={linkClass}>Blog</a></li>
              <li><a href="/#contatti" className={linkClass}>Contattaci</a></li>
              <li><a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className={linkClass}>LinkedIn</a></li>
            </ul>
          </div>

          {/* Col 4 — Legal */}
          <div>
            <h4 className="text-white text-xs font-black tracking-widest mb-5">Legal</h4>
            <ul className="space-y-3">
              <li><a href="#" className={linkClass}>Privacy Policy</a></li>
              <li><a href="#" className={linkClass}>Termini di Servizio</a></li>
              <li><a href="#" className={linkClass}>Cookie Policy</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative z-10 border-t" style={{ borderColor: 'rgba(var(--accent-rgb),0.15)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-xs">
            © {new Date().getFullYear()} PatrickAI Automation. Tutti i diritti riservati.
          </p>
          <div className="flex items-center gap-3">
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200"
              style={{ border: '1px solid rgba(var(--accent-rgb),0.2)' }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(var(--accent-rgb),0.6)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(var(--accent-rgb),0.2)')}
            >
              <Linkedin className="w-4 h-4 text-gray-400" />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200"
              style={{ border: '1px solid rgba(var(--accent-rgb),0.2)' }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(var(--accent-rgb),0.6)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(var(--accent-rgb),0.2)')}
            >
              <Instagram className="w-4 h-4 text-gray-400" />
            </a>
          </div>
        </div>
      </div>
    </footer>
   </HexFloat>
  );
};

export default Footer;
