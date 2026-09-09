import type { Config } from "tailwindcss";

// Airis design tokens — keep in sync with lib/constants.ts (COLORS)
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#6FB7D9",
          dark: "#4E9BC2",
          light: "#A9D3E8",
          soft: "#EAF5FA",
        },
        secondary: {
          DEFAULT: "#6FD9B0",
          dark: "#4EBE93",
          light: "#A8E6C1",
          soft: "#EAF9F2",
        },
        accent: "#A8E6C1",
        background: "#FAFCFB",
        foreground: "#2C3E42",
        muted: "#5E7278",
        placeholder: "#E6EAEB",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 10px 40px -12px rgba(44, 62, 66, 0.12)",
        card: "0 4px 24px -8px rgba(44, 62, 66, 0.10)",
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #6FB7D9 0%, #6FD9B0 100%)",
      },
      maxWidth: {
        container: "1200px",
      },
    },
  },
  plugins: [],
};

export default config;
