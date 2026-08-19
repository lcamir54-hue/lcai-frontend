import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./hooks/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: "var(--accent)",
        "accent-soft": "var(--accent-soft)",
        "button-dark": "var(--button-dark)",
      },
      fontFamily: {
        sans: [
          "var(--font-sans)",
          "Tahoma",
          "Segoe UI",
          "Arial",
          "sans-serif",
        ],
        serif: [
          "var(--font-serif)",
          "Tahoma",
          "serif",
        ],
      },
      boxShadow: {
        shell: "0 22px 60px rgba(72, 54, 50, 0.16), 0 2px 10px rgba(72, 54, 50, 0.08)",
        composer: "0 10px 28px rgba(55, 45, 40, 0.06)",
        menu: "0 12px 32px rgba(40, 34, 30, 0.14)",
      },
      maxWidth: {
        composer: "860px",
      },
      transitionDuration: {
        ui: "180ms",
      },
    },
  },
  plugins: [],
};

export default config;
