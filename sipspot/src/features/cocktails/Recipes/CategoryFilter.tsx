import classNames from "classnames";
import { useFilterOptions } from "../../../hooks/cocktails/useFilterOptions";
import { CocktailFilter } from "../../../types/cocktails/Cocktail";

type CategoryFilterProps = {
    selectedCategory: string | null;
    onSelect: (category: string) => void;
};

function CategoryFilter({ selectedCategory, onSelect }: CategoryFilterProps) {
    const { data: categories } = useFilterOptions(CocktailFilter.Category);

    // the filter is optional - while it loads (or if it fails) search still works
    if (!categories?.length) return null;

    return (
        <div className="category-filter" role="group" aria-label="Filter cocktails by category">
            {categories.map((category) => {
                const isActive = category === selectedCategory;
                const handleClick = () => onSelect(category);

                return (
                    <button
                        key={category}
                        type="button"
                        className={classNames("category-filter__chip", {
                            "category-filter__chip--active": isActive,
                        })}
                        aria-pressed={isActive}
                        onClick={handleClick}
                    >
                        {category}
                    </button>
                );
            })}
        </div>
    );
}

export default CategoryFilter;
