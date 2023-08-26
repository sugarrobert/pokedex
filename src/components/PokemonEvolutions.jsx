import { useState, useEffect, useRef } from 'react';
import PokemonEvolutionsCard from './PokemonEvolutionsCard';
import { twMerge } from 'tailwind-merge';

function PokemonEvolutions({ evolutionChain }) {
    const [pokemonEvolutionChain, setPokemonEvolutionChain] = useState(null);
    const [noEvolutions, setNoEvolutions] = useState(null);
    const [evolutions, setEvolutions] = useState({
        first: null,
        second: null,
        third: null,
    });
    const [evolutionData, setEvolutionData] = useState({
        first: null,
        second: null,
        third: null,
    });
    const shouldFetch = useRef(true);

    const fetchPokemonData = (name) => {
        const url = `https://pokeapi.co/api/v2/pokemon/${name}`;

        return fetch(url)
            .then((res) => res.json())
            .then((data) => data);
    };

    useEffect(() => {
        if (shouldFetch.current) {
            fetch(`${evolutionChain.url}`)
                .then((res) => res.json())
                .then(function (data) {
                    setPokemonEvolutionChain(data);
                })
                .catch((error) => {
                    console.error(
                        'Error during fetching evolution chain:',
                        error
                    );
                });

            shouldFetch.current = false;
        }
    }, [shouldFetch.current]);

    useEffect(() => {
        if (pokemonEvolutionChain) {
            const pokeEvoChain = pokemonEvolutionChain.chain;
            const evolvesTo = pokeEvoChain.evolves_to;

            setNoEvolutions(evolvesTo.length === 0);

            setEvolutions({
                first: pokeEvoChain,
                second: evolvesTo.length > 0 ? evolvesTo : null,
                third: evolvesTo
                    .filter((poke) => poke.evolves_to.length > 0)
                    .map((poke) => poke.evolves_to[0]),
            });
        }
    }, [pokemonEvolutionChain]);

    useEffect(() => {
        if (evolutions.first) {
            const getFirstEvolution = fetchPokemonData(
                evolutions.first.species.name
            );

            getFirstEvolution.then((first) => {
                setEvolutionData((prevEvo) => ({
                    ...prevEvo,
                    first: first,
                }));
            });
        }

        if (evolutions.second) {
            const getAllSecondEvolutions = evolutions.second.map((evo) =>
                fetchPokemonData(evo.species.name)
            );

            Promise.all(getAllSecondEvolutions).then((secondEvo) => {
                setEvolutionData((prevEvo) => ({
                    ...prevEvo,
                    second: secondEvo,
                }));
            });
        }

        if (evolutions.third) {
            const getAllThirdEvolutions = evolutions.third.map((evo) =>
                fetchPokemonData(evo.species.name)
            );

            Promise.all(getAllThirdEvolutions).then((thirdEvo) => {
                setEvolutionData((prevEvo) => ({
                    ...prevEvo,
                    third: thirdEvo,
                }));
            });
        }
    }, [evolutions]);

    return (
        <>
            <p className="mb-3 text-2xl text-white">Evolutions</p>
            {noEvolutions ? (
                <>
                    <span>This Pokémon does not evolve.</span>
                    {evolutionData.first !== null && (
                        <PokemonEvolutionsCard
                            evolution={evolutionData.first}
                        />
                    )}
                </>
            ) : (
                <ul
                    className={twMerge(
                        `gap-6 md:grid md:grid-cols-3 md_max:flex md_max:flex-col md_max:items-center md_max:justify-center`
                    )}
                >
                    <li className="flex w-full items-center justify-center">
                        {evolutionData.first !== null && (
                            <PokemonEvolutionsCard
                                evolution={evolutionData.first}
                            />
                        )}
                    </li>
                    <li
                        className={twMerge(
                            `w-full ${
                                evolutionData.third &&
                                evolutionData.third.length < 1
                                    ? 'col-span-2'
                                    : 'col-span-1'
                            } ${
                                evolutionData.second &&
                                evolutionData.second.length >= 2
                                    ? 'grid grid-cols-2 gap-x-2 gap-y-5'
                                    : ''
                            }`
                        )}
                    >
                        {evolutionData.second > 0 ||
                            (evolutionData.second !== null &&
                                evolutionData.second.map((evo, index) => {
                                    return (
                                        <PokemonEvolutionsCard
                                            key={evo.name}
                                            evolution={evo}
                                            spanTwo={
                                                evolutionData.second.length %
                                                    2 !==
                                                    0 &&
                                                index ===
                                                    evolutionData.second
                                                        .length -
                                                        1
                                                    ? true
                                                    : false
                                            }
                                        />
                                    );
                                }))}
                    </li>
                    <li
                        className={twMerge(
                            `w-full ${
                                evolutionData.third &&
                                evolutionData.third.length >= 2
                                    ? 'grid grid-cols-2 gap-x-4 gap-y-2'
                                    : ''
                            }`
                        )}
                    >
                        {evolutionData.third > 0 ||
                            (evolutionData.third !== null &&
                                evolutionData.third.map((evo, index) => {
                                    return (
                                        <PokemonEvolutionsCard
                                            key={evo.name}
                                            evolution={evo}
                                            spanTwo={
                                                evolutionData.third.length %
                                                    2 !==
                                                    0 &&
                                                index ===
                                                    evolutionData.third.length -
                                                        1
                                                    ? true
                                                    : false
                                            }
                                        />
                                    );
                                }))}
                    </li>
                </ul>
            )}
        </>
    );
}

export default PokemonEvolutions;
