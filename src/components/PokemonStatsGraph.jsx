function PokemonStatsGraph({ pokemonStats }) {
    const createStatColumn = (key, index, stat) => {
        const newElements = [];
        for (let i = 1; i <= 15; i++) {
            newElements.push(
                <li
                    key={`${key}-${index}-${i}`}
                    className="relative z-20 h-3 w-full border-b-4 border-[#a4a4a4] bg-transparent last-two-2:h-2 last-two-2:border-0"
                ></li>
            );
        }

        const grafStats = Math.round(stat / 2);

        newElements.push(
            <li
                key={`${key}-${index}-graph`}
                style={{ height: `${grafStats}%` }}
                className={`absolute bottom-0 z-10 w-full border-[#a4a4a4] bg-gray-700`}
            ></li>
        );

        return newElements;
    };

    return (
        <div className="flex flex-col justify-around rounded-md bg-[#a4a4a4] p-5">
            <span className="mb-4">Stats</span>
            <ul className="grid grid-cols-6 gap-1">
                {pokemonStats.map((stat, index) => (
                    <li
                        className="flex flex-col items-center"
                        key={stat.stat.name}
                    >
                        <ul className="grid-rows-15 relative isolate mb-1 grid w-full bg-white">
                            {createStatColumn(
                                stat.stat.name,
                                index,
                                stat.base_stat
                            )}
                        </ul>
                        <span className="text-center font-karla text-[10px] capitalize">
                            {stat.stat.name}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PokemonStatsGraph;
