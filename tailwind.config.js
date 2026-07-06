/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        dark: '#0f0f0f',
        'dark-secondary': '#1a1a1a',
        'dark-card': '#242424',
        gold: '#d4af37',
        'gold-light': '#e5c158',
        'white-primary': '#ffffff',
        'white-secondary': '#b0b0b0'
      },
      fontFamily: {
        sans: ['Segoe UI', 'Tahoma', 'Geneva', 'Verdana', 'sans-serif']
      },
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '12px',
        lg: '20px'
      }
    }
  },
  plugins: []
}