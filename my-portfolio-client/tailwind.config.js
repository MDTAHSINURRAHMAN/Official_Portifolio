/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "background-color": "#292A2B",
        "red-color": "#FF014F",
        "text-color": "#C4CFDE",
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}