import { ChangeEvent, useCallback, useMemo, useState } from "react";
import { IoOptionsOutline, IoShuffle } from "react-icons/io5";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FilterGroupKey, MenuSort } from "@/features/cocktails/menu/menuTypes";
import {
    buildFacets,
    countActiveFilters,
    countIbaClassics,
    filterMenu,
    menuParamNames,
    parseMenuFilters,
} from "@/features/cocktails/menu/menuUtils";
import ActiveFilters from "@/features/cocktails/Recipes/ActiveFilters";
import CocktailCard from "@/features/cocktails/Recipes/CocktailCard";
import FilterPanel, { FILTER_PANEL_ID } from "@/features/cocktails/Recipes/FilterPanel";
import RecipeSearchBar from "@/features/cocktails/Recipes/RecipeSearchBar";
import PageHeader from "@/features/shared/components/PageHeader/PageHeader";
import Button from "@/features/shared/components/UI/Button/Button";
import StatusMessage from "@/features/shared/components/UI/StatusMessage/StatusMessage";
import { useBarMenu } from "@/hooks/cocktails/useBarMenu";

const PAGE_SIZE = 24;
const SHOW_PARAM = "show";
const SKELETON_CARDS = Array.from({ length: 8 }, (_, index) => index);

const sortOptions: { value: MenuSort; label: string }[] = [
    { value: MenuSort.Recommended, label: "Recommended" },
    { value: MenuSort.NameAsc, label: "Name: A to Z" },
    { value: MenuSort.NameDesc, label: "Name: Z to A" },
    { value: MenuSort.FewestIngredients, label: "Fewest ingredients" },
];

function Recipes() {
    // every filter lives in the URL - shareable, survives refresh, and Back undoes the last change
    const [searchParams, setSearchParams] = useSearchParams();
    const [isFiltersOpen, setIsFiltersOpen] = useState(false);
    const navigate = useNavigate();
    const { menu, isPending, isError, retry } = useBarMenu();

    const filters = useMemo(() => parseMenuFilters(searchParams), [searchParams]);
    const results = useMemo(() => filterMenu(menu, filters), [menu, filters]);
    const facets = useMemo(() => buildFacets(menu, filters), [menu, filters]);
    const ibaCount = useMemo(() => countIbaClassics(menu, filters), [menu, filters]);
    const activeCount = countActiveFilters(filters);

    // how many cards are shown is kept in the URL so Back from a drink returns to the same spot
    const visibleCount = Math.max(Number(searchParams.get(SHOW_PARAM)) || PAGE_SIZE, PAGE_SIZE);
    const visibleResults = results.slice(0, visibleCount);

    const updateParams = (update: (params: URLSearchParams) => void, replace = false) => {
        setSearchParams(
            (previousParams) => {
                const nextParams = new URLSearchParams(previousParams);
                update(nextParams);
                return nextParams;
            },
            { replace }
        );
    };

    const handleToggleOption = (key: FilterGroupKey, value: string) => {
        updateParams((params) => {
            const values = params.getAll(key);
            params.delete(key);
            params.delete(SHOW_PARAM);

            const nextValues = values.includes(value) ? values.filter((current) => current !== value) : [...values, value];
            nextValues.forEach((nextValue) => params.append(key, nextValue));
        });
    };

    const handleIbaToggle = () => {
        updateParams((params) => {
            params.delete(SHOW_PARAM);
            if (params.get(menuParamNames.ibaOnly) === "1") {
                params.delete(menuParamNames.ibaOnly);
                return;
            }
            params.set(menuParamNames.ibaOnly, "1");
        });
    };

    const handleSearchChange = (value: string) => {
        updateParams((params) => {
            params.delete(SHOW_PARAM);
            if (!value) {
                params.delete(menuParamNames.search);
                return;
            }
            params.set(menuParamNames.search, value);
        }, true);
    };

    const handleSearchClear = () => handleSearchChange("");

    const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
        updateParams((params) => {
            if (event.target.value === MenuSort.Recommended) {
                params.delete(menuParamNames.sort);
                return;
            }
            params.set(menuParamNames.sort, event.target.value);
        }, true);
    };

    const handleClearAll = () => setSearchParams({});

    const handleShowMore = () => {
        updateParams((params) => params.set(SHOW_PARAM, String(visibleCount + PAGE_SIZE)), true);
    };

    const handleSurpriseMe = () => {
        const pool = results.length ? results : menu;
        const pick = pool[Math.floor(Math.random() * pool.length)];
        if (pick) navigate(`/recipes/${pick.id}`, { state: { recipesSearch: `?${searchParams}` } });
    };

    const handleFiltersOpen = () => setIsFiltersOpen(true);
    // stable so the drawer's Escape listener isn't re-attached on every render
    const handleFiltersClose = useCallback(() => setIsFiltersOpen(false), []);

    const renderResults = () => {
        if (isError) {
            return (
                <StatusMessage
                    variant="error"
                    message="We couldn't load the menu. Check your connection and try again."
                    onRetry={retry}
                />
            );
        }

        if (isPending) {
            return (
                <ul className="cocktail-grid" aria-busy="true" aria-label="Loading drinks">
                    {SKELETON_CARDS.map((index) => (
                        <li key={index} className="cocktail-card cocktail-card--skeleton" aria-hidden="true">
                            <div className="cocktail-card__media" />
                            <div className="cocktail-card__body">
                                <span />
                                <span />
                            </div>
                        </li>
                    ))}
                </ul>
            );
        }

        if (!results.length) {
            return (
                <div className="menu-empty">
                    <h3 className="heading-tertiary">No drinks match these filters</h3>
                    <p className="paragraph">Try removing a filter or searching for something else.</p>
                    <Button el="button" type="small" variant="outline" onClickFunc={handleClearAll}>
                        Clear all filters
                    </Button>
                </div>
            );
        }

        return (
            <>
                <ul className="cocktail-grid">
                    {visibleResults.map((cocktail) => (
                        <CocktailCard key={cocktail.id} cocktail={cocktail} />
                    ))}
                </ul>
                <div className="menu-pagination">
                    <p>
                        Showing {visibleResults.length} of {results.length}
                    </p>
                    {visibleResults.length < results.length && (
                        <Button el="button" type="medium" variant="outline" onClickFunc={handleShowMore}>
                            Show more drinks
                        </Button>
                    )}
                </div>
            </>
        );
    };

    return (
        <>
            <PageHeader
                eyebrow="The menu"
                title="Cocktail recipes"
                description="Our bartenders' library of classics and modern signatures. Filter by spirit, ingredient or glass, then open any drink for the full method."
            />

            <div className="menu-layout container">
                <FilterPanel
                    facets={facets}
                    ibaOnly={filters.ibaOnly}
                    ibaCount={ibaCount}
                    activeCount={activeCount}
                    resultsCount={results.length}
                    isOpen={isFiltersOpen}
                    onToggle={handleToggleOption}
                    onIbaToggle={handleIbaToggle}
                    onClearAll={handleClearAll}
                    onClose={handleFiltersClose}
                />

                <section className="menu-results" aria-labelledby="menu-results-heading">
                    <div className="menu-toolbar">
                        <RecipeSearchBar
                            value={filters.search}
                            onChange={handleSearchChange}
                            onClear={handleSearchClear}
                        />
                        <div className="menu-toolbar__row">
                            <h2 id="menu-results-heading" className="menu-toolbar__count" aria-live="polite">
                                {isPending ? "Loading the menu..." : `Found: ${results.length} drinks`}
                            </h2>
                            <div className="menu-toolbar__actions">
                                <button
                                    type="button"
                                    className="menu-toolbar__filters-btn"
                                    aria-expanded={isFiltersOpen}
                                    aria-controls={FILTER_PANEL_ID}
                                    onClick={handleFiltersOpen}
                                >
                                    <IoOptionsOutline aria-hidden="true" /> Filters
                                    {activeCount > 0 && <span className="menu-toolbar__badge">{activeCount}</span>}
                                </button>
                                <button
                                    type="button"
                                    className="menu-toolbar__surprise"
                                    onClick={handleSurpriseMe}
                                    disabled={isPending || !menu.length}
                                >
                                    <IoShuffle aria-hidden="true" /> Surprise me
                                </button>
                                <label className="menu-toolbar__sort">
                                    <span>Sort by</span>
                                    <select value={filters.sort} onChange={handleSortChange}>
                                        {sortOptions.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </label>
                            </div>
                        </div>
                        <ActiveFilters
                            facets={facets}
                            ibaOnly={filters.ibaOnly}
                            search={filters.search}
                            onRemove={handleToggleOption}
                            onIbaRemove={handleIbaToggle}
                            onSearchClear={handleSearchClear}
                            onClearAll={handleClearAll}
                        />
                    </div>

                    {renderResults()}
                </section>
            </div>
        </>
    );
}

export default Recipes;
