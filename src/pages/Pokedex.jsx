import { useState, useEffect, useRef } from 'react';
import PokeCard from '../components/PokeCard';

function Pokedex() {
    const [pokemons, setPokemons] = useState([]);
    const [nextPage, setNextPage] = useState(null);
    const [prevPage, setPrevPage] = useState(null);
    const [page, setPage] = useState(0);
    const [pokemonCount, setPokemonCount] = useState(null);
    const [url, setUrl] = useState('https://pokeapi.co/api/v2/pokemon/');
    const shouldFetch = useRef(true);

    useEffect(() => {
        if (shouldFetch.current) {
            fetch(url)
                .then((res) => res.json())
                .then(function (data) {
                    const fetches = data.results.map((pokemon) =>
                        fetchPokemonData(pokemon)
                    );
                    Promise.all(fetches).then((newPokemons) => {
                        const sortedArray = newPokemons.sort(
                            (a, b) => a.order - b.order
                        );

                        setPokemons((prevPokemons) => [
                            ...prevPokemons,
                            ...sortedArray,
                        ]);
                        setPokemonCount(data.count);
                        setNextPage(data.next);
                        setPrevPage(data.previous);
                        setPage((prevPage) => prevPage + 1);
                    });
                });
            shouldFetch.current = false;
        }
    }, [shouldFetch.current]);

    const fetchPokemonData = (pokemon) => {
        let url = pokemon.url;

        return fetch(url)
            .then((res) => res.json())
            .then((data) => data);
    };

    const loadMore = () => {
        setUrl(nextPage);
        shouldFetch.current = true;
    };

    return (
        <>
            <main className="mx-auto flex w-full max-w-[1440px] flex-grow flex-col items-start px-7">
                <div className="mx-auto max-w-[1440px] pb-7 pt-11">
                    <h1 className="text-center font-karla text-2xl tracking-[4px]">
                        800 <b>Pokemons</b> for you to choose your favorite
                    </h1>
                </div>

                <div className="mb-4 w-full">
                    <label htmlFor="search-pokemons" className="sr-only">
                        Find your pokemon
                    </label>
                    <input
                        type="text"
                        id="search-pokemons"
                        placeholder="Find your pokemon..."
                        className="w-full rounded-[40px] bg-theme-white px-5 py-2 shadow-[4px_4px_4px_rgba(33,33,33,0.1)]"
                    />
                </div>
                <div className="mb-8">
                    <button className="min-w-[77px] rounded-lg bg-theme-white px-3 py-1 text-xs shadow-[2px_2px_2px_rgba(33,33,33,0.1)]">
                        Filter
                    </button>
                </div>
                <ul className="mb-6 grid w-full gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-9">
                    {pokemons.map((pokemon, index) => (
                        <PokeCard
                            pokemon={pokemon}
                            key={index}
                            id={index}
                        ></PokeCard>
                    ))}
                </ul>
                <button
                    className="mx-auto mb-5 w-full  rounded-[11px] bg-[#73D677] px-7 pb-4 pt-3 text-center font-karla font-bold shadow-[inset_0px_-9px_0px_rgba(0,0,0,0.18)] md:w-auto lg:text-left"
                    onClick={loadMore}
                >
                    Load more
                </button>
            </main>
        </>
    );
}

export default Pokedex;
