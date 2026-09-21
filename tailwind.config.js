/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: '#F7941D',
          orangeHover: '#e07e0c',
          orangeLight: '#FFF4E5',
          dark: '#111111',
          charcoal: '#1E1E22',
          grayBg: '#F8F9FA',
          grayAlt: '#F3F4F6',
          borderLight: '#E5E7EB',
          muted: '#6B7280'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Montserrat', 'sans-serif']
      },
      boxShadow: {
        'glow-orange': '0 10px 25px -5px rgba(247, 148, 29, 0.4)',
        'card-clean': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        'card-hover': '0 12px 30px -4px rgba(247, 148, 29, 0.15)'
      }
    }
  },
  plugins: []
}
