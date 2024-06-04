/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['selector', '[data-mode="dark"]'],
  content: [
    './pages/**/*.{html,js}',
    './components/**/*.{html,js,jsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
