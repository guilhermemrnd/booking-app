/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    container: {
      padding: {
        DEFAULT: "2rem",
        md: "2rem",
        lg: "4rem",
        "2xl": "12rem",
      },
    },
  },
  plugins: [],
};
