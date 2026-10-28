/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: '#f2ebdb',
        paper2: '#e8dfc8',
        ink: '#1b2a22',
        moss: '#4f6f3a',
        clay: '#c0532b',
        sun: '#e3a72f',
        river: '#2f6f7e',
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
}
