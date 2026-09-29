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
          // The signature orange. Reads correctly on the dark sections of the
          // site (6.44:1 on #111111) and is what buttons, links and accents
          // use throughout.
          //
          // On white it is 2.93:1, just under the WCAG AA threshold, so keep
          // it off small body text sitting on a light background.
          orange: '#E07E0C',
          // Hovered / pressed state — same hue, a shade deeper.
          orangeHover: '#C56D08',
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
        'glow-orange': '0 10px 25px -5px rgba(224, 126, 12, 0.4)',
        'card-clean': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        'card-hover': '0 12px 30px -4px rgba(224, 126, 12, 0.15)'
      }
    }
  },
  plugins: []
}
