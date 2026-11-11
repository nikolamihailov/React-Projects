import { IoArrowBack } from "react-icons/io5";
import { useLocation, useParams } from "react-router-dom";
import IngredientList from "../features/cocktails/CocktailDetails/IngredientList";
import { RecipesLinkState } from "../features/cocktails/Recipes/CocktailCard";
import { getCocktailIngredients, getDrinkImage } from "../features/cocktails/utils/cocktailUtils";
import Button from "../features/shared/components/UI/Button/Button";
import Section from "../features/shared/components/UI/Section/Section";
import StatusMessage from "../features/shared/components/UI/StatusMessage/StatusMessage";
import { useCocktailById } from "../hooks/cocktails/useCocktailById";

function CocktailDetails() {
    const { id } = useParams();
    const location = useLocation();
    const { data: cocktail, isPending, isError, refetch } = useCocktailById(id);

    // go back to the exact search / category the visitor came from (plain /recipes on a direct visit)
    const linkState = location.state as RecipesLinkState | null;
    const backHref = `/recipes${linkState?.recipesSearch ?? ""}`;

    const renderContent = () => {
        if (isError) {
            return (
                <StatusMessage
                    variant="error"
                    message="We couldn't load this recipe. Check your connection and try again."
                    onRetry={refetch}
                />
            );
        }

        if (isPending) return <StatusMessage variant="loading" message="Fetching the recipe..." />;

        if (!cocktail) return <StatusMessage variant="empty" message="We couldn't find that cocktail." />;

        const tags = [cocktail.strCategory, cocktail.strAlcoholic, cocktail.strIBA].filter(Boolean);

        return (
            <article className="cocktail-details__content">
                <img
                    className="cocktail-details__img"
                    src={getDrinkImage(cocktail.strDrinkThumb, "large")}
                    alt={`${cocktail.strDrink} served in a ${cocktail.strGlass.toLowerCase()}`}
                    width={500}
                    height={500}
                />
                <div className="cocktail-details__info">
                    <ul className="cocktail-details__tags" aria-label="Drink details">
                        {tags.map((tag) => (
                            <li key={tag} className="cocktail-details__tag">
                                {tag}
                            </li>
                        ))}
                    </ul>
                    <h1 className="heading-secondary cocktail-details__name">{cocktail.strDrink}</h1>
                    <p className="cocktail-details__glass">Served in a {cocktail.strGlass.toLowerCase()}</p>

                    <h2 className="heading-tertiary">Ingredients</h2>
                    <IngredientList ingredients={getCocktailIngredients(cocktail)} />

                    <h2 className="heading-tertiary">How to make it</h2>
                    <p className="paragraph cocktail-details__instructions">{cocktail.strInstructions}</p>
                </div>
            </article>
        );
    };

    return (
        <Section sectionClassName="cocktail-details">
            <div className="cocktail-details">
                <Button el="link" type="small" variant="secondary" href={backHref}>
                    <IoArrowBack aria-hidden="true" /> Back to recipes
                </Button>
                {renderContent()}
            </div>
        </Section>
    );
}

export default CocktailDetails;
