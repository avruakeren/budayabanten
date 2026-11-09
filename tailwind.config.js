/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#F7F5F0',
        surface: '#FFFFFF',
        line: '#E3DFD6',
        ink: '#1B1916',
        muted: '#6F6A61',
        accent: {
          DEFAULT: '#B4552D',
          light: '#C86A41',
          dark: '#8F4222',
          soft: '#F3E7DF',
        },
        olive: '#5C6B57',
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 1px 2px rgba(27,25,22,0.05), 0 12px 32px -24px rgba(27,25,22,0.25)',
      },
      letterSpacing: {
        widest: '0.3em',
      },
      spacing: {
        4.5: '1.125rem',
        5.5: '1.375rem',
      },
      opacity: Object.fromEntries(
        Array.from({ length: 101 }, (_, index) => [index, String(index / 100)]),
      ),
    },
  },
  plugins: [],
};
