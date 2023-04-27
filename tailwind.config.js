/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                'theme-third': '#F5DB13',
                'theme-primary': '#F2B807',
                'theme-second': '#F28F16',
                'theme-danger': '#D93E30',
                'theme-white': '#F2F2F2',
                'theme-dark': '#212121',
                normal: '#76AADB',
                fire: '#F76545',
                fighting: '#F76545',
                water: '#A2CFF0',
                flying: '#A890F0',
                grass: '#70A83B',
                poison: '#A974BC',
                electric: '#F7C545',
                ground: '#9B897B',
                psychic: '#A974BC',
                rock: '#A1A1A1',
                ice: '#A2CFF0',
                bug: '#70A83B',
                dragon: '#F76545',
                ghost: '#A974BC',
                dark: '#A1A1A1',
                steel: '#A1A1A1',
                fairy: '#A974BC',
            },
        },
        fontFamily: {
            sans: ['Source Sans Pro', 'sans-serif'],
            karla: ['Karla', 'sans-serif'],
        },
    },
    plugins: [],
};
