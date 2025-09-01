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
        'meet-blue': 'var(--meet-blue)',
        'meet-gray': 'var(--meet-gray)',
        'meet-black': 'var(--meet-black)',
        'dark-gray': 'var(--dark-gray)',
        'border-gray': 'var(--border-gray)',
        'hairline-gray': 'var(--hairline-gray)',
        'hover-gray': 'var(--hover-gray)',
        primary: 'var(--primary)',
      },
    },
  },
  plugins: [],
}