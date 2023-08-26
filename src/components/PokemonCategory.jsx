import { useState, useEffect } from 'react';

function PokemonCategory({ pokemonCategory }) {
    const [category, setCategory] = useState('');

    useEffect(() => {
        getCategory();
    }, [pokemonCategory]);

    const getCategory = () => {
        pokemonCategory.forEach((category) => {
            if (category.language.name === 'en') {
                setCategory(category.genus);
            }
        });
    };

    return (
        <div className="flex flex-col">
            <span className="text-lg font-bold text-white">Category</span>
            <span>{category}</span>
        </div>
    );
}

export default PokemonCategory;
