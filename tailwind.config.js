/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'olive': {
          700: '#808000',
        },
        'purple': {
          800: '#800080',
          900: '#660066',
        },
      },
    },
  },
  plugins: [],
};