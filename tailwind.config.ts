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
        // semantic shortcuts
        background: {
          DEFAULT: 'var(--color-background)',
          secondary: 'var(--color-surface)'
        },
        textColor: {
          primary: 'var(--color-primary)',
          secondary: 'var(--color-light)',
          muted: 'var(--color-text-muted)'
        },
        borderColor: {
          primary: 'var(--border-primary)',
          faded: 'var(--border-faded)'
        }
      },
      backgroundColor: {
        'primary-transparent': 'var(--bg-primary-transparent)'
      },
      fontFamily: {
        primary: ['Lato', 'sans-serif']
      }
    },
  },
  plugins: [],
};

export default config;
