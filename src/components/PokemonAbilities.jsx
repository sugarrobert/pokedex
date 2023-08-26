import React from 'react';

function PokemonAbilities({ pokemonAbilities }) {
    const visibleAbilities = pokemonAbilities.filter(
        (ability) => !ability.is_hidden
    );

    return (
        <div className="flex flex-col">
            <span className="text-lg font-bold text-white">Abilities </span>
            {visibleAbilities.map(({ ability }) => (
                <span key={ability.name} className="capitalize">
                    {ability.name}
                </span>
            ))}
        </div>
    );
}

export default PokemonAbilities;
