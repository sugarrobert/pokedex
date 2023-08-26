import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PokemonType from './PokemonType';
import PokemonImage from './PokemonImage';
import { transformTypesResponse } from '../helpers/TransformTypesResponse';

export default function PokemonEvolutionsCard({ evolution, spanTwo }) {
    const [transformedTypes, setTransformedTypes] = useState([]);

    useEffect(() => {
        setTransformedTypes(transformTypesResponse(evolution.types));
    }, [evolution]);

    return (
        <>
            <Link
                className={`flex flex-col items-center ${
                    spanTwo ? 'col-span-2' : ''
                }`}
                to={`/pokemon/${evolution.name}/${evolution.id}`}
            >
                <PokemonImage
                    sprites={evolution.sprites}
                    width={160}
                    height={160}
                    alt={evolution.name}
                    className={
                        'aspect-square rounded-full border-4 border-white bg-[#616161] object-contain shadow-[0_4px_4px_0_rgba(33,33,33)] md_max:h-32 md_max:w-32'
                    }
                />
                <div className="my-3 text-lg">
                    <span className="pr-2 capitalize text-white">
                        {evolution.name}
                    </span>
                    <span className="text-gray-400">
                        #{evolution.id.toString().padStart(4, '0')}
                    </span>
                </div>
                <PokemonType
                    types={transformedTypes}
                    className={'text-white md:px-4'}
                />
            </Link>
        </>
    );
}
