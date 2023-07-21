/* eslint-disable @typescript-eslint/no-var-requires */
const colors = require('tailwindcss/colors');
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ...colors,

        // Primary
        'orange-050': 'var(--orange-050)',
        'orange-100': 'var(--orange-100)',
        'orange-200': 'var(--orange-200)',
        'orange-300': 'var(--orange-300)',
        'orange-400': 'var(--orange-400)',
        'orange-500': 'var(--orange-500)',
        'orange-600': 'var(--orange-600)',
        'orange-700': 'var(--orange-700)',
        'orange-800': 'var(--orange-800)',
        'orange-900': 'var(--orange-900)',

        'lime-green-050': 'var(--lime-green-050)',
        'lime-green-100': 'var(--lime-green-100)',
        'lime-green-200': 'var(--lime-green-200)',
        'lime-green-300': 'var(--lime-green-300)',
        'lime-green-400': 'var(--lime-green-400)',
        'lime-green-500': 'var(--lime-green-500)',
        'lime-green-600': 'var(--lime-green-600)',
        'lime-green-700': 'var(--lime-green-700)',
        'lime-green-800': 'var(--lime-green-800)',
        'lime-green-900': 'var(--lime-green-900)',

        // Neutrals
        'grey-050': 'var(--grey-050)',
        'grey-100': 'var(--grey-100)',
        'grey-200': 'var(--grey-200)',
        'grey-300': 'var(--grey-300)',
        'grey-400': 'var(--grey-400)',
        'grey-500': 'var(--grey-500)',
        'grey-600': 'var(--grey-600)',
        'grey-700': 'var(--grey-700)',
        'grey-800': 'var(--grey-800)',
        'grey-900': 'var(--grey-900)',

        // Supporting
        'light-blue-050': 'var(--light-blue-050)',
        'light-blue-100': 'var(--light-blue-100)',
        'light-blue-200': 'var(--light-blue-200)',
        'light-blue-300': 'var(--light-blue-300)',
        'light-blue-400': 'var(--light-blue-400)',
        'light-blue-500': 'var(--light-blue-500)',
        'light-blue-600': 'var(--light-blue-600)',
        'light-blue-700': 'var(--light-blue-700)',
        'light-blue-800': 'var(--light-blue-800)',
        'light-blue-900': 'var(--light-blue-900)',

        'red-050': 'var(--red-050)',
        'red-100': 'var(--red-100)',
        'red-200': 'var(--red-200)',
        'red-300': 'var(--red-300)',
        'red-400': 'var(--red-400)',
        'red-500': 'var(--red-500)',
        'red-600': 'var(--red-600)',
        'red-700': 'var(--red-700)',
        'red-800': 'var(--red-800)',
        'red-900': 'var(--red-900)',

        'yellow-050': 'var(--yellow-050)',
        'yellow-100': 'var(--yellow-100)',
        'yellow-200': 'var(--yellow-200)',
        'yellow-300': 'var(--yellow-300)',
        'yellow-400': 'var(--yellow-400)',
        'yellow-500': 'var(--yellow-500)',
        'yellow-600': 'var(--yellow-600)',
        'yellow-700': 'var(--yellow-700)',
        'yellow-800': 'var(--yellow-800)',
        'yellow-900': 'var(--yellow-900)',

        'grey-warm-050': 'hsl(22deg 60% 97%)',
        'grey-warm-100': 'hsl(22deg 50% 81%)',
        'grey-warm-200': 'hsl(22deg 20% 62%)',
        'grey-warm-300': 'hsl(22deg 30% 52%)',
        'grey-warm-400': 'hsl(22deg 30% 40%)',
        'grey-warm-500': 'hsl(22deg 39% 34%)',

        'gradient-1': 'rgb(22 12 3 / 70%)',
        'gradient-2': 'rgb(151 82 22 / 70%)',
      },
      backgroundImage: {
        'hero-pattern':
          "linear-gradient(to right top, #160c03b3, #975216b3), url('../src/assets/images/glenn-carstens-peters-RLw-UC03Gwc-unsplash.jpg')",
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [],
};
