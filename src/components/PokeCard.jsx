import React from 'react';
import { Link } from 'react-router-dom';
import PokemonType from './PokemonType';
import PokemonImage from './PokemonImage';
import { transformTypesResponse } from '../helpers/TransformTypesResponse';
import { twMerge } from 'tailwind-merge';

function PokeCard(pokemon) {
    const { name, types, stats, sprites, id } = pokemon.pokemon;

    const transformedTypes = transformTypesResponse(types);

    const getPokemonType = () => {
        return types
            .map((type) => (type.slot === 1 ? type.type.name : null))
            .filter((name) => name !== null)
            .join(' ');
    };

    // bg-normal bg-fire bg-fighting bg-water bg-flying bg-grass shadow-grass bg-poison bg-electric bg-ground bg-psychic bg-rock bg-ice bg-bug bg-dragon bg-ghost bg-dark bg-steel bg-fairy
    // hover:shadow-normal hover:shadow-fire hover:shadow-fighting hover:shadow-water hover:shadow-flying hover:shadow-grass shadow-grass hover:shadow-poison hover:shadow-electric hover:shadow-ground hover:shadow-psychic hover:shadow-rock hover:shadow-ice hover:shadow-bug hover:shadow-dragon hover:shadow-ghost hover:shadow-dark hover:shadow-steel hover:shadow-fairy
    return (
        <li
            className={twMerge(
                `relative isolate grid min-h-[165px] grid-cols-[1fr_2fr] overflow-hidden rounded-lg pl-6 shadow-[4px_4px_16px_rgba(1,28,64,0.2)] transition  hover:shadow-theme-white hover:shadow-${getPokemonType()} hover:scale-105`
            )}
        >
            <div className="relative z-[1] py-3">
                <div className="absolute top-1/2 -translate-y-1/2 transform">
                    <p className="mb-3 font-karla text-lg font-bold capitalize">
                        {name}
                    </p>
                    <div className="mb-3 flex flex-row gap-3">
                        {stats.map((stat) => {
                            if (
                                stat.stat.name === 'attack' ||
                                stat.stat.name === 'defense'
                            ) {
                                return (
                                    <div
                                        className="flex flex-col items-center"
                                        key={stat.stat.name}
                                    >
                                        <span className="mb-2 flex h-9 w-9 items-center justify-center rounded-[50%] border-[3px] border-theme-dark font-karla text-base">
                                            {stat.base_stat}
                                        </span>
                                        <span className="font-karla text-xs capitalize text-[#4b4b4b]">
                                            {stat.stat.name}
                                        </span>
                                    </div>
                                );
                            }
                        })}
                    </div>
                    <PokemonType
                        types={transformedTypes}
                        className={'flex-nowrap'}
                        wrap={false}
                    />
                </div>
            </div>
            <div
                className={`bg-${getPokemonType()} relative flex items-center justify-center`}
            >
                <PokemonImage
                    sprites={sprites}
                    width={160}
                    height={160}
                    alt={name}
                    className={'aspect-square'}
                />
            </div>
            <Link
                className="absolute inset-0 z-10"
                to={`/pokemon/${name}/${id}`}
            ></Link>
        </li>
    );
}

export default PokeCard;
