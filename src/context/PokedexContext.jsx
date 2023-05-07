import { createContext, useReducer } from 'react';
import pokedexReducer from './PokedexReducer';

const PokedexContext = createContext();

export const PokedexTemplateProvider = ({ children }) => {
    const initialState = {
        pokemonsList: [],
        filteredPokemonsList: [],
    };

    const [state, dispatch] = useReducer(pokedexReducer, initialState);

    return (
        <PokedexContext.Provider
            value={{
                ...state,
                dispatch,
            }}
        >
            {children}
        </PokedexContext.Provider>
    );
};

export default PokedexContext;
