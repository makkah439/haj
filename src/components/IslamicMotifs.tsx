'use client';

import { m } from 'framer-motion';

type Tone = 'light' | 'dark';

const toneClass: Record<Tone, string> = {
  light: 'text-white',
  dark: 'text-[color:var(--color-primary)]'
};

const crescentPath = 'M15 3.5A8.5 8.5 0 1 0 15 20.5 10 10 0 0 1 15 3.5Z';
const starPath = 'M12 2 L14 10 L22 12 L14 14 L12 22 L10 14 L2 12 L10 10 Z';

export default function IslamicMotifs({ tone = 'dark', className = '' }: { tone?: Tone; className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${toneClass[tone]} ${className}`} aria-hidden="true">
      <m.svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="absolute -right-4 top-10 h-14 w-14 opacity-[0.12]"
        animate={{ y: [0, -14, 0], rotate: [0, 8, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      >
        <path d={crescentPath} />
      </m.svg>

      <m.svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="absolute left-6 top-1/3 h-8 w-8 opacity-[0.14]"
        animate={{ y: [0, 16, 0], rotate: [0, 25, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      >
        <path d={starPath} />
      </m.svg>

      <m.svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="absolute bottom-10 right-1/4 h-6 w-6 opacity-[0.1]"
        animate={{ y: [0, -12, 0], rotate: [0, -20, 0] }}
        transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      >
        <path d={starPath} />
      </m.svg>

      <m.svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="absolute bottom-6 left-1/4 h-10 w-10 opacity-[0.1]"
        animate={{ y: [0, 10, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
      >
        <path d={crescentPath} />
      </m.svg>
    </div>
  );
}
