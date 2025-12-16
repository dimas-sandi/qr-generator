/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        'brand-primary': '#1a2a4c',
        'brand-secondary': '#2e4a80',
        'brand-accent': '#4f8a8b',
        'brand-light': '#f7f7f7',
      },
    },
  },
  plugins: [],
}
