import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

interface RatingProps {
    value: number;
    max?: number;
}

function Rating({ value, max = 5 }: RatingProps) {
    const stars = [];

    let rounded: number;
    const decimal = value % 1;
    const STAR_COLOR = "#FFD700";

    if (decimal < 0.5) {
        rounded = Math.floor(value);
    } else if (decimal >= 0.5 && decimal < 0.8) {
        rounded = Math.floor(value) + 0.5;
    } else {
        rounded = Math.ceil(value);
    }

    for (let i = 1; i <= max; i++) {
        if (i <= Math.floor(rounded)) {
            stars.push(<FaStar size={20} key={i} color={STAR_COLOR} />);
        } else if (i - 0.5 === rounded) {
            stars.push(<FaStarHalfAlt size={20} key={i} color={STAR_COLOR} />);
        } else {
            stars.push(<FaRegStar size={20} key={i} color={STAR_COLOR} />);
        }
    }

    return <div className="rating">{stars}</div>;
}

export default Rating;
