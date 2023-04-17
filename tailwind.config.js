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
                stile: '#A1A1A1',
                dark: '#A1A1A1',
                rock: '#A1A1A1',
                grass: '#70A83B',
                bug: '#70A83B',
                ice: '#A2CFF0',
                water: '#A2CFF0',
                fire: '#F76545',
                fighting: '#F76545',
                dragon: '#F76545',
                normal: '#76AADB',
                poison: '#A974BC',
                psychic: '#A974BC',
                fairy: '#A974BC',
                ghost: '#A974BC',
                ground: '#9B897B',
                electric: '#F7C545',
            },
        },
        fontFamily: {
            sans: ['Source Sans Pro', 'sans-serif'],
            karla: ['Karla', 'sans-serif'],
        },
    },
    plugins: [],
};
