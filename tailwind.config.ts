import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0f4d3a',
        'primary-dark': '#0b3b2c',
        gold: '#b88a2d',
        'gold-soft': '#d8c07d',
        ivory: '#f6efe2',
        sand: '#e9dfc9',
        text: '#1f2b24',
        muted: '#637067',
        border: '#e4ddcf',
        background: '#fcfaf7',
        surface: '#ffffff'
      },
      fontFamily: {
        sans: ['var(--font-noto-kufi)', 'Tahoma', 'sans-serif']
      },
      boxShadow: {
        soft: '0 18px 45px rgba(15, 77, 58, 0.08)'
      },
      borderRadius: {
        xl2: '1.25rem'
      }
    }
  },
  plugins: []
} satisfies Config;
