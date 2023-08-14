import logo from '../assets/logo.svg';

function Footer() {
    return (
        <footer className="sticky top-[100vh] z-[1] mx-auto flex w-full items-center justify-center bg-theme-dark px-7 py-5 shadow-inner">
            <img
                src={logo}
                alt="Pokemon Logo"
                width="100"
                height="40"
                className="stroke-black"
            />
        </footer>
    );
}

export default Footer;
