import PokemonCategory from '../components/PokemonCategory';
import PokemonAbilities from '../components/PokemonAbilities';
import PokemonGender from '../components/PokemonGender';

function PokemonDetails({ pokemonData, pokemonSpecies }) {
    return (
        <div className="mb-5 grid grid-cols-2 gap-2 rounded-xl bg-[#30a7d7] p-3">
            <div className="flex flex-col">
                <span className="text-lg font-bold text-white">Height</span>
                <span>{pokemonData.height}</span>
            </div>
            {pokemonSpecies && (
                <PokemonCategory pokemonCategory={pokemonSpecies.genera} />
            )}
            <div className="flex flex-col">
                <span className="text-lg font-bold text-white">Weight</span>
                <span>{pokemonData.weight}</span>
            </div>
            {pokemonData && (
                <PokemonAbilities pokemonAbilities={pokemonData.abilities} />
            )}
            {pokemonSpecies && (
                <PokemonGender
                    genderDifferences={pokemonSpecies.has_gender_differences}
                    genderRate={pokemonSpecies.gender_rate}
                />
            )}
        </div>
    );
}

export default PokemonDetails;
