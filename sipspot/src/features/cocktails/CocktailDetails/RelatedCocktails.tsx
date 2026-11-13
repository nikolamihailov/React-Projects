import { useMemo } from "react";
import { useBarMenu } from "@/hooks/cocktails/useBarMenu";
import SectionInfo from "@/features/shared/components/SectionInfo";
import Button from "@/features/shared/components/UI/Button/Button";
import { SPIRIT_GROUPS } from "@/features/cocktails/menu/menuConfig";
import { FilterGroupKey } from "@/features/cocktails/menu/menuTypes";
import { getMenuLink } from "@/features/cocktails/menu/menuUtils";
import CocktailCard from "@/features/cocktails/Recipes/CocktailCard";

type RelatedCocktailsProps = {
    cocktailId: string;
    spiritSlug: string | undefined;
    categorySlug: string | undefined;
};

const RELATED_COUNT = 4;

// "More with gin" - other drinks on the same base spirit (or the same category when there's no spirit)
function RelatedCocktails({ cocktailId, spiritSlug, categorySlug }: RelatedCocktailsProps) {
    const { menu } = useBarMenu();
    const spirit = SPIRIT_GROUPS.find((group) => group.slug === spiritSlug);

    const related = useMemo(() => {
        const candidates = menu.filter((cocktail) => {
            if (cocktail.id === cocktailId) return false;
            if (spirit) return cocktail.spiritSlugs.includes(spirit.slug);
            return cocktail.categorySlug === categorySlug;
        });

        // IBA classics first, then a stable pick so the list doesn't reshuffle on every render
        return candidates
            .sort((a, b) => Number(b.isIbaClassic) - Number(a.isIbaClassic) || a.name.localeCompare(b.name))
            .slice(0, RELATED_COUNT);
    }, [menu, cocktailId, spirit, categorySlug]);

    if (!related.length) return null;

    const heading = spirit ? `More with ${spirit.label.toLowerCase()}` : "You might also like";
    const viewAllHref = spirit
        ? getMenuLink(FilterGroupKey.Spirit, spirit.slug)
        : getMenuLink(FilterGroupKey.Category, categorySlug ?? "");

    return (
        <section className="related-cocktails" aria-label={heading}>
            <div className="related-cocktails__header">
                <SectionInfo subheading="Keep exploring" heading={heading} align="left" />
                <Button el="link" href={viewAllHref} type="small" variant="outline">
                    View all
                </Button>
            </div>
            <ul className="cocktail-grid">
                {related.map((cocktail) => (
                    <CocktailCard key={cocktail.id} cocktail={cocktail} />
                ))}
            </ul>
        </section>
    );
}

export default RelatedCocktails;
