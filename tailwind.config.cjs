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
        bodyBgColor: 'var(--bodyBgColor)',
        h1Color: 'var(--h1Color)',
        h1Pos: 'var(--h1Pos)',
        h2Pos: 'var(--h2Pos)',
        h3Pos: 'var(--h3Pos)',
        heroTop: 'var(--heroTop)',
        heroOpacity: 'var(--heroOpacity)',
      },
    },
  },
  plugins: [],
};
