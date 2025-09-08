/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#0052cc',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#172b4d',
          DEFAULT: '#0052cc',
          light: '#4c9aff',
          dark: '#172b4d',
          accent: '#00d1b2'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif']
      },
      boxShadow: {
        soft: '0 2px 8px rgba(15, 23, 42, 0.08)',
        'soft-lg': '0 4px 16px rgba(15, 23, 42, 0.12)'
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem'
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio')
  ]
}
