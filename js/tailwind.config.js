/**
 * Tailwind Configuration for Arlann Design System
 * Defines colors, typography scale, spacing, and border radius tokens.
 */
tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "secondary-container": "#dae2fd",
        "on-tertiary": "#ffffff",
        "tertiary-container": "#94aeff",
        "inverse-primary": "#7bd0ff",
        "on-error-container": "#93000a",
        "surface-dim": "#cbdbf5",
        "surface": "#f8f9ff",
        "on-surface": "#0b1c30",
        "on-surface-variant": "#3e484f",
        "on-secondary-fixed-variant": "#3f465c",
        "primary-container": "#38bdf8",
        "inverse-surface": "#213145",
        "secondary-fixed": "#dae2fd",
        "tertiary-fixed": "#dbe1ff",
        "inverse-on-surface": "#eaf1ff",
        "on-tertiary-fixed": "#00174b",
        "tertiary": "#0053db",
        "surface-container-low": "#eff4ff",
        "on-secondary": "#ffffff",
        "on-primary-fixed": "#001e2c",
        "primary": "#00668a",
        "surface-variant": "#d3e4fe",
        "on-tertiary-container": "#003ba1",
        "primary-fixed": "#c4e7ff",
        "on-tertiary-fixed-variant": "#003ea8",
        "background": "#f8f9ff",
        "on-secondary-container": "#5c647a",
        "outline-variant": "#bdc8d1",
        "primary-fixed-dim": "#7bd0ff",
        "secondary": "#565e74",
        "surface-container-lowest": "#ffffff",
        "surface-tint": "#00668a",
        "tertiary-fixed-dim": "#b4c5ff",
        "error": "#ba1a1a",
        "secondary-fixed-dim": "#bec6e0",
        "surface-container-high": "#dce9ff",
        "surface-container-highest": "#d3e4fe",
        "surface-bright": "#f8f9ff",
        "error-container": "#ffdad6",
        "on-primary": "#ffffff",
        "on-primary-fixed-variant": "#004c69",
        "on-primary-container": "#004965",
        "outline": "#6e7980",
        "on-error": "#ffffff",
        "on-secondary-fixed": "#131b2e",
        "on-background": "#0b1c30",
        "surface-container": "#e5eeff"
      },
      borderRadius: {
        "DEFAULT": "0.125rem",
        "lg": "0.25rem",
        "xl": "0.5rem",
        "full": "0.75rem"
      },
      spacing: {
        "gutter-mobile": "1rem",
        "space-sm": "0.5rem",
        "gutter": "1.5rem",
        "space-xl": "3rem",
        "space-lg": "1.75rem",
        "space-xs": "0.25rem",
        "margin": "3rem",
        "margin-mobile": "1.25rem",
        "space-md": "1rem"
      },
      fontFamily: {
        "headline-sm": ["Newsreader", "serif"],
        "body-md": ["Hanken Grotesk", "sans-serif"],
        "label-sm": ["Hanken Grotesk", "sans-serif"],
        "label-md": ["Hanken Grotesk", "sans-serif"],
        "body-sm": ["Hanken Grotesk", "sans-serif"],
        "display-lg": ["Newsreader", "serif"],
        "headline-lg-mobile": ["Newsreader", "serif"],
        "headline-lg": ["Newsreader", "serif"],
        "display-lg-mobile": ["Newsreader", "serif"],
        "title-md": ["Hanken Grotesk", "sans-serif"],
        "body-lg": ["Hanken Grotesk", "sans-serif"],
        "headline-md": ["Newsreader", "serif"]
      },
      fontSize: {
        "headline-sm": ["22px", { lineHeight: "30px", letterSpacing: "-0.005em", fontWeight: "500" }],
        "body-md": ["16px", { lineHeight: "26px", letterSpacing: "0em", fontWeight: "400" }],
        "label-sm": ["11px", { lineHeight: "16px", letterSpacing: "0.06em", fontWeight: "600" }],
        "label-md": ["13px", { lineHeight: "18px", letterSpacing: "0.04em", fontWeight: "600" }],
        "body-sm": ["14px", { lineHeight: "22px", letterSpacing: "0.005em", fontWeight: "400" }],
        "display-lg": ["56px", { lineHeight: "64px", letterSpacing: "-0.02em", fontWeight: "400" }],
        "headline-lg-mobile": ["30px", { lineHeight: "38px", letterSpacing: "-0.01em", fontWeight: "400" }],
        "headline-lg": ["40px", { lineHeight: "48px", letterSpacing: "-0.015em", fontWeight: "400" }],
        "display-lg-mobile": ["38px", { lineHeight: "46px", letterSpacing: "-0.015em", fontWeight: "400" }],
        "title-md": ["18px", { lineHeight: "26px", letterSpacing: "-0.005em", fontWeight: "600" }],
        "body-lg": ["18px", { lineHeight: "30px", letterSpacing: "0em", fontWeight: "400" }],
        "headline-md": ["28px", { lineHeight: "36px", letterSpacing: "-0.01em", fontWeight: "500" }]
      }
    }
  }
};
