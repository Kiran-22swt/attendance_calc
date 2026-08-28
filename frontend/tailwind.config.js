/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        safe: "#22c55e",
        warning: "#eab308",
        danger: "#ef4444",
      },
    },
  },
  darkMode: "class",
  plugins: [],
};