/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg:        'var(--bg)',
        'bg-alt':  'var(--bg-alt)',
        ink:       'var(--ink)',
        muted:     'var(--muted)',
        hairline:  'var(--hairline)',
        accent:    'var(--accent)',
      },
      fontFamily: {
        serif: ['Newsreader', 'Georgia', 'serif'],
        sans:  ['Geist', 'system-ui', 'sans-serif'],
        mono:  ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        'reading': '720px',
        'post':    '680px',
      },
    },
  },
  plugins: [],
};
