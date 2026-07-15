import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { navigate } from '../hooks/useRoute';
import { useTheme } from '../hooks/useTheme';

interface NavbarProps {
  forceSolid?: boolean;
  ctaLabel?: string;
}

const ThemeToggleIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" width={15} height={15} aria-hidden="true">
    <circle cx="12" cy="12" r="8.5" fill="none" stroke="var(--accent)" strokeWidth="1.6" />
    <path d="M12 3.5a8.5 8.5 0 000 17z" fill="var(--accent)" />
  </svg>
);

const Navbar: React.FC<NavbarProps> = ({ ctaLabel = 'Contattaci' }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { toggleTheme } = useTheme();

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
            background: 'rgba(var(--bg-rgb),0.92)',
            border: '1px solid var(--border-soft)',
            borderRadius: '50px',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
          }}
          className="flex items-center gap-2 px-4 py-2"
        >
          {/* Logo */}
          <a href="/" onClick={(e) => handleLinkClick(e, '/')} className="flex items-center mr-3">
            <img
              src="/logo-blue-dark.png"
              alt="PatrickAI Logo"
              className="logo-swap-dark h-9 w-auto hover:scale-105 transition-transform"
            />
            <img
              src="/logo-blue-light.png"
              alt="PatrickAI Logo"
              className="logo-swap-light h-9 w-auto hover:scale-105 transition-transform"
            />
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href, link.isModal, link.isPage)}
                className="text-[var(--body)] hover:text-[var(--title)] text-[11px] tracking-widest font-semibold px-4 py-2 rounded-full hover:bg-[#e8e2d2]/5 transition-all duration-200 cursor-pointer whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <button
            onClick={() => navigate('/contatti')}
            className="rubric-btn hidden md:block ml-2 px-7 py-[14px] rounded-lg text-[11px] tracking-widest whitespace-nowrap"
          >
            {ctaLabel}
          </button>

          {/* Theme toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Cambia tema"
            className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ml-1 transition-colors duration-300"
            style={{ border: '1.5px solid var(--accent)' }}
          >
            <ThemeToggleIcon />
          </button>

          {/* Mobile hamburger */}
          <button className="md:hidden text-[var(--title)] p-2 ml-1" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden fixed top-20 left-4 right-4 z-[199] transition-all duration-300 ${
        isMobileMenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-4'
      }`}
        style={{
          background: 'rgba(var(--bg-rgb),0.98)',
          border: '1px solid var(--border-soft)',
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
              className="block text-[var(--body)] hover:text-[var(--title)] font-bold tracking-widest transition-colors cursor-pointer py-2"
              style={{ fontSize: '12px' }}
            >
              {link.label}
            </a>
          ))}
          <div className="pt-4 border-t border-[var(--border-soft)]">
            <button
              onClick={() => { setIsMobileMenuOpen(false); navigate('/contatti'); }}
              className="rubric-btn block w-full text-center px-7 py-[14px] rounded-lg text-sm tracking-widest"
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
