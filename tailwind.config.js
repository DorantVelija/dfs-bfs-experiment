/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    extend: {
      colors:{
        customGreen:{
          main: "#1b5d00",
          main2: "#237101",
        }
      },
      fontFamily:{
        mono: ["Nanum Gothic Coding", 'monospace']
      }
    },
  },
  plugins: [],
}