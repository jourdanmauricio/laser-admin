/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navHoverColor: 'var(--navHoverColor)',
        navBgColor: 'var(--navBgColor)',
        navTextColor: 'var(--navTextColor)',
        navCurrentPageColor: 'var(--navCurrentPageColor)',
      },
    },
  },
  plugins: [],
};
