/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./app/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          peach: {
            50: '#FFF5F5',
            100: '#FFE8E8',
            200: '#FFD5D5',
            300: '#FFB8B8',
            400: '#FF8A8A',
            500: '#FF6B6B',
            600: '#F83B3B',
            700: '#E51D1D',
            800: '#C11414',
            900: '#A01414',
          },
        }
      }
    },
    plugins: [],
  }