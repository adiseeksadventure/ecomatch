/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#fdf2f3",
          100: "#fce7e9",
          200: "#f8ced2",
          300: "#f2a6ad",
          400: "#ea7580",
          500: "#e04856",
          600: "#cb2a39",
          700: "#aa1f2d",
          800: "#8e1d29",
          900: "#761e27",
        },
        brand: {
          start: "#e83543", // Vivid Red/Pink
          end: "#9b23a1",   // Vivid Purple
          dark: "#0f0f0f",  // Card Black
          input: "#1a1a1a", // Input Dark
        },
        nature: {
          heading: "#052F1E",
          primary: "#436850",
          sage: "#ADBC9F",
          accent: "#D2E3C8",
          bg: "#FAFAFA",
          card: "rgba(255, 255, 255, 0.8)",
        },
        secondary: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-16px)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
