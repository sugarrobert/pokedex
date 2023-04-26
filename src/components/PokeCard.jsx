import React from 'react';
import homeBannerMob from '../assets/homepage/home-banner-mob.png';

function PokeCard(pokemon) {
    // console.log(pokemon.pokemon);

    const { name, types, stats } = pokemon.pokemon;

    return (
        <li className="mb-6 grid grid-cols-[1fr_2fr] overflow-hidden rounded-lg  bg-theme-white pl-6 shadow-[4px_4px_16px_rgba(1,28,64,0.2)]">
            <div className="relative py-3">
                <div className="absolute">
                    <p className="mb-3 font-karla text-lg font-bold capitalize">
                        {name}
                    </p>
                    <div className="mb-3 flex flex-row gap-3">
                        <div className="flex flex-col items-center">
                            <span className="mb-2 flex h-9 w-9 items-center justify-center rounded-[50%] border-[3px] border-theme-dark font-karla text-base">
                                419
                            </span>
                            <span className="font-karla text-xs text-[#4b4b4b]">
                                Attack
                            </span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="mb-2 flex h-9 w-9 items-center justify-center rounded-[50%] border-[3px] border-theme-dark font-karla text-base">
                                49
                            </span>
                            <span className="font-karla text-xs text-[#4b4b4b]">
                                Defense
                            </span>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <span className="rounded-[11px] bg-[#73D677] px-2 pb-1 pt-1 text-center font-karla text-xs font-bold shadow-[inset_0px_-2px_0px_rgba(0,0,0,0.18)]">
                            Grass
                        </span>
                        <span className="rounded-[11px] bg-[#73D677] px-2 pb-1 pt-1 text-center font-karla text-xs font-bold shadow-[inset_0px_-2px_0px_rgba(0,0,0,0.18)]">
                            Poison
                        </span>
                    </div>
                </div>
            </div>
            <div className="bg-fire">
                <img src={homeBannerMob} alt="" />
            </div>
        </li>
    );
}

export default PokeCard;
