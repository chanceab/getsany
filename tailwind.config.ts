import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary': '#08003a',
        'secondary': '#6c757d',
        'primary-light': '#1a0b5c',
        'secondary-light': '#8c9ba5',
      },
      maxWidth: {
        '1/2': '50%',
        '1/3': '33.333333%',
        '1/4': '25%',
        '3/4': '75%',
        '9/10': '90%',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-in-out',
      },
    },
  },
  plugins: [],
} satisfies Config;
