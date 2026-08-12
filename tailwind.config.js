/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        /* Semantic tokens — resolved from CSS variables in index.css so the
           entire UI re-themes (dark <-> light) without per-component variants. */
        canvas: 'rgb(var(--c-canvas) / <alpha-value>)',
        panel: 'rgb(var(--c-panel) / <alpha-value>)',
        raised: 'rgb(var(--c-raised) / <alpha-value>)',
        line: 'rgb(var(--c-line) / <alpha-value>)',
        ink: 'rgb(var(--c-ink) / <alpha-value>)',
        muted: 'rgb(var(--c-muted) / <alpha-value>)',
        faint: 'rgb(var(--c-faint) / <alpha-value>)',
        /* Theme-aware accent: cyanic-600 in light (cyanic-400 is ~1.6:1 on
           white), cyanic-400 in dark. Prefer this over a literal cyanic-400
           for text and small UI. */
        accent: 'rgb(var(--c-accent) / <alpha-value>)',

        /* Brand — sampled from the logo PNG itself, not eyeballed. The wordmark
           is a gradient from #0059FD (its single most common pixel colour) up
           to #00C9FD at the cyan end. */
        brand: {
          50: '#E8F1FF',
          100: '#CFE3FF',
          200: '#9FC6FF',
          300: '#5CA5FF',
          400: '#0086FD',
          500: '#0059FD',
          600: '#0047CC',
          700: '#003A9E',
          800: '#00307D',
          900: '#042A63',
        },
        cyanic: {
          300: '#6EDCFF',
          400: '#00C9FD',
          500: '#00A7FD',
          600: '#0086D6',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        glow: '0 0 0 1px rgb(var(--c-line) / 1), 0 24px 60px -24px rgba(27, 114, 245, 0.45)',
        'glow-lg': '0 30px 90px -30px rgba(6, 182, 212, 0.5)',
        lift: '0 20px 50px -25px rgb(var(--c-line) / 0.35)',
        tile: 'var(--shadow-tile)',
        'tile-hover': 'var(--shadow-tile-hover)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'brand-gradient': 'linear-gradient(120deg, #1B72F5 0%, #06B6D4 55%, #3B9CFF 100%)',
        grid: 'var(--grid-image)',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        'float-slow': {
          '0%,100%': { transform: 'translate3d(0,0,0)' },
          '50%': { transform: 'translate3d(0,-24px,0)' },
        },
        drift: {
          '0%': { transform: 'translate3d(0,0,0) scale(1)' },
          '33%': { transform: 'translate3d(4%,-6%,0) scale(1.08)' },
          '66%': { transform: 'translate3d(-5%,4%,0) scale(0.96)' },
          '100%': { transform: 'translate3d(0,0,0) scale(1)' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'gradient-pan': {
          '0%,100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.85)', opacity: '0.7' },
          '100%': { transform: 'scale(1.6)', opacity: '0' },
        },
        'dash-flow': {
          to: { strokeDashoffset: '-1000' },
        },
        'scan-line': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(400%)' },
        },
        'spin-slow': {
          to: { transform: 'rotate(360deg)' },
        },
        /* Ambient decoration loops. `drift` is tuned for 40rem blurred halos —
           on a 120px shape it moves ~5px, so small shapes need their own. */
        'sway-x': {
          '0%,100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(50px)' },
        },
        'sway-y': {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-30px)' },
        },
        /* Distinct from `pulse-ring` (a 2.4s status dot that only decays):
           this is a slow breathing ring that fades in before it fades out. */
        ripple: {
          '0%': { transform: 'scale(1)', opacity: '0' },
          '50%': { transform: 'scale(1.4)', opacity: '0.4' },
          '100%': { transform: 'scale(1.8)', opacity: '0' },
        },
        swing: {
          '0%,100%': { transform: 'rotate(-6deg)' },
          '50%': { transform: 'rotate(6deg)' },
        },
        morph: {
          '0%,100%': { borderRadius: '42% 58% 63% 37% / 41% 44% 56% 59%' },
          '50%': { borderRadius: '58% 42% 33% 67% / 62% 36% 64% 38%' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float-slow 11s ease-in-out infinite',
        drift: 'drift 22s ease-in-out infinite',
        marquee: 'marquee var(--marquee-duration, 38s) linear infinite',
        shimmer: 'shimmer 2.8s linear infinite',
        'gradient-pan': 'gradient-pan 7s ease infinite',
        'pulse-ring': 'pulse-ring 2.4s cubic-bezier(0.24,0,0.38,1) infinite',
        'dash-flow': 'dash-flow 14s linear infinite',
        'scan-line': 'scan-line 5s linear infinite',
        'spin-slow': 'spin-slow 26s linear infinite',
        'sway-x': 'sway-x 8s ease-in-out infinite',
        'sway-y': 'sway-y 7s ease-in-out infinite',
        ripple: 'ripple 5s ease-in-out infinite',
        'ripple-slow': 'ripple 5s ease-in-out 2.5s infinite',
        swing: 'swing 5s ease-in-out infinite',
        morph: 'morph 8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
