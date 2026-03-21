import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import AboutModal from '../components/AboutModal';

interface NavbarProps {
  forceSolid?: boolean;
}

const Navbar: React.FC<NavbarProps> = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Soluzioni', href: '/#soluzioni' },
    { label: 'Casi Studio', href: '/#casi-studio' },
    { label: 'Prodotti', href: '/#soluzioni' },
    { label: 'Chi Sono', href: '#', isModal: true },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, href: string, isModal?: boolean) => {
    if (isModal) {
      e.preventDefault();
      setIsAboutModalOpen(true);
      setIsMobileMenuOpen(false);
      return;
    }
    if (href.startsWith('/#')) {
      const element = document.querySelector(href.replace('/', ''));
      if (element) {
        e.preventDefault();
        element.scrollIntoView({ behavior: 'smooth' });
        setIsMobileMenuOpen(false);
      }
    } else if (href === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Pill Navbar */}
      <div className="fixed top-5 left-0 right-0 z-[200] flex justify-center px-4">
        <nav
          style={{
            background: 'rgba(0,0,0,0.8)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '50px',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
          }}
          className="flex items-center gap-2 px-4 py-2"
        >
          {/* Logo */}
          <a href="/" onClick={(e) => handleLinkClick(e, '/')} className="flex items-center mr-3">
            <img
              src="https://i.ibb.co/zh2W9Mcs/Chat-GPT-Image-4-feb-2026-10-54-50.png"
              alt="PatrickAI Logo"
              className="h-9 w-auto filter drop-shadow-[0_0_8px_rgba(0,102,255,0.3)] hover:scale-105 transition-transform"
            />
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href, link.isModal)}
                className="text-white/60 hover:text-white text-[11px] tracking-widest font-semibold px-4 py-2 rounded-full hover:bg-white/5 transition-all duration-200 cursor-pointer whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <a
            href="/#contatti"
            onClick={(e) => handleLinkClick(e, '/#contatti')}
            className="hidden md:block ml-2 bg-[#0066FF] text-white font-black px-6 py-2 text-[11px] tracking-widest transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,102,255,0.4)] hover:scale-105 active:scale-95 whitespace-nowrap"
            style={{ borderRadius: '50px' }}
          >
            Contattaci
          </a>

          {/* Mobile hamburger */}
          <button className="md:hidden text-white p-2 ml-1" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden fixed top-20 left-4 right-4 z-[199] transition-all duration-300 ${
        isMobileMenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-4'
      }`}
        style={{
          background: 'rgba(0,0,0,0.95)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '24px',
          backdropFilter: 'blur(10px)',
        }}
      >
        <div className="px-6 py-8 space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href, link.isModal)}
              className="block text-white/70 hover:text-white text-lg font-bold tracking-widest transition-colors cursor-pointer py-2"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-4 border-t border-white/10">
            <a
              href="/#contatti"
              onClick={(e) => handleLinkClick(e, '/#contatti')}
              className="block w-full text-center bg-[#0066FF] text-white font-black py-4 text-sm tracking-widest active:scale-95 transition-transform"
              style={{ borderRadius: '50px' }}
            >
              Contattaci
            </a>
          </div>
        </div>
      </div>

      <AboutModal isOpen={isAboutModalOpen} onClose={() => setIsAboutModalOpen(false)} />
    </>
  );
};

export default Navbar;
