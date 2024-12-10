/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
const withMT = require('@material-tailwind/react/utils/withMT');

export default withMT({
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    'node_modules/daisyui/dist/**/*.js',
    'node_modules/react-daisyui/dist/**/*.js',
    'node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}',
    'node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}',
  ],
  daisyui: {
    themes: false,
  },
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        adelia: ['ADELIA', 'cursive'],
        jakarta: ['Plus Jakarta Sans'],
        montserrat: ['montserrat'],
      },
      screens: {
        xxs: { min: '0px', max: '480px' },
        xs: { min: '481px', max: '745px' },
        ...defaultTheme.screens,
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('daisyui'),
    require('tailwind-scrollbar'),
  ],
});
