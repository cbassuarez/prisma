/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'prisma-paper': '#f5f2ec',
        'prisma-ink': '#111111',
        'prisma-grid': '#d6cdbf'
      },
      fontFamily: {
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
        serif: ['"EB Garamond"', 'ui-serif', 'Georgia', 'serif']
      }
    }
  },
  plugins: []
};
