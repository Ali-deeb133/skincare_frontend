import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        sans:    ['Tajawal', 'sans-serif'],
      },
      colors: {
        sakura: {
          base:   '#fdf0f5',
          light:  '#fef8fb',
          mid:    '#f8d7e8',
          deep:   '#f0aecf',
          accent: '#e07aab',
          dark:   '#c0508a',
        },
        text: {
          primary: '#2d1a28',
          muted:   '#9e6e8a',
        },
      },
      keyframes: {
        fadeSlide: {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        fadeSlide: 'fadeSlide 0.3s ease',
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
} satisfies Config;
