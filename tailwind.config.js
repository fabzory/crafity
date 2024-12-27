/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      keyframes: {
        pop: {
          '0%, 100%': { transform: 'scale(1)' },
          '30%': { transform: 'scale(1.01)' },
        },
        slowpop: {
          '0%, 100%': { transform: 'scale(1)' },
          '30%': { transform: 'scale(1.05)' },
        },
      },
      animation: {
        pop: 'pop 0.6s ease-in-out',
        slowpop: 'slowpop 0.6s ease-in-out',
      },
    },
  },
  plugins: [],
}

