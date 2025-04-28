const { heroui } = require("@heroui/react");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pixel: ['"Press Start 2P"', 'cursive'],
      },
      backgroundColor: {
        'pokemon-light': 'var(--pokemon-light-bg)',
        'pokemon-dark': 'var(--pokemon-dark-bg)',
      },
      colors: {
        'pokemon-red': 'var(--pokemon-red)',
        'pokemon-blue': 'var(--pokemon-blue)',
        'pokemon-yellow': 'var(--pokemon-yellow)',
        'pokemon-green': 'var(--pokemon-green)',
      },
      borderWidth: {
        'pixel': 'var(--pixel-size)',
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
};
