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
          bg: '#000000',              // Pure black background
          'bg-secondary': '#111111',   // Very dark gray for cards
          'bg-tertiary': '#1a1a1a',   // Slightly lighter for hover states
          text: '#ffffff',            // Pure white text
          'text-secondary': '#d1d5db', // Light gray for secondary text
          'text-muted': '#9ca3af',    // Medium gray for muted text
          border: '#333333',          // Dark gray borders
          'border-light': '#222222',  // Darker borders for subtle elements
        },
        brand: {
          primary: '#3b82f6',
          'primary-dark': '#2563eb',
          secondary: '#8b5cf6',
          accent: '#06b6d4',
        }
      },
      backgroundImage: {
        'gradient-light': 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        'gradient-dark': 'linear-gradient(135deg, #000000 0%, #111111 100%)',
      }
    },
  },
  plugins: [],
}
