import { twMerge } from 'tailwind-merge';

export default function PokemonImage({
    sprites,
    alt,
    width,
    height,
    className,
}) {
    return (
        <img
            src={
                sprites.other.dream_world.front_default ||
                sprites.other.home.front_default ||
                sprites.other['official-artwork'].front_default ||
                sprites.front_default
            }
            width={width}
            height={height}
            alt={alt}
            loading="lazy"
            className={twMerge(`max-h-full max-w-full ${className}`)}
        />
    );
}
