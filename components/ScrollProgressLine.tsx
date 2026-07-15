import React from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

const ScrollProgressLine: React.FC = () => {
  const { scrollYProgress } = useScroll();

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  const dotTop = useTransform(scrollYProgress, [0, 1], ['0vh', '100vh']);
  const dotTopSpring = useSpring(dotTop, { stiffness: 120, damping: 30 });

  return (
    <>
      {/* Track */}
      <div
        className="fixed left-5 top-0 bottom-0 z-[300] pointer-events-none"
        style={{ width: 2, background: 'rgba(var(--accent-rgb),0.12)' }}
      />

      {/* Filled bar */}
      <motion.div
        className="fixed left-5 top-0 z-[301] pointer-events-none origin-top"
        style={{
          width: 2,
          height: '100vh',
          scaleY,
          background: 'linear-gradient(to bottom, var(--accent), var(--accent))',
          boxShadow: '0 0 8px rgba(var(--accent-rgb),0.5), 0 0 20px rgba(var(--accent-rgb),0.2)',
        }}
      />

      {/* Dot */}
      <motion.div
        className="fixed z-[302] pointer-events-none"
        style={{
          left: 15,
          top: dotTopSpring,
          translateX: '-50%',
          translateY: '-50%',
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: 'var(--accent)',
          boxShadow: '0 0 10px rgba(var(--accent-rgb),0.8), 0 0 24px rgba(var(--accent-rgb),0.4)',
        }}
      />
    </>
  );
};

export default ScrollProgressLine;
