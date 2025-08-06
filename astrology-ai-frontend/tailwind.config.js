/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Astrology-themed color palette
        cosmic: {
          50: '#f0f4ff',
          100: '#e0e9ff',
          200: '#c7d5ff',
          300: '#a5b8ff',
          400: '#8193ff',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
        mystical: {
          50: '#fdf4ff',
          100: '#fae8ff',
          200: '#f5d0fe',
          300: '#f0abfc',
          400: '#e879f9',
          500: '#d946ef',
          600: '#c026d3',
          700: '#a21caf',
          800: '#86198f',
          900: '#701a75',
        },
        celestial: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        light: {
          bg: '#ffffff',
          'bg-secondary': '#f8fafc',
          'bg-tertiary': '#f1f5f9',
          text: '#1f2937',
          'text-secondary': '#6b7280',
          'text-muted': '#9ca3af',
          border: '#e5e7eb',
          'border-light': '#f3f4f6',
        },
        dark: {
          bg: '#0f0f23',              // Deep cosmic blue
          'bg-secondary': '#1a1a3a',   // Darker cosmic blue
          'bg-tertiary': '#2a2a4a',    // Medium cosmic blue
          text: '#ffffff',
          'text-secondary': '#e2e8f0',
          'text-muted': '#94a3b8',
          border: '#374151',
          'border-light': '#4b5563',
        },
        brand: {
          primary: '#6366f1',
          'primary-dark': '#4f46e5',
          secondary: '#d946ef',
          accent: '#3b82f6',
        }
      },
      backgroundImage: {
        'cosmic-gradient': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'mystical-gradient': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        'celestial-gradient': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        'dark-cosmic': 'linear-gradient(135deg, #0f0f23 0%, #1a1a3a 100%)',
      },
      fontFamily: {
        'cosmic': ['Inter', 'sans-serif'],
        'mystical': ['Playfair Display', 'serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'twinkle': 'twinkle 2s ease-in-out infinite alternate',
        'cosmic-pulse': 'cosmic-pulse 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        twinkle: {
          '0%': { opacity: '0.3' },
          '100%': { opacity: '1' },
        },
        'cosmic-pulse': {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.7' },
          '50%': { transform: 'scale(1.05)', opacity: '1' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
