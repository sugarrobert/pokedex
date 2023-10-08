import { Link } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

function PrimaryLink({ linkTo, linkText, className }) {
    return (
        <Link
            className={twMerge(
                `relative block w-fit text-xl after:absolute after:block after:h-[2px] after:w-full after:origin-center after:scale-x-0 after:bg-black after:transition after:duration-300 after:content-[''] after:hover:scale-x-100 ${className}`
            )}
            to={linkTo}
        >
            {linkText}
        </Link>
    );
}

export default PrimaryLink;
