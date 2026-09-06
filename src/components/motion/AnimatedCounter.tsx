'use client';

import { useRef, useState } from 'react';
import { useInView, useAnimationFrame } from 'framer-motion';

export default function AnimatedCounter({ value, duration = 1.4 }: { value: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const numericMatch = value.match(/^(\D*)(\d+)(\D*)$/);
  const [display, setDisplay] = useState(numericMatch ? `${numericMatch[1]}0${numericMatch[3]}` : value);
  const startRef = useRef<number | null>(null);
  const doneRef = useRef(false);

  useAnimationFrame((time) => {
    if (!isInView || !numericMatch || doneRef.current) return;
    if (startRef.current === null) startRef.current = time;
    const elapsed = (time - startRef.current) / 1000;
    const progress = Math.min(elapsed / duration, 1);
    const [, prefix, digits, suffix] = numericMatch;
    const current = Math.round(progress * Number(digits));
    setDisplay(`${prefix}${current}${suffix}`);
    if (progress >= 1) doneRef.current = true;
  });

  return <span ref={ref}>{display}</span>;
}
