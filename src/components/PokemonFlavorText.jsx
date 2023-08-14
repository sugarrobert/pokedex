import { useEffect, useState } from 'react';

function PokemonFlavorText({ pokeFlavorText }) {
    const [redFlavoredText, setRedFlavoredText] = useState('');
    const [blueFlavoredText, setBlueFlavoredText] = useState('');
    const [activeFlavoredText, setActiveFlavoredText] = useState('red');

    useEffect(() => {
        getFlavoredText();
    }, [pokeFlavorText]);

    const getFlavoredText = () => {
        let redText = '';
        let blueText = '';

        pokeFlavorText.forEach((flavorText) => {
            if (flavorText.language.name === 'en') {
                if (flavorText.version.name === 'red') {
                    redText = flavorText.flavor_text;
                } else if (flavorText.version.name === 'blue') {
                    blueText = flavorText.flavor_text;
                }
            }
        });

        setRedFlavoredText(redText);
        setBlueFlavoredText(blueText);
    };

    return (
        <>
            <div className={`${activeFlavoredText !== 'red' ? 'sr-only' : ''}`}>
                {redFlavoredText}
            </div>
            <br />
            <div
                className={`${activeFlavoredText !== 'blue' ? 'sr-only' : ''}`}
            >
                {blueFlavoredText}
            </div>
            <div className="flex gap-3">
                <p>Versions:</p>
                <button onClick={() => setActiveFlavoredText('red')}>
                    Red
                </button>
                <button onClick={() => setActiveFlavoredText('blue')}>
                    Blue
                </button>
            </div>
        </>
    );
}

export default PokemonFlavorText;
