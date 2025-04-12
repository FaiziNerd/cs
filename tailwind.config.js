/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
      },
      colors: {
        'neon-blue': '#00f7ff',
        'neon-purple': '#bc13fe',
        'dark-bg': '#050714',
      },
      boxShadow: {
        'neon': '0 0 20px var(--neon-blue)',
        'neon-purple': '0 0 20px var(--neon-purple)',
      },
    },
  },
  plugins: [],
};