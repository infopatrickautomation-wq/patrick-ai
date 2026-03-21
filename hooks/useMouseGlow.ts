import { useRef } from 'react';
import React from 'react';

export function useMouseGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const glow = glowRef.current;
    if (!glow) return;
    const rect = e.currentTarget.getBoundingClientRect();
    glow.style.left = `${e.clientX - rect.left - 300}px`;
    glow.style.top = `${e.clientY - rect.top - 300}px`;
    glow.style.opacity = '1';
  };

  const onMouseLeave = () => {
    if (glowRef.current) glowRef.current.style.opacity = '0';
  };

  return { glowRef, onMouseMove, onMouseLeave };
}

export function useMouseGlowArray(count: number) {
  const glowRefs = useRef<(HTMLDivElement | null)[]>(Array(count).fill(null));

  const onMouseMove = (i: number) => (e: React.MouseEvent<HTMLElement>) => {
    const glow = glowRefs.current[i];
    if (!glow) return;
    const rect = e.currentTarget.getBoundingClientRect();
    glow.style.left = `${e.clientX - rect.left - 300}px`;
    glow.style.top = `${e.clientY - rect.top - 300}px`;
    glow.style.opacity = '1';
  };

  const onMouseLeave = (i: number) => () => {
    const glow = glowRefs.current[i];
    if (glow) glow.style.opacity = '0';
  };

  return { glowRefs, onMouseMove, onMouseLeave };
}

export const glowDivStyle: React.CSSProperties = {
  position: 'absolute',
  width: '600px',
  height: '600px',
  borderRadius: '50%',
  background: 'radial-gradient(circle, rgba(0,102,255,0.15) 0%, transparent 60%)',
  opacity: 0,
  pointerEvents: 'none',
  transition: 'opacity 0.3s ease',
  zIndex: 0,
};
