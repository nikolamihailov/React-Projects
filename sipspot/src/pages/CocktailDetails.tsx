import { m } from "framer-motion";
import { IoListOutline, IoChevronForward, IoFlaskOutline, IoWineOutline } from "react-icons/io5";
import { Link, useLocation, useParams } from "react-router-dom";
import IngredientList from "@/features/cocktails/CocktailDetails/IngredientList";
import RelatedCocktails from "@/features/cocktails/CocktailDetails/RelatedCocktails";
import { SPIRIT_GROUPS } from "@/features/cocktails/menu/menuConfig";
import { FilterGroupKey } from "@/features/cocktails/menu/menuTypes";
import { getMenuCategory, getMenuLink, getStrengthOption } from "@/features/cocktails/menu/menuUtils";
import { RecipesLinkState } from "@/features/cocktails/Recipes/CocktailCard";
import { getCocktailIngredients, getDrinkImage } from "@/features/cocktails/utils/cocktailUtils";
import Button from "@/features/shared/components/UI/Button/Button";
import StatusMessage from "@/features/shared/components/UI/StatusMessage/StatusMessage";
import { barInfo } from "@/data/barInfo";
import { useCocktailById } from "@/hooks/cocktails/useCocktailById";

type DrinkTag = {
    label: string;
    href: string | null; // null when the value isn't on our menu, so there's nothing to filter by
};

// "Shake. Strain into a glass." -> ["Shake.", "Strain into a glass."]
const splitIntoSteps = (instructions: string) =>
    instructions
        .split(/(?<=[.!?])\s+/)
        .map((step) => step.trim())
        .filter((step) => step.length > 1);

const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();

function CocktailDetails() {
    const { id } = useParams();
    const location = useLocation();
    const { data: cocktail, isPending, isError, refetch } = useCocktailById(id);

    // go back to the exact search / filters the visitor came from (plain /recipes on a direct visit)
    const linkState = location.state as RecipesLinkState | null;
    const backHref = `/recipes${linkState?.recipesSearch ?? ""}`;

    const renderStatus = () => {
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

        return <StatusMessage variant="empty" message="We couldn't find that cocktail." />;
    };

    if (!cocktail) return <div className="cocktail-details container">{renderStatus()}</div>;

    const ingredients = getCocktailIngredients(cocktail);
    const ingredientKeys = ingredients.map((ingredient) => ingredient.name.toLowerCase());
    const category = getMenuCategory(cocktail.strCategory);
    const strength = getStrengthOption(cocktail.strAlcoholic);
    const spirits = SPIRIT_GROUPS.filter((group) => ingredientKeys.some((key) => group.pattern.test(key)));
    const glass = capitalize(cocktail.strGlass ?? "");
    const steps = splitIntoSteps(cocktail.strInstructions ?? "");

    const tags: DrinkTag[] = [
        ...spirits.map((spirit) => ({ label: spirit.label, href: getMenuLink(FilterGroupKey.Spirit, spirit.slug) })),
        {
            label: strength?.label ?? cocktail.strAlcoholic,
            href: strength ? getMenuLink(FilterGroupKey.Strength, strength.slug) : null,
        },
    ];

    const stats = [
        { icon: IoWineOutline, label: "Glass", value: glass, href: getMenuLink(FilterGroupKey.Glass, glass) },
        { icon: IoFlaskOutline, label: "Ingredients", value: String(ingredients.length), href: null },
        { icon: IoListOutline, label: "Method", value: `${steps.length} ${steps.length === 1 ? "step" : "steps"}`, href: null },
    ];

    return (
        <article className="cocktail-details">
            <div className="cocktail-details__hero">
                <div className="container">
                    <nav className="breadcrumbs" aria-label="Breadcrumb">
                        <ol>
                            <li>
                                <Link to={backHref}>Recipes</Link>
                                <IoChevronForward aria-hidden="true" />
                            </li>
                            {category && (
                                <li>
                                    <Link to={getMenuLink(FilterGroupKey.Category, category.slug)}>{category.label}</Link>
                                    <IoChevronForward aria-hidden="true" />
                                </li>
                            )}
                            <li aria-current="page">{cocktail.strDrink}</li>
                        </ol>
                    </nav>

                    <div className="cocktail-details__top">
                        <m.div
                            className="cocktail-details__media"
                            initial={{ opacity: 0, scale: 0.96 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                        >
                            <img
                                className="cocktail-details__img"
                                src={getDrinkImage(cocktail.strDrinkThumb, "large")}
                                alt={`${cocktail.strDrink} served in a ${glass.toLowerCase()}`}
                                width={600}
                                height={600}
                            />
                            {cocktail.strIBA && (
                                <span className="cocktail-details__iba">IBA · {cocktail.strIBA}</span>
                            )}
                        </m.div>

                        <m.div
                            className="cocktail-details__intro"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
                        >
                            {category ? (
                                <Link
                                    className="heading-sub cocktail-details__category"
                                    to={getMenuLink(FilterGroupKey.Category, category.slug)}
                                >
                                    {category.label}
                                </Link>
                            ) : (
                                <span className="heading-sub">{cocktail.strCategory}</span>
                            )}
                            <h1 className="heading-primary">{cocktail.strDrink}</h1>

                            <ul className="cocktail-details__tags" aria-label="Drink profile">
                                {tags.map((tag) => (
                                    <li key={tag.label}>
                                        {tag.href ? (
                                            <Link className="cocktail-details__tag" to={tag.href}>
                                                {tag.label}
                                            </Link>
                                        ) : (
                                            <span className="cocktail-details__tag">{tag.label}</span>
                                        )}
                                    </li>
                                ))}
                            </ul>

                            <dl className="cocktail-details__stats">
                                {stats.map((stat) => (
                                    <div key={stat.label} className="cocktail-details__stat">
                                        <stat.icon aria-hidden="true" />
                                        <dt>{stat.label}</dt>
                                        <dd>{stat.href ? <Link to={stat.href}>{stat.value}</Link> : stat.value}</dd>
                                    </div>
                                ))}
                            </dl>

                            <section className="cocktail-details__block" aria-labelledby="ingredients-heading">
                                <div className="cocktail-details__block-header">
                                    <h2 id="ingredients-heading" className="heading-tertiary">
                                        Ingredients
                                    </h2>
                                    <p>Tap an ingredient to find more drinks with it</p>
                                </div>
                                <IngredientList ingredients={ingredients} />
                            </section>
                        </m.div>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="cocktail-details__bottom">
                    <section className="cocktail-details__method" aria-labelledby="method-heading">
                        <h2 id="method-heading" className="heading-secondary">
                            Method
                        </h2>
                        <ol className="method-steps">
                            {steps.map((step, index) => (
                                <li key={index} className="method-steps__item">
                                    <span className="method-steps__number" aria-hidden="true">
                                        {String(index + 1).padStart(2, "0")}
                                    </span>
                                    <p>{step}</p>
                                </li>
                            ))}
                        </ol>
                    </section>

                    <aside className="bar-cta" aria-label="Order it at SipSpot">
                        <span className="heading-sub">Rather leave it to us?</span>
                        <h2 className="bar-cta__title">Try the {cocktail.strDrink} at the bar</h2>
                        <p className="bar-cta__text">
                            Our bartenders make it with fresh juice and hand-cut ice every night. Pull up a stool or
                            book a table.
                        </p>
                        <ul className="bar-cta__hours">
                            {barInfo.openingHours.map((slot) => (
                                <li key={slot.days}>
                                    <span>{slot.days}</span>
                                    <span>{slot.hours}</span>
                                </li>
                            ))}
                        </ul>
                        <Button el="link" href="/#reservation" type="medium" variant="secondary">
                            Book a table
                        </Button>
                    </aside>
                </div>

                <RelatedCocktails
                    cocktailId={cocktail.idDrink}
                    spiritSlug={spirits[0]?.slug}
                    categorySlug={category?.slug}
                />
            </div>
        </article>
    );
}

export default CocktailDetails;
