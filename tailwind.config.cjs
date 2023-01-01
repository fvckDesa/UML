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
      spacing: {
        "top-bar": "var(--top-bar)",
        "bottom-bar": "var(--bottom-bar)",
        "left-bar-tabs": "var(--left-bar-tabs)",
        "left-bar-panel": "var(--left-bar-panel)",
        "right-bar": "var(--right-bar)",
      },
    },
  },
  plugins: [],
};
