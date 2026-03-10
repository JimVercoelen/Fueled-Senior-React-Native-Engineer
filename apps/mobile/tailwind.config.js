/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./app/**/*.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6E5BFF',
          50: '#f5f3ff',
          100: '#e8e5ff',
          200: '#d4cfff',
          300: '#b3a9ff',
          400: '#8b7fff',
          500: '#6E5BFF',
          600: '#6652FF',
          700: '#4d38ec',
          800: '#442fe2',
          900: '#3825b5',
          950: '#1a0d3a',
        },
        accent: '#4d38ec',
        danger: '#c70000',
        'danger-orange': '#f97316',
        success: '#008831',
        warning: '#f5a800',
        info: '#1890ff',
        gray: {
          50: '#f6f6f6',
          100: '#e7e7e7',
          200: '#d1d1d1',
          300: '#b0b0b0',
          400: '#888888',
          500: '#6d6d6d',
          600: '#4f4f4f',
          700: '#454545',
          800: '#3d3d3d',
          850: '#292929',
          900: '#171717',
        },
      },
      fontFamily: {
        heading: ['Inter_600SemiBold'],
        body: ['Inter_400Regular'],
        'body-medium': ['Inter_500Medium'],
        'body-semibold': ['Inter_600SemiBold'],
      },
      borderRadius: {
        pill: '9999px',
      },
      gradientColorStops: {
        'gradient-from': '#6652FF',
        'gradient-to': '#000000',
      },
    },
  },
  plugins: [],
};
