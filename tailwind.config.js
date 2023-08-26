/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin');

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
            screens: {
                '2xl_max': { max: '1535px' },

                xl_max: { max: '1279px' },

                lg_max: { max: '1023px' },

                md_max: { max: '767px' },

                sm_max: { max: '639px' },
            },
            backgroundImage: {
                'pokemon-heading-mask':
                    "url('/src/assets/pokemon-page/notch-white.png')",
                'pokemon-evolution-background':
                    "url('/src/assets/pokemon-page/body-gray-bg.png')",
            },
            gridTemplateRows: {
                20: 'repeat(20, minmax(0, 1fr))',
            },
        },
        fontFamily: {
            sans: ['Source Sans Pro', 'sans-serif'],
            karla: ['Karla', 'sans-serif'],
        },
    },
    plugins: [
        plugin(function ({ matchVariant }) {
            matchVariant(
                'nth',
                (value) => {
                    return `&:nth-child(${value})`;
                },
                {
                    values: {
                        1: '1',
                        2: '2',
                        3: '3',
                    },
                }
            );

            matchVariant(
                'last-two',
                (value) => {
                    return `&:nth-last-child(-n+${value})`;
                },
                {
                    values: {
                        2: '2',
                        3: '3',
                        4: '4',
                    },
                }
            );
        }),
    ],
};
