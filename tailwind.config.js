/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Poppins', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        navy: {
          950: '#020817',
          900: '#050c1c',
          800: '#081628',
          700: '#0d1f3c',
        },
        neon: {
          blue:   '#3b82f6',
          purple: '#8b5cf6',
          pink:   '#ec4899',
          cyan:   '#06b6d4',
        },
        glass: {
          DEFAULT: 'rgba(255,255,255,0.05)',
          light:   'rgba(255,255,255,0.08)',
          border:  'rgba(255,255,255,0.10)',
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'pulse-ring':  'pulse-ring 2.5s cubic-bezier(0.4,0,0.6,1) infinite',
        'glow-breathe':'glow-breathe 3s ease-in-out infinite alternate',
        'gold-shimmer':'gold-shimmer 4s linear infinite',
        'dot-float':   'dot-float 20s linear infinite',
        'orb-drift':   'orb-drift 18s ease-in-out infinite alternate',
        'slide-up':    'slide-up 0.5s cubic-bezier(0.16,1,0.3,1) both',
        'fade-in':     'fade-in 0.6s ease both',
        'live-ping':   'live-ping 1.4s cubic-bezier(0,0,0.2,1) infinite',
      },
      keyframes: {
        'pulse-ring': {
          '0%,100%': { transform: 'scale(1)',    opacity: '0.6' },
          '50%':      { transform: 'scale(1.12)', opacity: '0.3' },
        },
        'glow-breathe': {
          '0%':   { boxShadow: '0 0 30px rgba(139,92,246,0.3), 0 0 60px rgba(139,92,246,0.1)' },
          '100%': { boxShadow: '0 0 60px rgba(139,92,246,0.6), 0 0 100px rgba(139,92,246,0.3)' },
        },
        'gold-shimmer': {
          '0%':   { backgroundPosition: '0% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        'dot-float': {
          '0%':   { transform: 'translateY(0) translateX(0)' },
          '25%':  { transform: 'translateY(-14px) translateX(7px)' },
          '50%':  { transform: 'translateY(-7px) translateX(-9px)' },
          '75%':  { transform: 'translateY(-20px) translateX(5px)' },
          '100%': { transform: 'translateY(0) translateX(0)' },
        },
        'orb-drift': {
          '0%':   { transform: 'scale(1) translateY(0)' },
          '100%': { transform: 'scale(1.2) translateY(-30px)' },
        },
        'slide-up': {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        'live-ping': {
          '75%,100%': { transform: 'scale(2)', opacity: '0' },
        },
      },
      boxShadow: {
        'red-glow':    '0 0 30px rgba(239,68,68,0.5), 0 0 60px rgba(239,68,68,0.2)',
        'purple-glow': '0 0 40px rgba(139,92,246,0.5), 0 0 80px rgba(139,92,246,0.2)',
        'blue-glow':   '0 0 30px rgba(59,130,246,0.5), 0 0 60px rgba(59,130,246,0.2)',
        'card-hover':  '0 20px 60px rgba(0,0,0,0.5), 0 0 30px rgba(139,92,246,0.2)',
        'glass':       '0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)',
      },
    },
  },
  plugins: [],
}
