import { useEffect, useState } from 'react';

function PokemonFlavorText({ pokeFlavorText }) {
    const [redFlavoredText, setRedFlavoredText] = useState('');
    const [blueFlavoredText, setBlueFlavoredText] = useState('');
    const [activeFlavoredText, setActiveFlavoredText] = useState('blue');

    useEffect(() => {
        getFlavoredText();
    }, [pokeFlavorText]);

    const getFlavoredText = () => {
        let redText = '';
        let blueText = '';

        pokeFlavorText.forEach((flavorText) => {
            if (flavorText.language.name === 'en') {
                if (flavorText.version.name === 'silver') {
                    redText = flavorText.flavor_text;
                } else if (flavorText.version.name === 'crystal') {
                    blueText = flavorText.flavor_text;
                }
            }
        });

        setRedFlavoredText(redText);
        setBlueFlavoredText(blueText);
    };

    return (
        <>
            <div className="mb-3">
                <p
                    className={`text-base ${
                        activeFlavoredText !== 'red' ? 'sr-only' : ''
                    }`}
                >
                    {redFlavoredText}
                </p>
                <p
                    className={`text-base ${
                        activeFlavoredText !== 'blue' ? 'sr-only' : ''
                    }`}
                >
                    {blueFlavoredText}
                </p>
            </div>
            <div className="mb-5 flex items-center gap-5">
                <p>Versions:</p>
                <button
                    className={`rounded-full outline-4 outline-[#17adff] [&.active]:outline ${
                        activeFlavoredText === 'blue' ? 'active' : ''
                    }`}
                    onClick={() => setActiveFlavoredText('blue')}
                >
                    <svg
                        className="h-8 w-8 fill-[#0072b0]"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlSpace="preserve"
                        viewBox="0 0 100 100"
                    >
                        <path d="M40.3 47.6c1.1-4.4 5-7.6 9.7-7.6 4.7 0 8.6 3.2 9.7 7.6 18.5.3 34.8 1.4 35.3 3.5V50C95 25.1 74.9 5 50 5S5 25.1 5 50v1.1c.5-2 16.8-3.2 35.3-3.5zM50 60c-4.6 0-8.5-3.2-9.7-7.4-17.2.3-32.5 1.3-35 3.1C8.2 77.8 27.1 95 50 95c22.9 0 41.8-17.1 44.6-39.3-2.5-1.8-17.7-2.8-35-3.1-1.1 4.3-5 7.4-9.6 7.4z" />
                        <circle cx="50" cy="50" r="7.5" />
                    </svg>
                </button>
                <button
                    className={`rounded-full outline-4 outline-[#eb859a] [&.active]:outline ${
                        activeFlavoredText === 'red' ? 'active' : ''
                    }`}
                    onClick={() => setActiveFlavoredText('red')}
                >
                    <svg
                        className="h-8 w-8 fill-[#dd2d51]"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlSpace="preserve"
                        viewBox="0 0 100 100"
                    >
                        <path d="M40.3 47.6c1.1-4.4 5-7.6 9.7-7.6 4.7 0 8.6 3.2 9.7 7.6 18.5.3 34.8 1.4 35.3 3.5V50C95 25.1 74.9 5 50 5S5 25.1 5 50v1.1c.5-2 16.8-3.2 35.3-3.5zM50 60c-4.6 0-8.5-3.2-9.7-7.4-17.2.3-32.5 1.3-35 3.1C8.2 77.8 27.1 95 50 95c22.9 0 41.8-17.1 44.6-39.3-2.5-1.8-17.7-2.8-35-3.1-1.1 4.3-5 7.4-9.6 7.4z" />
                        <circle cx="50" cy="50" r="7.5" />
                    </svg>
                </button>
            </div>
        </>
    );
}

export default PokemonFlavorText;
