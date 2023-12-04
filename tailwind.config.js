/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/views/**/*.{html,js,vue}',
    './src/components/**/*.{html,js,vue}',
    './index.html',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  prefix: 'tw-'
}
