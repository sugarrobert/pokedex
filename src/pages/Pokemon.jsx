import { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import PokemonGender from '../components/PokemonGender';
import PokemonType from '../components/PokemonType';
import PokemonFlavorText from '../components/PokemonFlavorText';
import PokemonCategory from '../components/PokemonCategory';
import PokemonAbilities from '../components/PokemonAbilities';
import PokemonTypeEffectiveness from '../components/PokemonTypeEffectiveness';
import PokemonEvolutions from '../components/PokemonEvolutions';
import PokemonStats from '../components/PokemonStats';
import { transformTypesResponse } from '../helpers/TransformTypesResponse';

function Pokemon() {
    const { pokemonName, pokemonId } = useParams();
    const [pokeData, setPokeData] = useState(null);
    const [pokeSpecies, setPokeSpecies] = useState(null);
    const [prevPoke, setPrevPoke] = useState(null);
    const [nextPoke, setNextPoke] = useState(null);
    const [transformedTypes, setTransformedTypes] = useState([]);
    const shouldFetch = useRef(true);

    useEffect(() => {
        if (shouldFetch.current) {
            fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
                .then((res) => res.json())
                .then(function (data) {
                    setPokeData(data);
                })
                .catch((error) => {
                    console.error('Error during data fetching:', error);
                });

            fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`)
                .then((res) => res.json())
                .then(function (data) {
                    setPokeSpecies(data);
                })
                .catch((error) => {
                    console.error('Error during poke species fetching:', error);
                });
            shouldFetch.current = false;
        }
    }, [shouldFetch.current]);

    useEffect(() => {
        if (pokeData !== null) {
            const prev = pokeData.id - 1;
            const next = pokeData.id + 1;

            const fetchPrev =
                prev > 0
                    ? fetch(`https://pokeapi.co/api/v2/pokemon/${prev}`).catch(
                          (error) =>
                              error.name === 'FetchError' &&
                              error.code === '404'
                                  ? Promise.resolve(null)
                                  : Promise.reject(error)
                      )
                    : Promise.resolve(null);

            const fetchNext = fetch(
                `https://pokeapi.co/api/v2/pokemon/${next}`
            ).catch((error) =>
                error.name === 'FetchError' && error.code === '404'
                    ? Promise.resolve(null)
                    : Promise.reject(error)
            );

            Promise.all([fetchPrev, fetchNext])
                .then(([prevResp, nextResp]) => {
                    const prevDataPromise = prevResp ? prevResp.json() : null;
                    const nextDataPromise = nextResp ? nextResp.json() : null;

                    return Promise.all([prevDataPromise, nextDataPromise]);
                })
                .then(([prevData, nextData]) => {
                    setPrevPoke(prevData);
                    setNextPoke(nextData);
                })
                .catch((error) => {
                    console.error('Error during data fetching:', error);
                });

            setTransformedTypes(transformTypesResponse(pokeData.types));
        }
    }, [pokeData]);

    if (pokeData === null) {
        return <div>Loading...</div>;
    }

    return (
        <main>
            <div className="relative flex justify-between">
                {prevPoke !== null && (
                    <Link
                        to={`/pokemon/${prevPoke.name}/${prevPoke.id}`}
                        onClick={(shouldFetch.current = true)}
                    >
                        <span>{prevPoke.name}</span>
                        <span>{prevPoke.id}</span>
                    </Link>
                )}
                {nextPoke !== null && (
                    <Link
                        to={`/pokemon/${nextPoke.name}/${nextPoke.id}`}
                        onClick={(shouldFetch.current = true)}
                    >
                        <span>{nextPoke.name}</span>
                        <span>{nextPoke.id}</span>
                    </Link>
                )}
                <div className="absolute left-[50%] flex translate-x-[-50%]">
                    <h1 className="">{pokeData.name}</h1>
                    <span>{pokeData.id}</span>
                </div>
            </div>
            <div>
                <div className="flex flex-col md:flex-row">
                    <div className="flex-shrink-0">
                        <img
                            src={
                                pokeData.sprites.other.dream_world
                                    .front_default ||
                                pokeData.sprites.other.home.front_default ||
                                pokeData.sprites.other['official-artwork']
                                    .front_default ||
                                pokeData.sprites.front_default
                            }
                            width="430"
                            height="430"
                            loading="lazy"
                            alt={pokemonName}
                            className="max-h-full max-w-full"
                        />
                    </div>
                    <div>
                        {pokeSpecies && (
                            <PokemonFlavorText
                                pokeFlavorText={pokeSpecies.flavor_text_entries}
                            />
                        )}
                        <div>
                            <div>
                                <span>Height</span>
                                <span>{pokeData.height}</span>
                            </div>
                            <div>
                                <span>Weight</span>
                                <span>{pokeData.weight}</span>
                            </div>
                            <div>
                                <span>Weight</span>
                                <span>{pokeData.weight}</span>
                            </div>
                            <div>
                                <span>
                                    {pokeSpecies && (
                                        <PokemonGender
                                            genderDifferences={
                                                pokeSpecies.has_gender_differences
                                            }
                                            genderRate={pokeSpecies.gender_rate}
                                        />
                                    )}
                                </span>
                            </div>
                            <div>
                                {pokeSpecies && (
                                    <PokemonCategory
                                        pokemonCategory={pokeSpecies.genera}
                                    />
                                )}
                            </div>
                            <div>
                                {pokeData && (
                                    <PokemonAbilities
                                        pokemonAbilities={pokeData.abilities}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row">
                    <PokemonStats pokemonStats={pokeData.stats} />
                    <div>
                        <div>
                            <p>Type</p>
                            <PokemonType types={transformedTypes} />
                        </div>
                        <PokemonTypeEffectiveness
                            pokemonType={pokeData.types}
                        />
                    </div>
                </div>
            </div>
            {pokeSpecies && (
                <PokemonEvolutions
                    evolutionChain={pokeSpecies.evolution_chain}
                />
            )}

            <Link to="/pokedex">Explore more pokemons</Link>
        </main>
    );
}

export default Pokemon;
