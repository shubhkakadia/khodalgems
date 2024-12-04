/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        "main-blue": "#5ba3bf",
        "main-bg": "#F5F5F5",
        theme: {
          50: "#e6e6ff",    // Very light blue
          100: "#ccccff",
          200: "#b3b3ff",
          300: "#9999ff",
          400: "#8080ff",
          500: "#6666e6",
          600: "#4d4db3",
          700: "#333399",
          800: "#1a1a80",
          900: "#0d0d66",
          950: "#000080"    // Base dark navy blue
        },
      },
    },
    fontFamily: {
      quicksand: ["Quicksand", "sans-serif"],
      playfair: ["Playfair Display", "serif"],
      poppins: ["Poppins", "sans-serif"],
      raleway: ["Raleway", "sans-serif"],
      montserrat: ["Montserrat", "sans-serif"],
    },
  },
  plugins: [],
};
