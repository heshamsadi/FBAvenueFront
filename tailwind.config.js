/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
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
        // Custom blue colors for the project
        'main-blue': '#1B95D6',
        'dark-blue': '#0581C5',
        'lite-blue': '#E0F1FF',
        blue: {
          600: '#1B95D6',  // Main blue
          700: '#0581C5',  // Darker blue
        },
        green: {
          100: '#d1fae5',
          500: '#10b981',
          800: '#065f46',
        },
        red: {
          100: '#fee2e2',
          500: '#ef4444',
          800: '#991b1b',
        },
        yellow: {
          100: '#fef3c7',
          500: '#f59e0b',
          800: '#92400e',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      }
    },
  },
  plugins: [],
} 