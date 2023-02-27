/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        DEFAULT: '4px 4px 10px #ccc'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}