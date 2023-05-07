import { useState, useEffect, useRef, useContext } from 'react';
import PokedexContext from '../context/PokedexContext';

function Filters() {
    const { dispatch } = useContext(PokedexContext);
    const [activeFilters, setActiveFilters] = useState([]);
    const [filtersOpen, setFiltersOpen] = useState(false);
    const [pokemonType, setPokemonType] = useState([]);
    const shouldGetTypes = useRef(true);

    useEffect(() => {
        if (shouldGetTypes.current) {
            fetch('https://pokeapi.co/api/v2/type/')
                .then((res) => res.json())
                .then(function (data) {
                    data.results.map((type) => {
                        setPokemonType((prevType) => [...prevType, type]);
                    });
                });
            shouldGetTypes.current = false;
        }
    }, [shouldGetTypes.current]);

    useEffect(() => {
        const fetchData = async () => {
            const fetches = activeFilters.map(async (item) => {
                const url = `https://pokeapi.co/api/v2/type/${item}`;

                const response = await fetch(url);
                return response.json();
            });

            const responses = await Promise.all(fetches);

            const pokemonsFetches = responses.map((item) =>
                item.pokemon.map((newItem) => fetchPokemonData(newItem.pokemon))
            );

            const nestedResponses = await Promise.all(
                pokemonsFetches.map((promises) => Promise.all(promises))
            );

            const mergedResponses = nestedResponses.flat();

            const sortedArray = mergedResponses.sort(
                (a, b) => a.order - b.order
            );

            dispatch({
                type:
                    activeFilters.length <= 1
                        ? 'SET_FILTERED_POKEMON_LIST'
                        : 'UPDATE_FILTERED_POKEMON_LIST',
                payload: sortedArray,
            });
        };

        fetchData();
    }, [activeFilters]);

    const fetchPokemonData = (pokemon) => {
        let url = pokemon.url;

        return fetch(url)
            .then((res) => res.json())
            .then((data) => data);
    };

    // toggle filters open/closed
    const toggleFilters = () => {
        setFiltersOpen(!filtersOpen);
    };

    const setFilters = (e) => {
        const newFilter = e.target.id;
        const isChecked = e.target.checked;

        if (isChecked) {
            setActiveFilters((prevFilters) => [...prevFilters, newFilter]);
        } else {
            setActiveFilters((prevFilters) =>
                prevFilters.filter((filter) => filter !== newFilter)
            );
        }
    };

    return (
        <div className="mb-8">
            <button
                type="button"
                className="min-w-[77px] rounded-lg bg-theme-white px-3 py-1 text-xs shadow-[2px_2px_2px_rgba(33,33,33,0.1)]"
                onClick={toggleFilters}
            >
                Filter
            </button>
            <div
                id="filters-container"
                className={`absolute left-0 right-0 top-0 z-[3] flex flex-col justify-between rounded-b-2xl bg-gradient-to-b from-theme-third to-theme-primary px-7 pb-6 pt-8 shadow-md transition-transform md:static md:transform-none md:flex-row md:bg-none md:pb-0 md:pt-0 md:shadow-none ${
                    filtersOpen ? 'translate-y-0' : 'translate-y-[-110%]'
                }`}
            >
                <button
                    type="button"
                    className="absolute right-6 top-5"
                    onClick={toggleFilters}
                    title="Close"
                >
                    <span className="sr-only">Close</span>
                    <svg
                        width="31"
                        height="31"
                        viewBox="0 0 31 31"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <rect
                            width="34.6239"
                            height="8.99322"
                            rx="3"
                            transform="matrix(0.710717 0.703479 -0.710717 0.703479 6.39221 0.316345)"
                            fill="#212121"
                        />
                        <rect
                            width="34.6239"
                            height="8.99322"
                            rx="3"
                            transform="matrix(-0.710717 0.703478 -0.710716 -0.703479 30.9994 6.32648)"
                            fill="#212121"
                        />
                    </svg>
                </button>
                <div className="mb-5 border-b-2 border-theme-white pb-5">
                    <p className="mb-5 text-2xl">Type</p>
                    <ul className="grid grid-cols-3 gap-x-5 gap-y-2">
                        {pokemonType.map((type) => (
                            <li
                                className="group/type cursor-pointer"
                                key={type.name}
                            >
                                <input
                                    className="mr-2 cursor-pointer checked:accent-theme-danger"
                                    type="checkbox"
                                    name={type.name}
                                    id={type.name}
                                    onChange={setFilters}
                                />
                                <label
                                    className="cursor-pointer border-b-2 border-transparent capitalize group-hover/type:border-theme-second"
                                    htmlFor={type.name}
                                >
                                    {type.name}
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div
                id="filters-overlay"
                className={`fixed bottom-0 left-0 top-0 z-[2] w-full bg-theme-dark opacity-50 ${
                    filtersOpen ? '' : 'hidden'
                }`}
                onClick={toggleFilters}
            ></div>
        </div>
    );
}

export default Filters;
