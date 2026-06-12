/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        mint: {
          DEFAULT: '#00e6a0',
          dim: '#00c88a',
          dark: '#00a870',
        },
      },
      fontFamily: {
        syne: ['"Playfair Display"', 'Georgia', 'serif'],
        dm: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease both',
        'fade-up-1': 'fadeUp 0.6s 0.1s ease both',
        'fade-up-2': 'fadeUp 0.6s 0.2s ease both',
        'fade-up-3': 'fadeUp 0.6s 0.3s ease both',
        'pulse-dot': 'pulseDot 2s ease infinite',
        'float': 'float 3.5s ease-in-out infinite',
        'float-slow': 'floatSlow 5s 0.8s ease-in-out infinite',
        'float-slower': 'floatSlow 7s 1.6s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        pulseDot: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.5', transform: 'scale(0.8)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
    },
  },
  plugins: [],
}
