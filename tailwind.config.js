import { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        serif: ['Cormorant Garamond', 'serif'],
      },
      colors: {
        primary: '#ec4899',
        secondary: '#be185d',
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
        '70': '280px',
        '75': '300px',
        '95': '380px',
        '130': '520px',
        '275': '1100px',
      },
      zIndex: {
        '100': '100',
      },
      backgroundImage: {
        'radial': 'radial-gradient(ellipse at 38% 38%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
} satisfies Config;