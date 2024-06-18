/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: { 
      colors : {
        textPrimary : "#555",
        textLight : "#999",
        textDark : "#222",
        bgPrimary  : "#f1f1f1"
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
],
}

