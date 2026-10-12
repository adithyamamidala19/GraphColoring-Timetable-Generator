/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          bg: "#FAF7F0",
          surface: "#FFFFFF",
          subtle: "#F3EFE4",
          border: "#E8E2D2",
          text: "#14201B",
          muted: "#5B6B63",
        },
        brand: {
          primary: "#10B981",
          deep: "#065F46",
          tint: "#D1FAE5",
          accent: "#059669",
        },
        slot: {
          sky: { bg: "#BAE6FD", text: "#0369A1", border: "#7DD3FC" },
          lavender: { bg: "#DDD6FE", text: "#5B21B6", border: "#C4B5FD" },
          peach: { bg: "#FED7AA", text: "#9A3412", border: "#FDBA74" },
          rose: { bg: "#FECDD3", text: "#9F1239", border: "#FDA4AF" },
          lemon: { bg: "#FEF08A", text: "#854D0E", border: "#FDE047" },
          mint: { bg: "#A7F3D0", text: "#065F46", border: "#6EE7B7" },
        },
        border: "#E8E2D2",
        background: "#FAF7F0",
        foreground: "#14201B",
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#14201B",
        },
        muted: {
          DEFAULT: "#F3EFE4",
          foreground: "#5B6B63",
        },
        primary: {
          DEFAULT: "#10B981",
          foreground: "#FFFFFF",
        },
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'sans-serif'],
        serif: ['"Instrument Serif"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        soft: "0 1px 2px rgba(20, 32, 27, 0.04), 0 12px 32px rgba(20, 32, 27, 0.06)",
        subtle: "0 1px 3px rgba(20, 32, 27, 0.05)",
        float: "0 16px 36px -4px rgba(20, 32, 27, 0.08), 0 4px 12px rgba(20, 32, 27, 0.03)",
        glass: "0 8px 30px rgba(20, 32, 27, 0.05)",
      },
      borderRadius: {
        '2xl': '20px',
        '3xl': '24px',
        '4xl': '28px',
      },
    },
  },
  plugins: [],
}
