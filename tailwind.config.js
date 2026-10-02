/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        ink: {
          950: "rgb(var(--c-ink-950) / <alpha-value>)",
          900: "rgb(var(--c-ink-900) / <alpha-value>)",
          800: "rgb(var(--c-ink-800) / <alpha-value>)",
          700: "rgb(var(--c-ink-700) / <alpha-value>)",
          600: "rgb(var(--c-ink-600) / <alpha-value>)",
          border: "rgb(var(--c-ink-border) / <alpha-value>)",
        },
        paper: {
          100: "rgb(var(--c-paper-100) / <alpha-value>)",
          200: "rgb(var(--c-paper-200) / <alpha-value>)",
          300: "rgb(var(--c-paper-300) / <alpha-value>)",
          400: "rgb(var(--c-paper-400) / <alpha-value>)",
          500: "rgb(var(--c-paper-500) / <alpha-value>)",
        },
        signal: {
          DEFAULT: "rgb(var(--c-signal) / <alpha-value>)",
          bright: "rgb(var(--c-signal-bright) / <alpha-value>)",
          dim: "rgb(var(--c-signal-dim) / <alpha-value>)",
          50: "rgb(var(--c-signal-50) / <alpha-value>)",
        },
      },
      fontFamily: {
        display: ["\"Space Grotesk\"", "system-ui", "sans-serif"],
        body: ["\"Inter\"", "system-ui", "sans-serif"],
        mono: ["\"IBM Plex Mono\"", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      fontSize: {
        "display-xl": ["clamp(2.75rem, 5vw + 1rem, 5rem)", { lineHeight: "1.02", letterSpacing: "-0.02em" }],
        "display-lg": ["clamp(2.25rem, 3.5vw + 1rem, 3.75rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-md": ["clamp(1.75rem, 2vw + 1rem, 2.5rem)", { lineHeight: "1.1", letterSpacing: "-0.01em" }],
      },
      maxWidth: {
        content: "1180px",
      },
      borderRadius: {
        sm: "6px",
        md: "10px",
        lg: "14px",
        xl: "18px",
      },
      boxShadow: {
        subtle: "0 1px 0 0 rgba(255,255,255,0.03) inset, 0 8px 24px -12px rgba(0,0,0,var(--shadow-strength))",
        ring: "0 0 0 1px rgb(var(--c-signal) / 0.35)",
        card: "0 1px 0 0 rgba(255,255,255,0.04) inset, 0 16px 40px -20px rgba(0,0,0,var(--shadow-strength))",
        "card-hover": "0 1px 0 0 rgba(255,255,255,0.06) inset, 0 24px 60px -20px rgba(0,0,0,var(--shadow-strength))",
        glow: "0 0 0 1px rgb(var(--c-signal) / 0.4), 0 8px 30px -8px rgb(var(--c-signal) / 0.45)",
        "glow-lg": "0 0 60px -12px rgb(var(--c-signal) / 0.35)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(0.16,1,0.3,1) both",
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.16,1,0.3,1)",
      },
    },
  },
  plugins: [],
};
