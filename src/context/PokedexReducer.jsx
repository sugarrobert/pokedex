const gridReducer = (state, action) => {
    switch (action.type) {
        case 'SET_POKEMON_LIST':
            return {
                ...state,
                pokemonsList: action.payload,
            };
        case 'UPDATE_POKEMON_LIST':
            return {
                ...state,
                pokemonsList: [...state.pokemonsList, ...action.payload],
            };
        case 'SET_FILTERED_POKEMON_LIST':
            return {
                ...state,
                filteredPokemonsList: action.payload,
            };
        case 'UPDATE_FILTERED_POKEMON_LIST':
            return {
                ...state,
                pokemonsList: [
                    ...state.filteredPokemonsList,
                    ...action.payload,
                ],
            };
        default:
            return state;
    }
};

export default gridReducer;
