import { Link, useLocation } from "react-router-dom";
import { MenuCocktail } from "@/features/cocktails/menu/menuTypes";
import { getDrinkImage } from "@/features/cocktails/utils/cocktailUtils";

// lets the details page link back to the same search / filters
export type RecipesLinkState = {
    recipesSearch: string;
};

type CocktailCardProps = {
    cocktail: MenuCocktail;
};

function CocktailCard({ cocktail }: CocktailCardProps) {
    const location = useLocation();
    const linkState: RecipesLinkState = { recipesSearch: location.pathname === "/recipes" ? location.search : "" };
    const ingredientCount = cocktail.ingredients.length;

    return (
        <li className="cocktail-card">
            <Link className="cocktail-card__link" to={`/recipes/${cocktail.id}`} state={linkState}>
                <div className="cocktail-card__media">
                    <img
                        className="cocktail-card__img"
                        src={getDrinkImage(cocktail.thumb, "medium")}
                        alt=""
                        loading="lazy"
                        width={350}
                        height={350}
                    />
                    {cocktail.isIbaClassic && <span className="cocktail-card__badge">IBA Classic</span>}
                </div>
                <div className="cocktail-card__body">
                    <span className="cocktail-card__category">{cocktail.categoryLabel}</span>
                    <h3 className="cocktail-card__title">{cocktail.name}</h3>
                    <p className="cocktail-card__meta">
                        {cocktail.glass} · {ingredientCount} {ingredientCount === 1 ? "ingredient" : "ingredients"}
                    </p>
                </div>
            </Link>
        </li>
    );
}

export default CocktailCard;
