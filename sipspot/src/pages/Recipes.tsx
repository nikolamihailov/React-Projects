import { useSearchParams } from "react-router-dom";
import CategoryFilter from "../features/cocktails/Recipes/CategoryFilter";
import CocktailGrid from "../features/cocktails/Recipes/CocktailGrid";
import RecipeSearchBar from "../features/cocktails/Recipes/RecipeSearchBar";
import Section from "../features/shared/components/UI/Section/Section";
import { useFilteredCocktails } from "../hooks/cocktails/useFilteredCocktails";
import { useSearchCocktails } from "../hooks/cocktails/useSearchCocktails";
import { useDebounce } from "../hooks/useDebounce";
import { CocktailFilter } from "../types/cocktails/Cocktail";

const DEFAULT_CATEGORY = "Cocktail";
const SEARCH_PARAM = "q";
const CATEGORY_PARAM = "category";

function Recipes() {
    // search text and category live in the URL so results survive refresh, sharing and the back button
    const [searchParams, setSearchParams] = useSearchParams();
    const searchText = searchParams.get(SEARCH_PARAM) ?? "";
    const trimmedSearch = searchText.trim();
    const isSearching = trimmedSearch.length > 0;
    const debouncedSearch = useDebounce(trimmedSearch);

    // the API can't combine name search with a category, so search always covers every drink
    const selectedCategory = isSearching ? null : searchParams.get(CATEGORY_PARAM) ?? DEFAULT_CATEGORY;

    const searchQuery = useSearchCocktails(debouncedSearch);
    const categoryQuery = useFilteredCocktails(CocktailFilter.Category, selectedCategory);
    const activeQuery = isSearching ? searchQuery : categoryQuery;

    const updateParams = (update: (params: URLSearchParams) => void, replace: boolean) => {
        setSearchParams(
            (previousParams) => {
                const nextParams = new URLSearchParams(previousParams);
                update(nextParams);
                return nextParams;
            },
            { replace }
        );
    };

    const handleSearchChange = (value: string) => {
        updateParams((params) => {
            if (!value) {
                params.delete(SEARCH_PARAM);
                return;
            }

            params.set(SEARCH_PARAM, value);
        }, true);
    };

    const handleSearchClear = () => updateParams((params) => params.delete(SEARCH_PARAM), true);

    const handleCategorySelect = (category: string) => {
        updateParams((params) => {
            params.delete(SEARCH_PARAM);
            params.set(CATEGORY_PARAM, category);
        }, false);
    };

    const resultsHeading = isSearching ? `Results for "${trimmedSearch}"` : selectedCategory;
    const emptyMessage = isSearching
        ? `No cocktails match "${trimmedSearch}". Try another name.`
        : "No drinks in this category yet.";
    const resultsCount = activeQuery.data?.length;

    return (
        <Section sectionClassName="recipes">
            <div className="recipes">
                <header className="recipes__header">
                    <span className="heading-sub">recipes</span>
                    <h1 className="heading-secondary">Find Your Next Favourite Drink</h1>
                    <p className="paragraph recipes__intro">
                        Search hundreds of recipes by name or browse by category, then open any drink to see exactly
                        how it's made.
                    </p>
                </header>

                <div className="recipes__controls">
                    <RecipeSearchBar value={searchText} onChange={handleSearchChange} onClear={handleSearchClear} />
                    <CategoryFilter selectedCategory={selectedCategory} onSelect={handleCategorySelect} />
                </div>

                <div className="recipes__results">
                    <div className="recipes__results-header">
                        <h2 className="heading-tertiary recipes__results-heading">{resultsHeading}</h2>
                        {resultsCount !== undefined && (
                            <p className="recipes__results-count" aria-live="polite">
                                {resultsCount} {resultsCount === 1 ? "drink" : "drinks"}
                            </p>
                        )}
                    </div>
                    <CocktailGrid
                        cocktails={activeQuery.data}
                        isLoading={activeQuery.isPending}
                        isError={activeQuery.isError}
                        isRefreshing={activeQuery.isPlaceholderData}
                        emptyMessage={emptyMessage}
                        onRetry={activeQuery.refetch}
                    />
                </div>
            </div>
        </Section>
    );
}

export default Recipes;
