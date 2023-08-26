import { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import PokemonType from '../components/PokemonType';
import PokemonFlavorText from '../components/PokemonFlavorText';
import PokemonTypeEffectiveness from '../components/PokemonTypeEffectiveness';
import PokemonEvolutions from '../components/PokemonEvolutions';
import PokemonStatsGraph from '../components/PokemonStatsGraph';
import PokemonDetails from '../components/PokemonDetails';
import PrimaryBtnLink from '../components/buttons/PrimaryBtnLink';
import PokemonImage from '../components/PokemonImage';
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
        <main className="mx-auto my-14 w-full max-w-7xl">
            <div className="relative grid grid-cols-4 grid-rows-[repeat(2,_60px)] gap-x-1 pb-7">
                {prevPoke !== null && (
                    <Link
                        to={`/pokemon/${prevPoke.name}/${prevPoke.id}`}
                        onClick={(shouldFetch.current = true)}
                        className="group/link-btn-prev relative col-start-1 col-end-3 row-span-2 grid grid-rows-[repeat(2,_60px)]  items-center bg-[#a4a4a4] pr-1 font-karla text-xl font-bold text-white transition-all after:absolute after:left-2 after:row-start-1 after:row-end-2 after:flex after:h-7 after:w-7 after:items-center after:justify-center after:rounded-full after:bg-white after:p-2 after:text-[#a4a4a4] after:content-['<'] hover:bg-theme-third hover:text-black hover:after:text-black"
                    >
                        <div className="row-start-1 row-end-2 md:pl-14 md_max:ml-auto">
                            <span>
                                #{prevPoke.id.toString().padStart(4, '0')}
                            </span>
                            <span className="capitalize md:pl-2 md_max:sr-only">
                                {prevPoke.name}
                            </span>
                        </div>
                        <div className="absolute row-start-2 row-end-3 inline-grid h-full w-full bg-[#a4a4a4] transition-all group-hover/link-btn-prev:bg-theme-third"></div>
                    </Link>
                )}
                {nextPoke !== null && (
                    <Link
                        to={`/pokemon/${nextPoke.name}/${nextPoke.id}`}
                        onClick={(shouldFetch.current = true)}
                        className="group/link-btn-next relative col-start-3 col-end-5 row-span-2 grid grid-rows-[repeat(2,_60px)]  items-center bg-[#a4a4a4] pl-1 font-karla text-xl font-bold text-white transition-all after:absolute after:right-2 after:row-start-1 after:row-end-2 after:flex after:h-7 after:w-7 after:items-center after:justify-center after:rounded-full after:bg-white after:p-2 after:text-[#a4a4a4] after:content-['>'] hover:bg-theme-third hover:text-black hover:after:text-black"
                    >
                        <div className="row-start-1 row-end-2 md:ml-auto md:pr-14">
                            <span className="capitalize md:pr-2 md_max:sr-only">
                                {nextPoke.name}
                            </span>
                            <span>
                                #{nextPoke.id.toString().padStart(4, '0')}
                            </span>
                        </div>
                        <div className="absolute row-start-2 row-end-3 inline-grid h-full w-full bg-[#a4a4a4] transition-all group-hover/link-btn-next:bg-theme-third"></div>
                    </Link>
                )}
                <div className="absolute col-start-2 col-end-4 row-start-2 row-end-3 flex w-full flex-col items-center justify-center bg-white font-karla text-2xl font-bold before:absolute before:right-[-103px] before:top-[-1px] before:h-[65px] before:w-[105px] before:bg-pokemon-heading-mask before:bg-right-top before:bg-no-repeat after:absolute after:left-[-103px] after:top-[-1px] after:h-[65px] after:w-[105px] after:bg-pokemon-heading-mask after:bg-no-repeat">
                    <h1 className="capitalize">{pokeData.name}</h1>
                    <span className="text-[#616161]">
                        #{pokeData.id.toString().padStart(4, '0')}
                    </span>
                </div>
            </div>
            <div className="flex flex-col gap-5 px-6 md:grid md:grid-cols-2 md:gap-3">
                <div className="flex flex-col md:col-start-1 md:col-end-2">
                    <div className="mb-4 flex-shrink-0 rounded-md bg-[#F2F2F2] p-2">
                        <PokemonImage
                            sprites={pokeData.sprites}
                            width={430}
                            height={430}
                            alt={pokemonName}
                            className={'mx-auto aspect-square'}
                        />
                    </div>
                    <PokemonStatsGraph pokemonStats={pokeData.stats} />
                </div>
                <div className="flex flex-col md:col-start-2 md:col-end-3">
                    {pokeSpecies && (
                        <PokemonFlavorText
                            pokeFlavorText={pokeSpecies.flavor_text_entries}
                        />
                    )}
                    <PokemonDetails
                        pokemonData={pokeData}
                        pokemonSpecies={pokeSpecies}
                    />
                    <div className="flex flex-col">
                        <div className="mb-3 flex flex-col gap-2">
                            <span className="text-lg">Type</span>
                            <PokemonType
                                types={transformedTypes}
                                className={'px-4 py-1 text-sm'}
                            />
                        </div>
                        <PokemonTypeEffectiveness
                            pokemonType={pokeData.types}
                        />
                    </div>
                </div>
                {pokeSpecies && (
                    <div className="mb-6 rounded bg-pokemon-evolution-background px-2 py-5 md:col-start-1 md:col-end-3 md:w-auto md:p-5">
                        <PokemonEvolutions
                            evolutionChain={pokeSpecies.evolution_chain}
                        />
                    </div>
                )}

                <PrimaryBtnLink
                    linkTo={'/pokedex'}
                    linkText={'Explore more pokemons'}
                    className={`ml-auto md:col-start-2 md:col-end-3 md:max-w-sm md:text-center`}
                />
            </div>
        </main>
    );
}

export default Pokemon;
