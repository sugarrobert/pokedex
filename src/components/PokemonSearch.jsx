import { useState, useEffect } from 'react';
import debounce from '../utils/debounce';

function PokemonSearch({ pokemonCount }) {
    const [pokemonList, setPokemonList] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [getPokemons, setGetPokemons] = useState(false);

    useEffect(() => {
        // fetch the initial list of pokemons only when getPokemons is true
        if (getPokemons) {
            const url = `https://pokeapi.co/api/v2/pokemon/?limit=${pokemonCount}`;

            fetch(url)
                .then((res) => res.json())
                .then(function (data) {
                    const list = data.results;

                    const nameList = list.map((pokemon) => {
                        return String(pokemon.name);
                    });

                    setPokemonList(nameList);
                });

            setGetPokemons(false);
        }
    }, [getPokemons]);

    const getPokemonList = () => {
        // set getPokemons to true only when the pokemonList is empty
        if (pokemonList.length === 0) {
            setGetPokemons(true);
        }
    };

    // debounce the searchPokemons function to run only once every 300 milliseconds
    const searchPokemons = debounce((e) => {
        const searchValue = e.target.value.toLowerCase();

        const results = pokemonList.filter((pokeName) => {
            if (
                searchValue !== '' &&
                searchValue.length >= 3 &&
                pokeName.toLowerCase().includes(searchValue)
            ) {
                return pokeName;
            }
        });

        setSearchResults(results);
    }, 300);

    return (
        <div className="relative isolate z-[2] mb-4 w-full">
            <label htmlFor="search-pokemons" className="sr-only">
                Find your pokemon
            </label>
            <input
                type="search"
                id="search-pokemons"
                onClick={getPokemonList}
                onChange={searchPokemons}
                placeholder="Find your pokemon..."
                className="relative z-[2] w-full rounded-[40px] bg-theme-white px-5 py-2 shadow-[4px_4px_4px_rgba(33,33,33,0.1)]"
            />
            <ul
                className={`absolute top-[20px] z-[1] grid w-full origin-top scale-y-0 gap-4 bg-theme-white px-5 pb-5 pt-7 text-sm shadow-sm transition-transform ${
                    searchResults.length ? 'scale-y-100' : ''
                } ${searchResults.length > 10 ? 'grid-cols-2' : ''}`}
            >
                {searchResults.map((result, index) => {
                    if (index < 20) {
                        return (
                            <li key={index} className="capitalize">
                                {result}
                            </li>
                        );
                    }
                })}
            </ul>
        </div>
    );
}

export default PokemonSearch;
