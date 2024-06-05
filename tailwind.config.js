/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {},
    fontFamily: {
      'sans': ['Open Sans', 'sans-serif'],
      'serif': ['Lato', 'serif'],
      'inter':["Inter","sans-serif"],
      'segoe' : ["Segoe Ui","sans-serif"],
      'outfit':["Outfit","sans-serif"]
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

