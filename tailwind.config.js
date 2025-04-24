/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'skin': {
          'yellow': '#FFD700', // Vibrant lemony yellow
          'light-yellow': '#FFFACD', // Light yellow for backgrounds
          'dark-yellow': '#B8860B', // Darker yellow for hover states
          'green': '#93C572', // Pistachio green
          'light-green': '#98FB98', // Light pistachio
          'dark-green': '#556B2F', // Dark olive green
          'gold': '#FFD700', // Gold accent
          'gold-light': '#F0E68C', // Light gold
          'gold-dark': '#DAA520', // Dark gold
        }
      },
      backgroundImage: {
        'gradient-skin': 'linear-gradient(to right, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
  safelist: [
    {
      pattern: /(bg|text|border|ring)-(skin)-(yellow|green|light-yellow|light-green|dark-yellow|dark-green|gold|gold-light|gold-dark)/,
      variants: ['hover', 'focus', 'active'],
    },
  ],
}