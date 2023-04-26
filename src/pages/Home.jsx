import { Link } from 'react-router-dom';
import homeBannerMob from '../assets/homepage/home-banner-mob.png';
import homeBannerTab from '../assets/homepage/home-banner-tab.png';
import homeBannerDesk from '../assets/homepage/home-banner-desk.png';

function Home() {
    return (
        <main className="flex-grow bg-gradient-to-b from-theme-third to-theme-primary px-7 ">
            <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-center pb-7 pt-11 lg:flex-row-reverse lg:justify-between">
                <picture>
                    <source
                        srcSet={homeBannerDesk}
                        media="(min-width: 1440px)"
                        width="792"
                        height="719"
                    />
                    <source
                        srcSet={homeBannerTab}
                        media="(min-width: 768px)"
                        width="726"
                        height="551"
                    />
                    <img
                        src={homeBannerMob}
                        width="375"
                        height="300"
                        alt="Happy Pikachu and pokeballs"
                        fetchpriority="high"
                    />
                </picture>
                <div className="flex flex-col items-center justify-center px-7 lg:max-w-lg lg:items-start lg:px-0">
                    <h1 className="text-center font-karla text-[42px] leading-[49px] tracking-[4px] md:text-7xl md:leading-[84px] lg:text-left">
                        <b>Find</b> all your favorite <b>Pokemon</b>
                    </h1>
                    <p className="mb-11 text-center font-karla text-2xl leading-7 md:text-2xl md:leading-7 lg:text-left">
                        You can know the type of Pokemon, its strengths,
                        disadvantages and abilities
                    </p>
                    <Link
                        className="w-full rounded-[11px] bg-[#73D677] px-7 pb-4 pt-3 text-center font-karla font-bold shadow-[inset_0px_-9px_0px_rgba(0,0,0,0.18)] md:w-auto lg:text-left"
                        to="/pokedex"
                    >
                        See pokemons
                    </Link>
                </div>
            </div>
        </main>
    );
}

export default Home;
