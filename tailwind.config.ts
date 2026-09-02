import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        surface: {
          DEFAULT: "var(--surface)",
          raised: "var(--surface-raised)",
          border: "var(--border)",
        },
        brand: {
          text: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          muted: "var(--text-muted)",
          border: "var(--border)",
        },
        accent: "var(--accent)",
        telemetry: "var(--telemetry)",
        status: {
          success: "var(--success)",
          warning: "var(--warning)",
          danger: "var(--danger)",
        },
      },
      fontFamily: {
        serif: ["var(--font-instrument-serif)", "Georgia", "serif"],
        sans: ["var(--font-ibm-plex-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-ibm-plex-mono)", "Menlo", "monospace"],
      },
      borderRadius: {
        sm: "2px",
        DEFAULT: "4px",
        md: "6px",
      },
      boxShadow: {
        panel: "0 1px 3px 0 rgba(0, 0, 0, 0.4)",
        overlay: "0 4px 16px 0 rgba(0, 0, 0, 0.6)",
      },
    },
  },
  plugins: [],
};

export default config;
