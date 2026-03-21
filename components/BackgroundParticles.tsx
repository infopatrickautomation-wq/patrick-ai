
import React, { useEffect, useRef } from 'react';

const BackgroundParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const mouse = { x: -9999, y: -9999 };
    const onMouseMove = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    window.addEventListener('mousemove', onMouseMove);

    interface Particle {
      x: number; y: number;
      vx: number; vy: number;
      size: number;
      baseOpacity: number;
      opacity: number;
      twinkleSpeed: number;
      twinkleOffset: number;
      bright: boolean;
    }

    const COUNT = 60;
    const particles: Particle[] = [];

    for (let i = 0; i < COUNT; i++) {
      const bright = Math.random() < 0.2;
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: bright ? Math.random() * 2 + 2.5 : Math.random() * 1.5 + 0.5,
        baseOpacity: Math.random() * 0.5 + 0.3,
        opacity: 0.3,
        twinkleSpeed: Math.random() * 0.008 + 0.003,
        twinkleOffset: Math.random() * Math.PI * 2,
        bright,
      });
    }

    let frame = 0;
    let animationId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;

      for (const p of particles) {
        // Organic drift — slightly change velocity each frame
        p.vx += (Math.random() - 0.5) * 0.01;
        p.vy += (Math.random() - 0.5) * 0.01;
        // Dampen to avoid runaway speed
        p.vx *= 0.995;
        p.vy *= 0.995;

        // Mouse repulsion
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100 && dist > 0) {
          const force = (100 - dist) / 100 * 0.4;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }

        p.x += p.vx;
        p.y += p.vy;

        // Wrap edges
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;
        if (p.y < -10) p.y = canvas.height + 10;
        if (p.y > canvas.height + 10) p.y = -10;

        // Twinkle
        p.opacity = p.baseOpacity + Math.sin(frame * p.twinkleSpeed + p.twinkleOffset) * 0.25;
        p.opacity = Math.max(0.1, Math.min(0.85, p.opacity));

        // Draw
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        if (p.bright) {
          ctx.shadowBlur = 10;
          ctx.shadowColor = `rgba(255,255,255,${p.opacity})`;
        }
        ctx.fillStyle = `rgba(255,255,255,${p.opacity})`;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none opacity-80"
    />
  );
};

export default BackgroundParticles;
