module.exports = {
  mode: "jit",
  purge: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#e2e4e5",
          100: "#b7babe",
          200: "#878d92",
          300: "#565f66",
          400: "#323c46",
          500: "#0e1a25",
          600: "#0c1721",
          700: "#0a131b",
          800: "#080f16",
          900: "#04080d",
        },
      },
      maxWidth: {
        sidePanel: "418px",
        desktop: "1396px",
        "1/2": "50%",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
