import { CocktailIngredient } from "../../../types/cocktails/Cocktail";
import { getIngredientImage } from "../utils/cocktailUtils";

type IngredientListProps = {
    ingredients: CocktailIngredient[];
};

function IngredientList({ ingredients }: IngredientListProps) {
    return (
        <ul className="ingredient-list">
            {ingredients.map((ingredient, index) => (
                <li key={`${ingredient.name}-${index}`} className="ingredient-list__item">
                    <img
                        className="ingredient-list__img"
                        src={getIngredientImage(ingredient.name)}
                        alt=""
                        loading="lazy"
                        width={56}
                        height={56}
                    />
                    <span className="ingredient-list__name">{ingredient.name}</span>
                    {ingredient.measure && <span className="ingredient-list__measure">{ingredient.measure}</span>}
                </li>
            ))}
        </ul>
    );
}

export default IngredientList;
