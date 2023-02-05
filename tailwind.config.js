/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#52B467',
        'primaryLight': '#DEFFDE',
        'primaryExtraLight': '#F5FFF5',
        'appPink': '#FF6270',
        'appOrange': '#FE764B',
        'appYellow': '#FFDE6A'
      },
    },
  },
  plugins: [],
}
