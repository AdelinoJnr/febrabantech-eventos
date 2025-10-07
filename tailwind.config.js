export default {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx,js,jsx,scss}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
};