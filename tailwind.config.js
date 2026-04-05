/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        pink: { DEFAULT: '#E8436A', light: '#FFF1F3' },
        orange: { DEFAULT: '#F4813F', light: '#FFF7ED' },
        purple: { DEFAULT: '#7B4FCC', light: '#EEF2FF' },
        navy: { DEFAULT: '#0D1B3E' },
        teal: { DEFAULT: '#0D9488' },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
