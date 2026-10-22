import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        sm: "1.5rem",
        lg: "2rem",
        xl: "2.5rem",
        "2xl": "3rem",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1240px",
      },
    },
    extend: {
      colors: {
        // Core Brand Tokens
        brand: {
          navy: {
            DEFAULT: "#0B1F38",
            50: "#F0F4F8",
            100: "#D9E3ED",
            200: "#B3C7DC",
            300: "#80A3C5",
            400: "#4D80AE",
            500: "#245C91",
            600: "#16416D",
            700: "#0F2E50",
            800: "#0B1F38", // Primary Deep Navy
            900: "#071322",
            950: "#030A12",
          },
          yellow: {
            DEFAULT: "#FFC107", // Primary Warm Amber Accent
            hover: "#E5AC06",
            subtle: "#FFF8E1",
            muted: "#FFE082",
          },
          blue: {
            DEFAULT: "#1D4ED8", // Accessible High-Contrast Tech Blue
            50: "#EBF3FF",
            100: "#D6E7FF",
            hover: "#1E40AF",
            subtle: "#EBF3FF",
            muted: "#93C5FD",
          },
          green: {
            DEFAULT: "#00B87A", // Brand Green
            subtle: "#E6F8F1",
            border: "#A7F3D0",
          },
        },
        // Semantic Surfaces
        surface: {
          base: "var(--bg-primary)",       // Canvas background
          card: "var(--surface-card)",     // Primary container background
          muted: "var(--surface-muted)",   // Secondary recessed container
          elevated: "var(--surface-card)", // Modals / popovers / tooltips
          dark: "#0B1F38",                 // Deep inverted sections
          "dark-card": "#132A4A",          // Dark card surface
          "dark-muted": "#1A365D",
        },
        // Semantic Borders
        border: {
          subtle: "var(--border-color)",
          medium: "var(--border-medium)",
          strong: "#94A3B8",
          dark: "#1E3A5F",
          "dark-subtle": "#162E4C",
        },
        // Semantic Text Hierarchy
        ink: {
          DEFAULT: "var(--text-primary)",     // Primary text
          secondary: "var(--text-secondary)", // Descriptive / supporting copy
          muted: "var(--text-muted)",         // Metadata / captions / timestamps
          subtle: "#94A3B8",                  // Placeholder / inactive
          inverted: "#F8FAFC",                // White text on dark navy
          "inverted-muted": "#94A3B8",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "-apple-system", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
        heading: ["var(--font-heading)", "var(--font-sans)", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      boxShadow: {
        subtle: "0 1px 3px 0 rgba(11, 31, 56, 0.04), 0 1px 2px -1px rgba(11, 31, 56, 0.04)",
        card: "0 4px 6px -1px rgba(11, 31, 56, 0.05), 0 2px 4px -2px rgba(11, 31, 56, 0.05)",
        float: "0 10px 25px -5px rgba(11, 31, 56, 0.08), 0 8px 10px -6px rgba(11, 31, 56, 0.04)",
        elevated: "0 20px 35px -10px rgba(11, 31, 56, 0.12), 0 10px 10px -5px rgba(11, 31, 56, 0.04)",
        glow: "0 0 20px -3px rgba(255, 193, 7, 0.35)",
        "blue-glow": "0 0 20px -3px rgba(46, 128, 255, 0.35)",
      },
      borderRadius: {
        sm: "6px",
        md: "10px",
        lg: "14px",
        xl: "20px",
        "2xl": "28px",
      },
      letterSpacing: {
        tighter: "-0.04em",
        tight: "-0.02em",
        normal: "0em",
        wide: "0.02em",
        wider: "0.05em",
        widest: "0.1em",
      },
      spacing: {
        13: "3.25rem",
      },
      transitionDuration: {
        250: "250ms",
      },
      animation: {
        "pulse-subtle": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "spin-slow": "spin 25s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
