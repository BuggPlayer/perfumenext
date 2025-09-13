import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: 'var(--primary-50)',
          100: 'var(--primary-100)',
          200: 'var(--primary-200)',
          300: 'var(--primary-300)',
          400: 'var(--primary-400)',
          500: 'var(--primary-500)',
          600: 'var(--primary-600)',
          700: 'var(--primary-700)',
          800: 'var(--primary-800)',
          900: 'var(--primary-900)',
          950: 'var(--primary-950)',
        },
        // Secondary neutral palette (blues/graphite scale)
        secondary: {
          50: 'var(--secondary-50)',
          100: 'var(--secondary-100)',
          200: 'var(--secondary-200)',
          300: 'var(--secondary-300)',
          400: 'var(--secondary-400)',
          500: 'var(--secondary-500)',
          600: 'var(--secondary-600)',
          700: 'var(--secondary-700)',
          800: 'var(--secondary-800)',
          900: 'var(--secondary-900)',
          950: 'var(--secondary-950)',
        },
        // Accent palette for highlights (purples by default)
        accent: {
          50: 'var(--accent-50)',
          100: 'var(--accent-100)',
          200: 'var(--accent-200)',
          300: 'var(--accent-300)',
          400: 'var(--accent-400)',
          500: 'var(--accent-500)',
          600: 'var(--accent-600)',
          700: 'var(--accent-700)',
          800: 'var(--accent-800)',
          900: 'var(--accent-900)',
          950: 'var(--accent-950)',
        },
        // Dark grayscale (for dark sections/overlays)
        dark: {
          50: 'var(--dark-50)',
          100: 'var(--dark-100)',
          200: 'var(--dark-200)',
          300: 'var(--dark-300)',
          400: 'var(--dark-400)',
          500: 'var(--dark-500)',
          600: 'var(--dark-600)',
          700: 'var(--dark-700)',
          800: 'var(--dark-800)',
          900: 'var(--dark-900)',
          950: 'var(--dark-950)',
        },
        // semantic shortcuts
        background: {
          DEFAULT: 'var(--color-background)',
          secondary: 'var(--color-surface)'
        },
        // global semantic tokens (usable with bg-*, text-*, border-*)
        canvas: 'var(--bg-canvas)',
        surface: 'var(--bg-surface)',
        muted: 'var(--bg-muted)',
        elevated: 'var(--bg-elevated)',
        inverse: 'var(--text-inverse)',
        faded: 'var(--border-faded)',
        default: 'var(--border-default)',
        'primary-transparent': 'var(--bg-primary-transparent)'
      },
      // Tailwind v4 reads colors for bg/text/border utilities; keep additional roles via ringColor below
      
      ringColor: {
        DEFAULT: 'var(--ring-color)'
      },
      // Typography utilities mapped to CSS variables from next/font in layout.tsx
      // Usage:
      //  - Apply `font-heading` to headings and hero titles
      //  - Apply `font-body` to paragraphs and UI; body already defaults to this
      fontFamily: {
        heading: ['var(--font-heading)', 'serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
        primary: ['var(--font-body)', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
};

export default config;
