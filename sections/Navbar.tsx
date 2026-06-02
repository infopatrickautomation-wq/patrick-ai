import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { navigate } from '../hooks/useRoute';

interface NavbarProps {
  forceSolid?: boolean;
  ctaLabel?: string;
}

const Navbar: React.FC<NavbarProps> = ({ ctaLabel = 'Contattaci' }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { label: string; href: string; isModal?: boolean; isPage?: boolean }[] = [
    { label: 'Home', href: '/' },
    { label: 'Casi Studio', href: '/#casi-studio' },
    { label: 'Prodotti', href: '/prodotti', isPage: true },
    { label: 'Chi Sono', href: '/chi-sono', isPage: true },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, href: string, isModal?: boolean, isPage?: boolean) => {
    if (isPage) {
      e.preventDefault();
      setIsMobileMenuOpen(false);
      navigate(href);
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
      if (window.location.pathname !== '/') {
        // navigate back to home
      } else {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setIsMobileMenuOpen(false);
      }
    }
  };

  return (
    <>
      {/* Pill Navbar */}
      <div className="fixed top-5 left-0 right-0 z-[200] flex justify-center px-4">
        <nav
          style={{
            background: 'rgba(237,234,227,0.92)',
            border: '1px solid #C8C3BB',
            borderRadius: '50px',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
          }}
          className="flex items-center gap-2 px-4 py-2"
        >
          {/* Logo */}
          <a href="/" onClick={(e) => handleLinkClick(e, '/')} className="flex items-center mr-3">
            <img
              src="/logo.png"
              alt="PatrickAI Logo"
              className="h-9 w-auto hover:scale-105 transition-transform"
            />
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href, link.isModal, link.isPage)}
                className="text-[#857E78] hover:text-[#1C1C1C] text-[11px] tracking-widest font-semibold px-4 py-2 rounded-full hover:bg-[#1C1C1C]/5 transition-all duration-200 cursor-pointer whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <button
            onClick={() => navigate('/contatti')}
            className="hidden md:block ml-2 bg-[#2A5C3F] text-white font-semibold px-7 py-[14px] text-[11px] tracking-widest transition-all duration-300 hover:bg-[#3D7055] hover:scale-105 active:scale-95 whitespace-nowrap"
            style={{ borderRadius: '50px' }}
          >
            {ctaLabel}
          </button>

          {/* Mobile hamburger */}
          <button className="md:hidden text-[#1C1C1C] p-2 ml-1" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden fixed top-20 left-4 right-4 z-[199] transition-all duration-300 ${
        isMobileMenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-4'
      }`}
        style={{
          background: 'rgba(237,234,227,0.98)',
          border: '1px solid #C8C3BB',
          borderRadius: '24px',
          backdropFilter: 'blur(10px)',
        }}
      >
        <div className="px-6 py-8 space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href, link.isModal, link.isPage)}
              className="block text-[#857E78] hover:text-[#1C1C1C] font-bold tracking-widest transition-colors cursor-pointer py-2"
              style={{ fontSize: '12px' }}
            >
              {link.label}
            </a>
          ))}
          <div className="pt-4 border-t border-[#C8C3BB]">
            <button
              onClick={() => { setIsMobileMenuOpen(false); navigate('/contatti'); }}
              className="block w-full text-center bg-[#2A5C3F] text-white font-semibold px-7 py-[14px] text-sm tracking-widest active:scale-95 transition-transform hover:bg-[#3D7055]"
              style={{ borderRadius: '50px' }}
            >
              {ctaLabel}
            </button>
          </div>
        </div>
      </div>

    </>
  );
};

export default Navbar;
