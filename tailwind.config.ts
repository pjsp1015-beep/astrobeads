import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary brand palette
        brand: {
          50:  '#f5f0ff',
          100: '#ede5ff',
          200: '#d5c0ff',
          300: '#b592ff',
          400: '#9d5fff',
          500: '#7a4fb0',  // primary purple
          600: '#5e3a8c',
          700: '#4a2a72',
          800: '#341e55',
          900: '#1a0a2e',  // near black / nav bg
          950: '#0d0518',
        },
        gold: {
          50:  '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#e8c97a',  // main gold accent
          500: '#d4a940',
          600: '#b78a20',
          700: '#926b10',
          800: '#78540c',
          900: '#633f0e',
        },
        gem: {
          ruby:     '#dc2626',
          sapphire: '#1d4ed8',
          emerald:  '#15803d',
          amethyst: '#7c3aed',
          pearl:    '#e2e8f0',
          topaz:    '#0284c7',
          coral:    '#dc2626',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-in-right': 'slideInRight 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      backgroundImage: {
        'gem-gradient': 'linear-gradient(135deg, #1a0a2e 0%, #2d1060 50%, #1a0a2e 100%)',
        'gold-shimmer': 'linear-gradient(90deg, #e8c97a, #f5e0a0, #e8c97a)',
      },
    },
  },
  plugins: [],
}

export default config
