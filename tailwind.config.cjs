/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        modal: "rgba(0, 0, 0, 0.5)",
      },
      backgroundImage: {
        dot: "radial-gradient(circle at 1.5px 1.5px, #e2e8f0 1.5px, transparent 0)",
      },
      transitionProperty: {
        border: "border-width, border-color",
      },
    },
  },
  plugins: [],
};
