import React from 'react';

function PokeCard(pokemon) {
    const { name, types, stats, sprites } = pokemon.pokemon;

    // bg-normal bg-fire bg-fighting bg-water bg-flying bg-grass bg-poison bg-electric bg-ground bg-psychic bg-rock bg-ice bg-bug bg-dragon bg-ghost bg-dark bg-steel bg-fairy
    return (
        <li className="grid min-h-[165px] grid-cols-[1fr_2fr] overflow-hidden rounded-lg bg-theme-white pl-6 shadow-[4px_4px_16px_rgba(1,28,64,0.2)]">
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
                    <div className="flex gap-3">
                        {types.map((type) => (
                            <span
                                key={type.type.name}
                                className={`rounded-[11px] bg-${type.type.name} px-2 pb-1 pt-1 text-center font-karla text-xs font-bold capitalize shadow-[inset_0px_-2px_0px_rgba(0,0,0,0.18)]`}
                            >
                                {type.type.name}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
            <div
                className={`bg-${types
                    .map((type) => (type.slot === 1 ? type.type.name : null))
                    .filter((name) => name !== null)
                    .join(' ')} relative flex items-center justify-center`}
            >
                <img
                    src={sprites.other.dream_world.front_default}
                    width="220"
                    height="220"
                    alt={name}
                    className="absolute max-h-full max-w-full"
                />
            </div>
        </li>
    );
}

export default PokeCard;
