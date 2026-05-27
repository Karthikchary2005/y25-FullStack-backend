/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // We operate in a premium dark mode by default
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#030712',
          card: 'rgba(13, 17, 28, 0.7)',
          border: 'rgba(255, 255, 255, 0.08)',
          'border-glow': 'rgba(6, 180, 212, 0.2)',
          primary: '#8b5cf6', // Violet
          secondary: '#06b6d4', // Cyan
          accent: '#c084fc', // Light purple
          dark: '#090d16',
          purple: '#6d28d9',
          cyan: '#0891b2',
        },
        issue: {
          open: '#3b82f6',
          progress: '#eab308',
          resolved: '#10b981',
          closed: '#6b7280',
        },
        priority: {
          low: '#10b981',
          medium: '#eab308',
          high: '#f97316',
          critical: '#ef4444',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
      },
      boxShadow: {
        'glass-sm': '0 4px 15px 0 rgba(0, 0, 0, 0.3)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'glass-lg': '0 12px 40px 0 rgba(0, 0, 0, 0.5)',
        'glow-cyan': '0 0 15px rgba(6, 182, 212, 0.4)',
        'glow-violet': '0 0 15px rgba(139, 92, 246, 0.4)',
        'glow-green': '0 0 15px rgba(16, 185, 129, 0.4)',
        'glow-red': '0 0 15px rgba(239, 68, 68, 0.4)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'cyber-grid': 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'orbit-1': 'orbit1 25s infinite linear',
        'orbit-2': 'orbit2 30s infinite linear',
        'orbit-3': 'orbit3 35s infinite linear',
        'glitch': 'glitch 1s linear infinite',
      },
      keyframes: {
        orbit1: {
          '0%': { transform: 'rotate(0deg) translateX(80px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(80px) rotate(-360deg)' },
        },
        orbit2: {
          '0%': { transform: 'rotate(180deg) translateX(120px) rotate(-180deg)' },
          '100%': { transform: 'rotate(540deg) translateX(120px) rotate(-540deg)' },
        },
        orbit3: {
          '0%': { transform: 'rotate(270deg) translateX(160px) rotate(-270deg)' },
          '100%': { transform: 'rotate(630deg) translateX(160px) rotate(-630deg)' },
        },
      }
    },
  },
  plugins: [],
}
