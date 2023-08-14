import { useState, useEffect, useRef } from 'react';
import PokemonType from './PokemonType';

function PokemonTypeEffectiveness({ pokemonType }) {
    const [pokemonWeaknesses, setPokemonWeaknesses] = useState([]);
    const [pokemonAdvantages, setPokemonAdvantages] = useState([]);
    const shouldFetch = useRef(true);

    const fetchPokemonData = (pokemon) => {
        let url = pokemon.url;

        return fetch(url)
            .then((res) => res.json())
            .then((data) => data);
    };

    useEffect(() => {
        if (shouldFetch.current) {
            const fetches = pokemonType.map((type) =>
                fetchPokemonData(type.type)
            );

            Promise.all(fetches).then((newTypes) => {
                let weaknesses = [];
                let advantages = [];

                newTypes.forEach((type) => {
                    weaknesses.push(
                        ...type.damage_relations.double_damage_from
                    );
                    advantages.push(...type.damage_relations.double_damage_to);
                });

                setPokemonWeaknesses(weaknesses);
                setPokemonAdvantages(advantages);
            });

            shouldFetch.current = false;
        }
    }, [pokemonType]);

    return (
        <>
            <div>
                <p>Weaknesses</p>
                <PokemonType types={pokemonWeaknesses} />
            </div>
            <div>
                <p>Advantages</p>
                <PokemonType types={pokemonAdvantages} />
            </div>
        </>
    );
}

export default PokemonTypeEffectiveness;
