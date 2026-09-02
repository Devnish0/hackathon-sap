import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        serif: ["var(--font-display)", "system-ui", "sans-serif"], // mapped to display font for instant upgrade
        sans: ["var(--font-ibm-plex-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-ibm-plex-mono)", "Menlo", "monospace"],
      },
      borderRadius: {
        sm: "2px",
        DEFAULT: "4px",
        md: "6px",
      },
      boxShadow: {
        panel: "0 1px 3px 0 rgba(0, 0, 0, 0.08)",
        overlay: "0 4px 16px 0 rgba(0, 0, 0, 0.12)",
      },
      colors: {
        brand: {
          background: "#F4F6F8",
          surface: "#FFFFFF",
          border: "#E2E8F0",
          dark: "#0F172A",
          primary: "#2563EB",
          secondary: "#475569",
          muted: "#94A3B8",
          success: "#16A34A",
        },
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["cupcake"],
    base: true,
    styled: true,
    utils: true,
    logs: false,
  },
};

export default config;
