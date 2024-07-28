/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'tier-gradient': 'linear-gradient(to top left, var(--tw-gradient-stops))',
      },
      fontFamily: {
        sans: ['var(--font-inconsolata)'],
      },
      colors: {
        'high-power-rounds': '#c54dfe',
        'impact-rounds': '#21ba08',
        'special-rounds': '#e47121',
        electric: '#36c6f2',
        toxic: '#40c41d',
      }

    },
  },
  plugins: [require('@tailwindcss/forms')],
};
