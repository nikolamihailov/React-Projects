import { IoArrowForward } from "react-icons/io5";
import { Link } from "react-router-dom";
import { CocktailIngredient } from "@/types/cocktails/Cocktail";
import { FilterGroupKey } from "@/features/cocktails/menu/menuTypes";
import { getMenuLink } from "@/features/cocktails/menu/menuUtils";
import { getIngredientImage } from "@/features/cocktails/utils/cocktailUtils";

type IngredientListProps = {
    ingredients: CocktailIngredient[];
};

function IngredientList({ ingredients }: IngredientListProps) {
    return (
        <ul className="ingredient-list">
            {ingredients.map((ingredient, index) => (
                <li key={`${ingredient.name}-${index}`}>
                    <Link
                        className="ingredient-list__item"
                        to={getMenuLink(FilterGroupKey.Ingredient, ingredient.name)}
                        aria-label={`${ingredient.measure} ${ingredient.name} - see more drinks with ${ingredient.name}`}
                    >
                        <img
                            className="ingredient-list__img"
                            src={getIngredientImage(ingredient.name)}
                            alt=""
                            loading="lazy"
                            width={56}
                            height={56}
                        />
                        <span className="ingredient-list__text">
                            <span className="ingredient-list__name">{ingredient.name}</span>
                            {ingredient.measure && <span className="ingredient-list__measure">{ingredient.measure}</span>}
                        </span>
                        <IoArrowForward className="ingredient-list__arrow" aria-hidden="true" />
                    </Link>
                </li>
            ))}
        </ul>
    );
}

export default IngredientList;
