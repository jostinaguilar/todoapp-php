/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/views/*.{html,js, php}',
    './public/js/*.{html,js, php}',
    './app/**/*.php',
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
};
