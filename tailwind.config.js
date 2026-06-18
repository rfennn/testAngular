/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {},
  },
  plugins: [],
  /* 避免 Tailwind reset 覆蓋 ng-zorro 樣式 */
  corePlugins: {
    preflight: false,
  },
};
