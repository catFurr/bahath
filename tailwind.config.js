// const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: ["./public/**/*.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  // variants: {
  //   extend: {
  //     // shadows: ['active'],
  //   },
  // },
  theme: {
    extend: {
      colors: {
        primary: "#856285",
        secondary: "#d4d8f9",
        "primary-light": "#d4c4d4",
        // main: defaultTheme.colors.teal['500'], // #38b2ac

        "semi-75": "rgba(0, 0, 0, 0.75)",
      },
      fontFamily: {
        primary: ["Eagle Lake", "cursive"],
        secondary: ["Raleway", "sans-serif"],
      },

      // typography: {
      //   DEFAULT: {
      //     css: {
      //       color: "inherit",
      //       h3: {
      //         color: "inherit",
      //       },
      //       h2: {
      //         color: "inherit",
      //       },
      //       h1: {
      //         color: "inherit",
      //       },
      //     },
      //   },
      // },
    },
  },
  // plugins: [require("@tailwindcss/typography")],
};
