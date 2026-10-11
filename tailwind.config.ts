import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        serif: ['Cormorant Garamond', 'serif'],
        display: ['"Playfair Display"', 'serif'],
      },
      colors: {
        // Home page, navbar and footer
        primary: {
          DEFAULT: '#ec4899',
          dark: '#db2777',
          light: '#f9a8d4',
          blush: '#f8bbd9',
          soft: '#fce4ec',
        },
        secondary: '#be185d',
        plum: {
          DEFAULT: '#1a0a14',
          soft: '#6b4c63',
          muted: '#9d6b8e',
        },
        // Search, product, cart and chat
        sakura: {
          base: '#fdf0f5',
          light: '#fef8fb',
          mid: '#f8d7e8',
          deep: '#f0aecf',
          accent: '#e07aab',
          dark: '#c0508a',
          muted: '#9e6e8a',
          ink: '#2d1a28',
        },
      },
      spacing: {
        '0.75': '3px',
        '1.75': '7px',
        '2.75': '11px',
        '3.5': '14px',
        '4.5': '18px',
        '5.5': '22px',
        '6.5': '26px',
        '7.5': '30px',
        '9.5': '38px',
        '11.5': '46px',
        '12.5': '50px',
        '13': '52px',
        '13.5': '54px',
        '15': '60px',
        '25': '100px',
        '30': '120px',
        '35': '140px',
        '50': '200px',
        '70': '280px',
        '75': '300px',
        '95': '380px',
        '130': '520px',
        '275': '1100px',
      },
      opacity: {
        '18': '0.18',
        '72': '0.72',
        '92': '0.92',
      },
      transitionDuration: {
        '250': '250ms',
        '400': '400ms',
      },
      zIndex: {
        '100': '100',
      },
      backgroundImage: {
        radial: 'radial-gradient(ellipse at 38% 38%, var(--tw-gradient-stops))',
      },
      keyframes: {
        fadeSlide: {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0.95)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        fadeScaleIn: {
          from: { opacity: '0', transform: 'scale(0.95)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      animation: {
        fadeSlide: 'fadeSlide 0.3s ease both',
        fadeIn: 'fadeIn 0.4s ease both',
        slideUp: 'slideUp 0.3s ease both',
        scaleIn: 'scaleIn 0.2s ease both',
        float: 'float 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
} satisfies Config;
