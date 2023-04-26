import { useState, useEffect } from 'react';
import PokeCard from '../components/PokeCard';

function Pokedex() {
    const [pokemons, setPokemons] = useState([]);

    useEffect(() => {
        const getPokemons = () => {
            fetch('https://pokeapi.co/api/v2/pokemon/')
                .then((res) => res.json())
                .then(function (data) {
                    data.results.forEach(function (pokemon) {
                        fetchPokemonData(pokemon);
                    });
                });
        };

        getPokemons();
    }, []);

    const fetchPokemonData = (pokemon) => {
        let url = pokemon.url;

        fetch(url)
            .then((res) => res.json())
            .then((data) =>
                setPokemons((prevPokemons) => [...prevPokemons, data])
            );
    };

    return (
        <>
            <main className=" flex-grow px-7">
                <div className="mx-auto max-w-[1440px] pb-7 pt-11">
                    <h1 className="text-center font-karla text-2xl tracking-[4px]">
                        800 <b>Pokemons</b> for you to choose your favorite
                    </h1>
                </div>

                <div className="mb-4">
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
                <ul>
                    {pokemons.map((pokemon) => (
                        <PokeCard
                            pokemon={pokemon}
                            key={pokemon.id}
                            id={pokemon.id}
                        ></PokeCard>
                    ))}
                </ul>
            </main>
        </>
    );
}

export default Pokedex;
