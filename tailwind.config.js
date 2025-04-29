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
      colors: {
        'pokemon-red': 'var(--pokemon-red)',
        'pokemon-blue': 'var(--pokemon-blue)',
        'pokemon-yellow': 'var(--pokemon-yellow)',
        'pokemon-green': 'var(--pokemon-green)',

        // Light theme colors
        'light-bg': 'var(--pokemon-light-bg)',
        'light-container': 'var(--pokemon-light-container)',
        'light-border': 'var(--pokemon-light-border)',
        'light-text': 'var(--pokemon-light-text)',
        'light-card': 'var(--pokemon-light-card)',
        'light-highlight': 'var(--pokemon-light-highlight)',
        'light-primary': 'var(--pokemon-light-primary)',
        'light-secondary': 'var(--pokemon-light-secondary)',
        'light-success': 'var(--pokemon-light-success)',
        'light-danger': 'var(--pokemon-light-danger)',
        'light-warning': 'var(--pokemon-light-warning)',

        // Dark theme colors
        'dark-bg': 'var(--pokemon-dark-bg)',
        'dark-container': 'var(--pokemon-dark-container)',
        'dark-border': 'var(--pokemon-dark-border)',
        'dark-text': 'var(--pokemon-dark-text)',
        'dark-card': 'var(--pokemon-dark-card)',
        'dark-secondary-card': 'var(--pokemon-dark-secondary-card)',
        'dark-highlight': 'var(--pokemon-dark-highlight)',
        'dark-primary': 'var(--pokemon-dark-primary)',
        'dark-secondary': 'var(--pokemon-dark-secondary)',
        'dark-success': 'var(--pokemon-dark-success)',
        'dark-danger': 'var(--pokemon-dark-danger)',
        'dark-warning': 'var(--pokemon-dark-warning)',
      },
      borderWidth: {
        'pixel': 'var(--pixel-size)',
        'pixel-2': 'calc(var(--pixel-size) * 2)',
      },
      spacing: {
        'pixel': 'var(--pixel-size)',
        'pixel-2': 'calc(var(--pixel-size) * 2)',
      },
      boxShadow: {
        'pixel': 'var(--pixel-size) var(--pixel-size) 0 0 rgba(0, 0, 0, 0.5), calc(var(--pixel-size) * 2) calc(var(--pixel-size) * 2) 0 0 rgba(0, 0, 0, 0.3)',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        'pokeball-shake': {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '20%': { transform: 'rotate(-10deg)' },
          '40%': { transform: 'rotate(10deg)' },
          '60%': { transform: 'rotate(-5deg)' },
          '80%': { transform: 'rotate(5deg)' },
        },
        'pokeball-click': {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      animation: {
        blink: 'blink 1s infinite',
        'pokeball-shake': 'pokeball-shake 0.8s ease-in-out',
        'pokeball-click': 'pokeball-click 0.2s ease-in-out',
      },
    },
  },
  darkMode: "class",
  plugins: [
    heroui(),
    function({ addComponents, theme }) {
      addComponents({
        '.pixel-corners': {
          clipPath: `polygon(
            0% var(--pixel-size),
            var(--pixel-size) 0%,
            calc(100% - var(--pixel-size)) 0%,
            100% var(--pixel-size),
            100% calc(100% - var(--pixel-size)),
            calc(100% - var(--pixel-size)) 100%,
            var(--pixel-size) 100%,
            0% calc(100% - var(--pixel-size))
          )`,
        },
        '.type-matched': {
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
            backgroundColor: 'var(--pokemon-green)',
            opacity: '0.3',
            pointerEvents: 'none',
          }
        }
      })
    }
  ],
};
