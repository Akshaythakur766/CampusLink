/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "selector",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        text: "#0c1907",
        background: "#eff9e9",
        primary: "#5bcc19",
        secondary: "#224c83",
        accent: "#6c43cf",
      },
      fontWeight:{
        '500':'500',
        '600':'600'
      },

      fontFamily: {
        font1: ["Scripto"],
        font2: ["Scripto2"],
        font3: ["Scripto3"],
      },
    },
  },
  plugins: [],
};
