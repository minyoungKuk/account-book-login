/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#354649;",
        secondary: "#6c7a89;",
        tertiary: "#a3C6C4",
        sub: "#e0e7e9",
        alert: "#934A5F",
      },
    },
  },

  plugins: [],
};
