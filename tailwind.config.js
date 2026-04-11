/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'fashion-white': '#FFFFFF',
        'fashion-black': '#000000',
        'fashion-grey': '#757575',
        'fashion-border': '#E1E1E1',
      },
      letterSpacing: {
        widest: '.2em',
      }
    },
  },
  plugins: [],
}
