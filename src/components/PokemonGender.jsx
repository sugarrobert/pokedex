import femaleIcon from '../assets/icons/femaleIcon.svg';
import maleIcon from '../assets/icons/maleIcon.svg';

function PokemonGender({ genderDifferences, genderRate }) {
    let icons = [];

    const femaleImg = (
        <img
            src={femaleIcon}
            width="25"
            height="25"
            key="FemaleIcon"
            alt="Female gender symbol"
        />
    );

    const maleImg = (
        <img
            src={maleIcon}
            width="25"
            height="25"
            key="MaleIcon"
            alt="Male gender symbol"
        />
    );

    const noGender = <span key="noGender">Unknown</span>;

    if (genderDifferences || (genderRate > 0 && genderRate < 8)) {
        icons.push(femaleImg, maleImg);
    } else if (genderRate === 0) {
        icons.push(maleImg);
    } else if (genderRate === 8) {
        icons.push(femaleImg);
    } else {
        icons.push(noGender);
    }

    return (
        <div className="flex flex-col">
            <span className="text-lg font-bold text-white">Gender</span>
            <div className="flex flex-row">{icons}</div>
        </div>
    );
}

export default PokemonGender;
