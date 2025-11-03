// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#39B54A',
          light: 'rgba(196, 233, 201, 0.37)',
          light1: '#C4E9C9',
          light2: '#C4E9C9',
          light3: '#88D392',
          light4: '#61C46E',
          dark: '#2E913B',
          dark2: '#1D5B25',
        },
        secondary: {
          DEFAULT: '#215BB8',
          light1: '#D3DEF1',
          light2: '#7A9DD4',
          light3: '#376BBF',
          dark1: '#1A4993',
          dark2: '#14376E',
          dark3: '#0D244A',
        },
      },
    },
  },
  plugins: [],
}
