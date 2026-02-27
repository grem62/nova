/** @type {import("tailwindcss").Config} */
const config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        /* ── Bleu nuit (logo fond) + Jaune vif (logo étoile) ── */
        "scene-bg":      "#020818",  /* Bleu nuit profond */
        "nova-navy":     "#040e1e",  /* Navy foncé */
        "nova-surface":  "#061224",  /* Cartes */
        "nova-surface-2":"#0a1a30",  /* Cartes secondaires */
        "nova-yellow":   "#EEFF00",  /* Jaune vif logo */
        "nova-text":     "#e8f0ff",  /* Blanc bleuté */
        "nova-text-2":   "#6b87b0",  /* Gris-bleu */
        "nova-text-3":   "#2d4060",  /* Gris-bleu foncé */
        "nova-border":   "rgba(238,255,0,0.10)",
      },
      fontFamily: {
        display: [
          "-apple-system", "BlinkMacSystemFont",
          "SF Pro Display", "SF Pro Text",
          "Inter", "system-ui", "sans-serif"
        ]
      },
      fontSize: {
        "display-xl": ["clamp(3.5rem,9vw,7rem)",   { lineHeight:"0.96", letterSpacing:"-0.04em" }],
        "display-lg": ["clamp(2.8rem,7vw,5.5rem)", { lineHeight:"1.02", letterSpacing:"-0.03em" }],
        "display-md": ["clamp(2rem,4.5vw,3.5rem)", { lineHeight:"1.06", letterSpacing:"-0.025em"}],
        "display-sm": ["clamp(1.4rem,3vw,2rem)",   { lineHeight:"1.1",  letterSpacing:"-0.02em" }]
      },
      boxShadow: {
        "glow-y":     "0 0 60px rgba(238,255,0,0.45)",
        "glow-y-sm":  "0 0 24px rgba(238,255,0,0.30)",
        "card":       "0 1px 0 rgba(238,255,0,0.04) inset, 0 20px 60px rgba(0,0,0,0.7)",
        "card-hover": "0 1px 0 rgba(238,255,0,0.08) inset, 0 24px 64px rgba(0,0,0,0.8), 0 0 0 1px rgba(238,255,0,0.20)",
      },
      keyframes: {
        "fade-up": {
          "0%":   { opacity:"0", transform:"translateY(24px)" },
          "100%": { opacity:"1", transform:"translateY(0)"    }
        },
        "pulse-y": {
          "0%, 100%": { boxShadow:"0 0 0 0 rgba(238,255,0,0.5)"  },
          "50%":      { boxShadow:"0 0 0 6px rgba(238,255,0,0)"  }
        },
        "float": {
          "0%, 100%": { transform:"translateY(0)"   },
          "50%":      { transform:"translateY(-8px)"}
        },
        "shimmer": {
          "0%":   { transform:"translateX(-120%) skewX(-12deg)" },
          "100%": { transform:"translateX(220%) skewX(-12deg)"  }
        }
      },
      animation: {
        "fade-up":  "fade-up 0.8s cubic-bezier(0.22,1,0.36,1) both",
        "pulse-y":  "pulse-y 2s ease-in-out infinite",
        "float":    "float 3s ease-in-out infinite",
        "shimmer":  "shimmer 1.8s ease-in-out infinite"
      }
    }
  },
  plugins: []
};

export default config;
