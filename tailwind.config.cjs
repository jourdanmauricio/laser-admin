/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // transitionProperty: {
      //   height: 'height',
      // },
      colors: {
        navHoverColor: 'var(--navHoverColor)',
        navBgColor: 'var(--navBgColor)',
        navTextColor: 'var(--navTextColor)',
        navCurrentPageColor: 'var(--navCurrentPageColor)',
        bodyBgColor: 'var(--bodyBgColor)',
        heroTop: 'var(--heroTop)',
        heroOpacity: 'var(--heroOpacity)',
        aboutBgColor: 'var(--aboutBgColor)',
        clinicBgColor: 'var(--clinicBgColor)',
        blogBgColor: 'var(--blogBgColor)',
        footerBgColor: 'var(--footerBgColor)',
        footerTextColor: 'var(--footerTextColor)',
        footerButtonsColor: 'var(--footerButtonsColor)',
        footerButtonsHoverColor: 'var(--footerButtonsHoverColor)',
        footerLinksColor: 'var(--footerLinksColor)',
        footerLinksHoverColor: 'var(--footerLinksHoverColor)',
        footer2BgColor: 'var(--footer2BgColor)',
        footer2TextColor: 'var(--footer2TextColor)',
        sectionBgColor: 'var(--sectionBgColor)',
      },
    },
  },
  plugins: [],
};
