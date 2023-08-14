import femaleIcon from '../assets/icons/femaleIcon.svg';
import maleIcon from '../assets/icons/maleIcon.svg';

function PokemonGender({ genderDifferences, genderRate }) {
    let icons = [];

    const femaleImg = (
        <img
            src={femaleIcon}
            width="30"
            height="30"
            key="FemaleIcon"
            alt="Female gender symbol"
        />
    );

    const maleImg = (
        <img
            src={maleIcon}
            width="30"
            height="30"
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
        <div>
            <span>Gender</span>
            <div className="flex flex-row">{icons}</div>
        </div>
    );
}

export default PokemonGender;
