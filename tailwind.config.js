/** @type {import('tailwindcss').Config} */

export default {
  // darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/preline/preline.js",
  ],
  theme: {
  },
  plugins: [
    import('preline/plugin')
  ],
}

