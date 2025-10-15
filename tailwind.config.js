/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        neo: {
          bg: "#0b1020",
          panel: "rgba(17, 24, 39, .65)",
          edge: "rgba(99,102,241,.35)",
          glow: "#7c3aed"
        }
      },
      boxShadow: {
        glow: "0 10px 30px -10px rgba(99,102,241,.45), 0 0 0 1px rgba(99,102,241,.35)",
        card: "0 12px 28px -16px rgba(2,6,23,.45)"
      }
    }
  },
  plugins: []
};
