/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    container: {
      padding: {
        DEFAULT: "2rem",
        md: "6rem",
        lg: "10rem",
      },
    },
  },
  plugins: [],
};
