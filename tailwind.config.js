/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      color: {
        neutral: "red",
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {

          neutral: "#36D399",
          "base-100": "#FFFFFF",
          success: "#36D399",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
