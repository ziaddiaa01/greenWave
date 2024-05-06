/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    './src/**/*.html',
    './node_modules/flowbite/**/*.js',
  ],
  theme: {
    fontFamily: {
      'poppins': ['Poppins', 'sans-serif'], // Add other font families as needed
    },
    extend: {
      colors: {
        customRed: '#D9504A',
        customGrey: '#999990',
        customFontColor:'#4D4D4D',
        customGreen:'#00b207',
        customGreenTwo:'#2DA884',
        customOrange:'#FF7426'
      },
    },
  },
  plugins: [],
}