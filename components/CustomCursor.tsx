
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

    let rafId: number;

    const animate = () => {
      const dotEasing = 0.5;
      const outlineEasing = 0.15;

      cursorPos.current.x += (mousePos.current.x - cursorPos.current.x) * dotEasing;
      cursorPos.current.y += (mousePos.current.y - cursorPos.current.y) * dotEasing;

      outlinePos.current.x += (mousePos.current.x - outlinePos.current.x) * outlineEasing;
      outlinePos.current.y += (mousePos.current.y - outlinePos.current.y) * outlineEasing;

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

  return (
    <>
      {/* Puntatore Centrale */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 w-2.5 h-2.5 rounded-full z-[9999] pointer-events-none transition-colors duration-300 ${
          isHovering ? 'bg-[#2A5C3F]' : 'bg-[#2A5C3F]'
        }`}
        style={{
          margin: '-5px 0 0 -5px',
          boxShadow: isHovering
            ? '0 0 15px rgba(42,92,63,0.6)'
            : '0 0 10px rgba(42,92,63,0.4)',
          willChange: 'transform',
          pointerEvents: 'none'
        }}
      />

      {/* Alone Fluido */}
      <div
        ref={cursorOutlineRef}
        className={`fixed top-0 left-0 rounded-full border z-[9998] pointer-events-none transition-all duration-300 ${
          isHovering
            ? 'w-14 h-14 border-[#2A5C3F]/40 bg-[#2A5C3F]/5'
            : 'w-10 h-10 border-[#2A5C3F]/20 bg-[#2A5C3F]/5'
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
