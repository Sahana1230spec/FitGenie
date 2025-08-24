/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        fuchsia: {
          50: '#fdf4ff',
          100: '#fae8ff',
          200: '#f5d0fe',
          300: '#f0abfc',
          400: '#e879f9',
          500: '#D8125B', // Your custom fuchsia
          600: '#c026d3',
          700: '#a21caf',
          800: '#86198f',
          900: '#701a75',
        },
        gray: {
          800: '#2C2E39', // Your custom dark grey
          900: '#1a1b23',
        }
      },
      backgroundImage: {
        'gradient-magical': 'linear-gradient(135deg, #1a1b23 0%, #2C2E39 25%, #1a1b23 50%, #2C2E39 75%, #1a1b23 100%)',
        'gradient-fuchsia': 'linear-gradient(135deg, #D8125B 0%, #e879f9 100%)',
        'gradient-sunset': 'linear-gradient(135deg, #D8125B 0%, #f97316 100%)',
        'gradient-ocean': 'linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%)',
        'gradient-forest': 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse-slow 4s ease-in-out infinite',
        'bounce-slow': 'bounce 3s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { 
            transform: 'translateY(0px) rotate(0deg)',
            opacity: '0.3'
          },
          '50%': { 
            transform: 'translateY(-20px) rotate(5deg)',
            opacity: '0.8'
          },
        },
        'pulse-slow': {
          '0%, 100%': { 
            opacity: '0.3',
            transform: 'scale(1)'
          },
          '50%': { 
            opacity: '0.8',
            transform: 'scale(1.05)'
          },
        }
      },
      boxShadow: {
        'glow': '0 0 20px rgba(216, 18, 91, 0.3)',
        'glow-lg': '0 0 40px rgba(216, 18, 91, 0.4)',
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}