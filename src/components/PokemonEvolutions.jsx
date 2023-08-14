import { useState, useEffect, useRef } from 'react';

function PokemonEvolutions({ evolutionChain }) {
    const [pokemonEvolutionChain, setPokemonEvolutionChain] = useState(null);
    const [noEvolutions, setNoEvolutions] = useState(null);
    const [firstEvolution, setFirstEvolution] = useState(null);
    const [secondEvolution, setSecondEvolution] = useState(null);
    const [thirdEvolution, setThirdEvolution] = useState(null);
    const shouldFetch = useRef(true);

    useEffect(() => {
        if (shouldFetch.current) {
            fetch(`${evolutionChain.url}`)
                .then((res) => res.json())
                .then(function (data) {
                    setPokemonEvolutionChain(data);
                })
                .catch((error) => {
                    console.error('Error during data fetching:', error);
                });

            shouldFetch.current = false;
        }
    }, [shouldFetch.current]);

    useEffect(() => {
        if (pokemonEvolutionChain) {
            const pokeEvoChain = pokemonEvolutionChain.chain;

            if (pokeEvoChain.evolves_to.length === 0) {
                setNoEvolutions(true);
                setFirstEvolution(pokeEvoChain);
            } else {
                setFirstEvolution(pokeEvoChain);

                if (pokeEvoChain.evolves_to.length > 0) {
                    const secondPokeEvo = pokeEvoChain.evolves_to;
                    setSecondEvolution(secondPokeEvo);

                    const thirdPokeEvo = secondPokeEvo
                        .filter((poke) => poke.evolves_to.length > 0)
                        .map((poke) => poke.evolves_to[0]);

                    setThirdEvolution(thirdPokeEvo);
                }
            }
        }
    }, [pokemonEvolutionChain]);

    return (
        <>
            <div>
                <p>Evolutions</p>
                {noEvolutions ? (
                    <>
                        <span>This Pokémon does not evolve.</span>
                        {firstEvolution !== null && (
                            <span>{firstEvolution.species.name}</span>
                        )}
                    </>
                ) : (
                    <ul>
                        <li>
                            {firstEvolution !== null && (
                                <span>{firstEvolution.species.name}</span>
                            )}
                        </li>
                        <li>
                            {secondEvolution !== null &&
                                secondEvolution.map((evo) => {
                                    return (
                                        <span
                                            className="pr-2"
                                            key={evo.species.name}
                                        >
                                            {evo.species.name}
                                        </span>
                                    );
                                })}
                        </li>
                        <li>
                            {thirdEvolution !== null &&
                                thirdEvolution.map((evo) => {
                                    return (
                                        <span
                                            className="pr-2"
                                            key={evo.species.name}
                                        >
                                            {evo.species.name}
                                        </span>
                                    );
                                })}
                        </li>
                    </ul>
                )}
            </div>
        </>
    );
}

export default PokemonEvolutions;
