/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif"
        ],
      },
      colors: {
        ink: "#18242b",
        muted: "#64747d",
        aqua: "#13a6b2",
        cobalt: "#2458c8",
        amber: "#c98014",
        error: "#c2413b",
        paper: "#f6fafb"
      }
    },
  },
  plugins: [],
};
