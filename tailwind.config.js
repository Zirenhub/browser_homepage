/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    fontFamily: {
      fira: ['Fira Code', 'Arial'],
    },
    colors: {
      transparent: 'transparent',
      background: '#282828',

      red: '#cc241d',
      red2: '#fb4934',

      green: '#98971c',
      green2: '#b8bb26',

      yellow: '#d79921',
      yellow2: '#fabd2f',

      blue: '#458588',
      blue2: '#83a598',

      purple: '#b16286',
      purple2: '#d3869b',

      aqua: '#689d6a',
      aqua2: '#8ec07c',

      gray: '#a89984',
      gray2: '#928374',

      fg: '#ebdbb2',

      white: '#f5f2e9',
      'dim-gray': '#696969',
      'dim-black': '#181818',
    },
  },
  plugins: [],
};
