/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg:        'rgb(var(--bg) / <alpha-value>)',
        'bg-alt':  'rgb(var(--bg-alt) / <alpha-value>)',
        ink:       'rgb(var(--ink) / <alpha-value>)',
        muted:     'rgb(var(--muted) / <alpha-value>)',
        hairline:  'rgb(var(--hairline) / <alpha-value>)',
        accent:    'rgb(var(--accent) / <alpha-value>)',
      },
      fontFamily: {
        serif: ['Newsreader', 'Georgia', 'serif'],
        sans:  ['Geist', 'system-ui', 'sans-serif'],
        mono:  ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        'reading': '720px',
        'post':    '880px',
      },
    },
  },
  plugins: [],
};
