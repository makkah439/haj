'use client';

import { useEffect, useRef } from 'react';
import { m, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';

export default function HeroAnimated() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { damping: 25, stiffness: 120 });
  const springY = useSpring(mouseY, { damping: 25, stiffness: 120 });
  const glowBackground = useMotionTemplate`radial-gradient(480px circle at ${springX}px ${springY}px, rgba(216,192,125,0.16), transparent 70%)`;

  useEffect(() => {
    const onMouseMove = (event: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      mouseX.set(event.clientX - rect.left);
      mouseY.set(event.clientY - rect.top);
    };
    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div ref={containerRef} className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <m.div className="absolute inset-0 hidden lg:block" style={{ background: glowBackground }} />

      <m.div
        className="absolute -right-16 -top-16 h-72 w-72 rounded-full bg-[color:var(--color-gold)]/20 blur-3xl"
        animate={{ y: [0, 18, 0], x: [0, -12, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <m.div
        className="absolute -left-10 top-1/3 h-56 w-56 rounded-full bg-white/10 blur-3xl"
        animate={{ y: [0, -20, 0], x: [0, 14, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />
      <m.div
        className="absolute bottom-0 right-1/3 h-64 w-64 rounded-full bg-[color:var(--color-gold-soft)]/10 blur-3xl"
        animate={{ y: [0, 16, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      />
    </div>
  );
}
