import { Link, useLocation } from "react-router-dom";
import { CocktailSummary } from "../../../types/cocktails/Cocktail";
import { getDrinkImage } from "../utils/cocktailUtils";

// lets the details page link back to the same search / category
export type RecipesLinkState = {
    recipesSearch: string;
};

type CocktailCardProps = {
    cocktail: CocktailSummary;
};

function CocktailCard({ cocktail }: CocktailCardProps) {
    const location = useLocation();
    const linkState: RecipesLinkState = { recipesSearch: location.search };

    return (
        <li className="cocktail-card">
            <Link className="cocktail-card__link" to={`/recipes/${cocktail.idDrink}`} state={linkState}>
                <img
                    className="cocktail-card__img"
                    src={getDrinkImage(cocktail.strDrinkThumb, "medium")}
                    alt=""
                    loading="lazy"
                    width={350}
                    height={350}
                />
                <h3 className="cocktail-card__title">{cocktail.strDrink}</h3>
            </Link>
        </li>
    );
}

export default CocktailCard;
