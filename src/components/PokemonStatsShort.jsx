import React from 'react';

function PokemonStatsShort({ pokemonStats }) {
    return (
        <div className="flex flex-row justify-around">
            <span>Stats</span>
            {pokemonStats.map((stat) => {
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
            })}
        </div>
    );
}

export default PokemonStatsShort;
