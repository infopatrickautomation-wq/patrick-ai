
import React, { useEffect, useRef, useState } from 'react';

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorOutlineRef = useRef<HTMLDivElement>(null);
  
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  
  const mousePos = useRef({ x: 0, y: 0 });
  const cursorPos = useRef({ x: 0, y: 0 });
  const outlinePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Disabilita su dispositivi touch per evitare comportamenti inaspettati
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) return;

    // Forza la sparizione del cursore nativo a livello globale
    document.documentElement.style.cursor = 'none';
    document.body.style.cursor = 'none';

    let rafId: number;

    const animate = () => {
      // Easing: il puntatore principale (dot) ha un valore più alto (0.5) per una precisione chirurgica e zero lag percepito.
      // L'alone (outline) ha un valore più basso (0.15) per mantenere l'effetto "fluido e oleoso" richiesto.
      const dotEasing = 0.5;
      const outlineEasing = 0.15;

      cursorPos.current.x += (mousePos.current.x - cursorPos.current.x) * dotEasing;
      cursorPos.current.y += (mousePos.current.y - cursorPos.current.y) * dotEasing;
      
      outlinePos.current.x += (mousePos.current.x - outlinePos.current.x) * outlineEasing;
      outlinePos.current.y += (mousePos.current.y - outlinePos.current.y) * outlineEasing;

      // Utilizzo di translate3d per attivare l'accelerazione hardware della GPU
      // Questo rende il movimento estremamente liscio e previene il tearing
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${cursorPos.current.x}px, ${cursorPos.current.y}px, 0)`;
      }
      if (cursorOutlineRef.current) {
        cursorOutlineRef.current.style.transform = `translate3d(${outlinePos.current.x}px, ${outlinePos.current.y}px, 0)`;
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

    // Listener ottimizzati con passive: true dove possibile
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);

    // Avvio del loop di animazione a 60fps
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(rafId);
      document.documentElement.style.cursor = 'auto';
      document.body.style.cursor = 'auto';
    };
  }, []);

  // Impedisce il rendering su mobile
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return null;

  return (
    <>
      {/* Puntatore Centrale - Reattivo e istantaneo */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 w-2.5 h-2.5 rounded-full z-[9999] pointer-events-none transition-colors duration-300 ${
          isHovering ? 'bg-[#0066FF]' : 'bg-blue-600'
        }`}
        style={{
          margin: '-5px 0 0 -5px',
          boxShadow: isHovering 
            ? '0 0 15px rgba(0,102,255,0.8)' 
            : '0 0 15px rgba(37,99,235,0.8)',
          willChange: 'transform',
          pointerEvents: 'none' // CRITICO: non blocca i click sottostanti
        }}
      />
      
      {/* Alone Fluido (Glow Outline) - Effetto oleoso e morbido */}
      <div
        ref={cursorOutlineRef}
        className={`fixed top-0 left-0 rounded-full border z-[9998] pointer-events-none transition-all duration-300 ${
          isHovering 
            ? 'w-14 h-14 border-[#0066FF]/40 bg-[#0066FF]/5' 
            : 'w-10 h-10 border-blue-600/20 bg-blue-600/5'
        } ${isClicking ? 'scale-75 opacity-50' : 'scale-100 opacity-100'}`}
        style={{
          margin: isHovering ? '-28px 0 0 -28px' : '-20px 0 0 -20px',
          willChange: 'transform',
          backdropFilter: isHovering ? 'blur(1px)' : 'none',
          pointerEvents: 'none'
        }}
      />
    </>
  );
};

export default CustomCursor;
