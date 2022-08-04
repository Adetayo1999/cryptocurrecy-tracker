/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
      keyframes: {
        "ping-once": {
          "75%, 100%": {
            transform: "scale(2)",
            opacity: 0,
          },
        },
      },
      animation: {
        "ping-once": "ping 1s cubic-bezier(0, 0, 0.2, 1)",
      },
    },
  },
  plugins: [],
};
