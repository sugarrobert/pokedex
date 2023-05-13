const gridReducer = (state, action) => {
    switch (action.type) {
        case 'SET_POKEMON_LIST':
            return {
                ...state,
                pokemonsList: action.payload,
            };
        case 'UPDATE_POKEMON_LIST':
            const newPokemonList = [
                ...state.pokemonsList,
                ...new Set(action.payload),
            ];
            newPokemonList.sort((a, b) => a.order - b.order);
            return {
                ...state,
                pokemonsList: newPokemonList,
            };
        case 'SET_FILTERED_POKEMON_LIST':
            return {
                ...state,
                filteredPokemonsList: action.payload,
            };
        case 'UPDATE_FILTERED_POKEMON_LIST':
            const originalPokemons = [
                ...state.filteredPokemonsList,
                ...action.payload,
            ];

            originalPokemons.sort((a, b) => {
                // If both items have order -1, preserve their order in the array
                if (a.order === -1 && b.order === -1) {
                    return 0;
                }
                // If only a has order -1, move it to the end of the array
                if (a.order === -1) {
                    return 1;
                }
                // If only b has order -1, move it to the end of the array
                if (b.order === -1) {
                    return -1;
                }
                // Otherwise, sort by their order property
                return a.order - b.order;
            });

            const newFilteredPokemonList = [
                ...new Set(originalPokemons.map((p) => p.name)),
            ].map((name) => {
                return originalPokemons.find((p) => p.name === name);
            });

            return {
                ...state,
                filteredPokemonsList: newFilteredPokemonList,
            };
        default:
            return state;
    }
};

export default gridReducer;
