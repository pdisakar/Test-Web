import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/layouts/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '.9375rem',
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1295px',
    },
    extend: {
      backgroundImage: {
        checkmark: "url('/icons/checkmark.svg')",
        list: "url('/icons/list.svg')",
        correct: "url('/icons/correct.svg')",
        incorrect: "url('/icons/incorrect.svg')",
        worldmap: "url('/icons/worldmap.svg')",
        dottedline: "url('/icons/dottedline.svg')",
        pathpattern: "url('/icons/pathpattern.svg')",
      },
    },
    colors: {
      primary: '#709051',
      secondary: '#D7DABB',
      muted: '#747474',
      black: '#000000',
      white: '#FFFFFF',
      'page-bg': '#FFFFF9',
      headings: '#0D1B00',
      border: '#EAEAE7',
      navbar: '#709051',
      'text-color': '#081000',
      'footer-color': '#182F02',
    },
    fontFamily: {
      primary: ['var(--primary)'],
    },
    boxShadow: {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      none: 'none',
      'custom-shadow':
        '0 1px 2px rgba(112,144,81,0.12), 0 1px 3px rgba(112,144,81,0.12)',
    },
  },
  plugins: [],
} satisfies Config;
