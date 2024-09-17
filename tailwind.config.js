// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export const content = [
  "./src/**/*.{js,jsx,ts,tsx}",
]
export const theme = {
  extend: {
    colors: {
      primary: '#000000',
      secondary: '#800000',
    },
  },
}
export const plugins = [
  require('daisyui'),
  require('@tailwindcss/line-clamp'),
]
