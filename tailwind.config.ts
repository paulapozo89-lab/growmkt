import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        coral: { DEFAULT: '#E5526C', dark: '#C44B5E' },
        cyan: { DEFAULT: '#2BAECC', dark: '#239AB5' },
        blue: { DEFAULT: '#2F95EA', dark: '#2A84D1' },
        surface: {
          DEFAULT: '#050508',
          50: '#08080D',
          100: '#0C0C14',
          200: '#111119',
          300: '#181822',
          400: '#1F1F2C',
          500: '#282836',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 8s ease-in-out 2s infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 8s ease infinite',
        'fade-up': 'fade-up 0.8s ease forwards',
        'fade-up-delayed': 'fade-up 0.8s ease 0.15s forwards',
        'slide-in-left': 'slide-in-left 0.8s ease forwards',
        'counter': 'counter 2s ease-out forwards',
      },
      keyframes: {
        'float': {
          '0%, 100%': { transform: 'translateY(0px) scale(1)' },
          '50%': { transform: 'translateY(-20px) scale(1.02)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in-left': {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      backgroundSize: {
        '200%': '200% 200%',
      },
    },
  },
  plugins: [],
}

export default config
