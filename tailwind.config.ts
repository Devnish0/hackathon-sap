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
<<<<<<< HEAD
      colors: {
        brand: {
          primary: "#0B5ED7",
          dark: "#0F172A",
          background: "#F8FAFC",
          surface: "#FFFFFF",
          border: "#E2E8F0",
          secondary: "#475569",
          muted: "#64748B",
          success: "#16A34A",
          warning: "#D97706",
          error: "#DC2626",
        },
      },
=======
>>>>>>> upstream/main
      borderRadius: {
        sm: "2px",
        DEFAULT: "4px",
        md: "6px",
      },
      boxShadow: {
        panel: "0 1px 3px 0 rgba(0, 0, 0, 0.08)",
        overlay: "0 4px 16px 0 rgba(0, 0, 0, 0.12)",
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
