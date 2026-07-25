
import React, { useEffect, useRef, useState } from 'react';

/**
 * Cursore del sito: un cerchio vuoto col bordo blu.
 *
 * Il sito nasconde il puntatore nativo (`* { cursor: none }` in index.html), quindi
 * questo componente non è decorativo: se non viene montato, il puntatore sparisce.
 * Va incluso in OGNI pagina nuova.
 *
 * La misura sta vicina a quella di una freccia di sistema (~20px): un cerchio grande
 * si mangia il punto che stai indicando e diventa scomodo da usare.
 */
const CURSOR_SIZE = 20;
const CURSOR_SIZE_HOVER = 30;

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const mousePos = useRef({ x: -100, y: -100 });
  const cursorPos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Disabilita su dispositivi touch per evitare comportamenti inaspettati
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) return;

    let rafId: number;

    const animate = () => {
      // abbastanza rapido da restare sotto il dito, abbastanza morbido da non scattare
      const easing = 0.35;

      cursorPos.current.x += (mousePos.current.x - cursorPos.current.x) * easing;
      cursorPos.current.y += (mousePos.current.y - cursorPos.current.y) * easing;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${cursorPos.current.x}px, ${cursorPos.current.y}px, 0)`;
      }

      rafId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = ['A', 'BUTTON', 'INPUT', 'TEXTAREA'].includes(target.tagName) ||
                          target.closest('a') ||
                          target.closest('button') ||
                          target.getAttribute('role') === 'button';
      setIsHovering(!!isInteractive);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);

    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Impedisce il rendering su mobile
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return null;

  const size = isHovering ? CURSOR_SIZE_HOVER : CURSOR_SIZE;

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 rounded-full z-[9999] pointer-events-none"
      style={{
        width: size,
        height: size,
        margin: `${-size / 2}px 0 0 ${-size / 2}px`,
        border: '2px solid var(--accent-light)',
        background: 'transparent',
        boxShadow: '0 0 10px rgba(var(--accent-rgb),0.5)',
        transform: 'translate3d(-100px,-100px,0)',
        transition: 'width .18s ease, height .18s ease, margin .18s ease, opacity .18s ease',
        opacity: isClicking ? 0.55 : 1,
        willChange: 'transform',
        pointerEvents: 'none',
      }}
    />
  );
};

export default CustomCursor;
