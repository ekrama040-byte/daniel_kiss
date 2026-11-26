import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['var(--font-mono)', 'monospace'],
        display: ['var(--font-display)', 'sans-serif'],
        marker: ['var(--font-marker)', 'cursive'],
      },
      colors: {
        background: '#0D0D0D',
        foreground: '#EAEAEA',
        accent: '#E63222',
        secondary: '#161616',
        border: 'rgba(234, 234, 234, 0.14)',
        'muted-foreground': '#8A8A8A',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;