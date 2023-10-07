import React from 'react';
import { twMerge } from 'tailwind-merge';

function PokemonType({ types, wrap, className }) {
    return (
        <div className={`flex gap-3 ${wrap ? 'flex-wrap' : 'flex-nowrap'}`}>
            {types.map((type, index) => (
                <span
                    key={type.name + index}
                    className={twMerge(
                        `rounded-[11px] bg-${type.name} px-2 pb-1 pt-1 text-center font-karla text-xs font-bold capitalize shadow-[inset_0px_-2px_0px_rgba(0,0,0,0.18)] ${className}`
                    )}
                >
                    {type.name}
                </span>
            ))}
        </div>
    );
}

export default PokemonType;
