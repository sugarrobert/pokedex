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
        <div>
            <span>Category</span>
            <span>{category}</span>
        </div>
    );
}

export default PokemonCategory;
