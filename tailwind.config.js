/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class', // Ativar o modo dark baseado em classes
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary-color)',
        secondary: 'var(--secondary-color)',
        text: 'var(--text-color)',
        background: 'var(--bg-color)',
      },
      fontFamily: {
        theme: 'var(--font-family)',
      },
      backgroundColor: {
        theme: 'var(--bg-color)',
      },
      textColor: {
        theme: 'var(--text-color)',
      },
    },
  },
  plugins: [],
}
