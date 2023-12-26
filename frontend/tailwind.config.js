/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        merriweather: ['Merriweather', 'serif'],
        worksans: ['Work Sans', 'sans-serif']
      },
      colors: {
        'logo-blue': '#2166AB',
        'logo-blue-4': '#2166AB',
        'logo-blue-3': '#2980D6',
        'logo-blue-2': '#5499DE',
        'logo-blue-1': '#7FB2E6',
        'logo-blue-0': '#A9CCEE'
      },
    },
  },
  plugins: [],
}