/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        // Mobile breakpoints
        'sm': '480px',    // Mobile small
        'sm2': '568px',   // Mobile medium
        'sm3': '640px',   // Mobile large
        // Tablet breakpoints
        'md': '768px',    // Tablet small
        'md2': '840px',   // Tablet medium
        'md3': '960px',   // Tablet large
        // Desktop breakpoints
        'lg': '1024px',   // Desktop small
        'lg2': '1280px',  // Desktop medium
        'xl': '1440px',   // Desktop large
        '2xl': '1600px',  // Desktop extra large
      },
      colors: {
        'primary-green': '#0BAB7C',
        'page-bg': '#F9FAFB',
        'heading-color': '#111827',
        'form-label': '#4B5563',
        'form-placeholder': '#B5B5B5',
        'auth-footer-text': '#808080',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      minHeight: {
        'touch': '44px', // Minimum touch target size
      },
      fontSize: {
        'touch': '16px', // Minimum readable font size on mobile
      },
    },
  },
  plugins: [],
}
