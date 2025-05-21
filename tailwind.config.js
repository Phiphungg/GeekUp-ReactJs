export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      border: {
        leftLine:
          "var(relative pl-4 before:absolute before:left-0 before:h-[22px] before:w-[1px] before:bg-gray-200)",
      },
    },
  },
  plugins: [],
};
