import { Link } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

function PrimaryBtnLink({ linkTo, linkText, className }) {
    return (
        <Link
            className={twMerge(
                `w-full rounded-[11px] bg-[#73D677] px-7 pb-4 pt-3 text-center font-karla font-bold shadow-[inset_0px_-9px_0px_rgba(0,0,0,0.18)] transition-all hover:translate-y-1 hover:shadow-[inset_0px_-4px_0px_rgba(0,0,0,0.18)] md:w-auto lg:text-left ${className}`
            )}
            to={linkTo}
        >
            {linkText}
        </Link>
    );
}

export default PrimaryBtnLink;
