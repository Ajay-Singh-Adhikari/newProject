/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#556B2F", // Olive
        secondary: "#4682B4", // lavender
      },
    },
  },
  plugins: [],
};
