
import React from 'react';
import { Linkedin, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  const linkClass = "block text-[#666] hover:text-[#3B82F6] transition-colors duration-200 text-sm leading-relaxed";

  return (
    <footer style={{ background: '#050d1a' }} className="border-t border-white/5">
      {/* Main grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-16">

          {/* Col 1 — Brand */}
          <div className="md:col-span-1">
            <img
              src="https://i.ibb.co/zh2W9Mcs/Chat-GPT-Image-4-feb-2026-10-54-50.png"
              alt="PatrickAI Logo"
              className="h-14 w-auto mb-5 opacity-90"
            />
            <p className="text-white text-base font-semibold leading-snug mb-3">
              L'Evoluzione Intelligente<br />del Business
            </p>
            <p className="text-[#666] text-sm leading-relaxed mb-6">
              Automazioni su misura e intelligenza artificiale per far crescere il tuo business.
            </p>
            <div className="space-y-1.5 text-[#555] text-xs leading-relaxed">
              <p>PatrickAI Automation</p>
              <p>Molinella, Bologna</p>
              <a href="mailto:info.patrickautomation@gmail.com" className="hover:text-[#3B82F6] transition-colors block">
                info.patrickautomation@gmail.com
              </a>
              <a href="tel:3518302839" className="hover:text-[#3B82F6] transition-colors block">
                351 830 2839
              </a>
            </div>
          </div>

          {/* Col 2 — Servizi */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <span
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ background: '#3B82F6', boxShadow: '0 0 6px rgba(0,102,255,0.6)' }}
              />
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
              <li><a href="#" className={linkClass}>Blog</a></li>
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
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#444] text-xs">
            © {new Date().getFullYear()} PatrickAI Automation. Tutti i diritti riservati.
          </p>
          <div className="flex items-center gap-3">
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center hover:border-[#3B82F6]/50 hover:bg-[#3B82F6]/10 transition-all duration-200"
            >
              <Linkedin className="w-4 h-4 text-[#666]" />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center hover:border-[#3B82F6]/50 hover:bg-[#3B82F6]/10 transition-all duration-200"
            >
              <Instagram className="w-4 h-4 text-[#666]" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
