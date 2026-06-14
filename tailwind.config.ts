import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        void: {
          DEFAULT: "#050508",
          50: "#0a0a0f",
          100: "#0f0f16",
          200: "#14141f",
        },
        aurora: {
          cyan: "#00e5ff",
          violet: "#8b5cf6",
          magenta: "#f472b6",
          amber: "#fbbf24",
        },
        surface: {
          DEFAULT: "#111118",
          elevated: "#1a1a24",
          border: "#2a2a3a",
        },
        ink: {
          primary: "#f4f4f8",
          secondary: "#a1a1b5",
          muted: "#6b6b80",
        },
      },
      fontFamily: {
        display: ["var(--font-syne)", "system-ui", "sans-serif"],
        body: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "ui-monospace", "monospace"],
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(to right, rgba(139,92,246,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(139,92,246,0.06) 1px, transparent 1px)",
        "aurora-radial":
          "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(139,92,246,0.25), transparent), radial-gradient(ellipse 60% 40% at 80% 50%, rgba(0,229,255,0.12), transparent)",
      },
      animation: {
        "pulse-glow": "pulse-glow 4s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        "spin-slow": "spin 20s linear infinite",
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
      },
      boxShadow: {
        glow: "0 0 40px rgba(139, 92, 246, 0.25)",
        "glow-cyan": "0 0 40px rgba(0, 229, 255, 0.2)",
      },
    },
  },
  plugins: [],
};

export default config;
