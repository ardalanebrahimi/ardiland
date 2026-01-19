/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./web/src/**/*.{html,ts}",
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        // Status badge colors
        'status-live-bg': '#ECFDF5',
        'status-live-text': '#047857',
        'status-beta-bg': '#FFFBEB',
        'status-beta-text': '#B45309',
        'status-progress-bg': '#EFF6FF',
        'status-progress-text': '#1D4ED8',
        'status-experiment-bg': '#F5F3FF',
        'status-experiment-text': '#7C3AED',
      },
      fontFamily: {
        sans: [
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          '"Noto Sans"',
          'sans-serif',
        ],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.5rem', { lineHeight: '2rem' }],
        '2xl': ['2rem', { lineHeight: '2.25rem' }],
        '3xl': ['3rem', { lineHeight: '1' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      maxWidth: {
        '3xl': '48rem',
        '5xl': '64rem',
      },
    },
  },
  plugins: [],
}
