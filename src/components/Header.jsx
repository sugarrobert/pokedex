import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.svg';

function header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeItem, setActiveItem] = useState('home');
    const location = useLocation();

    useEffect(() => {
        // Close the off-canvas menu when the route changes
        setMenuOpen(false);

        // Set active item based on current location pathname
        switch (location.pathname) {
            case '/pokedex':
                setActiveItem('pokedex');
                break;
            case '/legendaries':
                setActiveItem('legendaries');
                break;
            case '/documentation':
                setActiveItem('documentation');
                break;
            default:
                setActiveItem('home');
                break;
        }
    }, [location.pathname]);

    // toggle menu open/closed
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <>
            <header className="z-[3] bg-theme-third shadow-md">
                <nav className="relative mx-auto flex max-w-[1440px] flex-row items-center justify-between px-7 pb-3 pt-5">
                    <img
                        src={logo}
                        alt="Pokemon Logo"
                        width="158"
                        height="63"
                        className="w-14 md:h-11 md:w-28"
                    />
                    <button
                        className="menu-trigger group relative md:hidden"
                        onClick={toggleMenu}
                        title="Menu trigger"
                        type="button"
                    >
                        <div className="flex h-[22px] w-[30px] flex-col justify-between overflow-hidden">
                            <div className="h-[5px] w-7 rounded-sm bg-black"></div>
                            <div className="h-[5px] w-7 rounded-sm bg-black"></div>
                            <div className="h-[5px] w-7 rounded-sm bg-black"></div>
                        </div>
                    </button>
                    <ul
                        id="menu-container"
                        className={`menu-container lg: absolute left-0 right-0 top-0 z-[3] flex flex-col items-center justify-between rounded-b-2xl bg-gradient-to-b from-theme-third to-theme-primary pb-[47px] pt-[37px] shadow-md transition-transform md:static md:transform-none md:flex-row md:bg-none md:pb-0 md:pt-0 md:shadow-none ${
                            menuOpen ? 'translate-y-0' : 'translate-y-[-110%]'
                        }`}
                    >
                        <li className="md:hidden">
                            <img
                                src={logo}
                                alt="Pokemon Logo"
                                width="138"
                                height="51"
                                className="mb-[36px]"
                            />
                        </li>
                        <li
                            className={`mb-4 border-b-[3px] border-solid pb-2 text-2xl md:mr-[42px] md:pb-4 ${
                                activeItem === 'home'
                                    ? 'border-theme-dark'
                                    : 'border-transparent'
                            }`}
                        >
                            <Link to="/">Home</Link>
                        </li>
                        <li
                            className={`mb-4 border-b-[3px] border-solid pb-2 text-2xl md:mr-[42px] md:pb-4 ${
                                activeItem === 'pokedex'
                                    ? 'border-theme-dark'
                                    : 'border-transparent'
                            }`}
                        >
                            <Link to="/pokedex">Pokedex</Link>
                        </li>
                        <li
                            className={`mb-4 border-b-[3px] border-solid pb-2 text-2xl md:mr-[42px] md:pb-4 ${
                                activeItem === 'legendaries'
                                    ? 'border-theme-dark'
                                    : 'border-transparent'
                            }`}
                        >
                            <Link to="/legendaries">Legendaries</Link>
                        </li>
                        <li
                            className={`mb-4 border-b-[3px] border-solid pb-2 text-2xl md:pb-4 ${
                                activeItem === 'documentation'
                                    ? 'border-theme-dark'
                                    : 'border-transparent'
                            }`}
                        >
                            <Link to="/documentation">Documentation</Link>
                        </li>
                    </ul>
                </nav>
            </header>
            <div
                id="menu-overlay"
                className={`menu-overlay fixed bottom-0 top-0 z-[2] w-full bg-theme-dark opacity-50 ${
                    menuOpen ? '' : 'hidden'
                }`}
                onClick={toggleMenu}
            ></div>
        </>
    );
}

export default header;
