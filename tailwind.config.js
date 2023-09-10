/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        bunker: {
          DEFAULT: "#0D1117",
          50: "#BBC7D8",
          100: "#AEBCD1",
          200: "#94A6C2",
          300: "#7A91B4",
          400: "#607BA5",
          500: "#4F688C",
          600: "#415472",
          700: "#324158",
          800: "#232E3E",
          900: "#141B24",
          950: "#0D1117",
        },
        primary: {
          DEFAULT: "#0066FF",
          50: "#FFFFFF",
          100: "#F5F9FF",
          200: "#CCE0FF",
          300: "#A3C8FF",
          400: "#7AAFFF",
          500: "#5297FF",
          600: "#297EFF",
          700: "#0066FF",
          800: "#0050C7",
          900: "#00398F",
          950: "#002E73",
        },
      },
    },
  },
  plugins: [],
};
