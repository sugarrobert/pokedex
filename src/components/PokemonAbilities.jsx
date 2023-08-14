import React from 'react';

function PokemonAbilities({ pokemonAbilities }) {
    const visibleAbilities = pokemonAbilities.filter(
        (ability) => !ability.is_hidden
    );

    return (
        <div>
            <span>Abilities </span>
            {visibleAbilities.map(({ ability }) => (
                <span key={ability.name}>{ability.name} </span>
            ))}
        </div>
    );
}

export default PokemonAbilities;
