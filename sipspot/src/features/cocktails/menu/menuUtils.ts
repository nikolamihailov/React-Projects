import { Cocktail } from "@/types/cocktails/Cocktail";
import { getCocktailIngredients } from "@/features/cocktails/utils/cocktailUtils";
import {
    EXCLUDED_INGREDIENTS,
    EXCLUDED_NAMES,
    MENU_CATEGORIES,
    MIN_INSTRUCTIONS_LENGTH,
    SPIRIT_GROUPS,
    STRENGTH_OPTIONS,
} from "./menuConfig";
import { Facet, FilterGroupKey, MenuCocktail, MenuFilters, MenuSort } from "./menuTypes";

const FILTER_GROUP_KEYS = Object.values(FilterGroupKey);
const SEARCH_PARAM = "q";
const IBA_PARAM = "iba";
const SORT_PARAM = "sort";

const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

// the API mixes "Collins Glass" and "Collins glass"
const normaliseGlass = (glass: string) => capitalize(glass.trim().toLowerCase());

export const getMenuCategory = (apiName: string) => MENU_CATEGORIES.find((category) => category.apiName === apiName);

export const getStrengthOption = (apiName: string) => STRENGTH_OPTIONS.find((option) => option.apiName === apiName);

// ===== curation: API cocktail -> menu cocktail (or null when it doesn't belong on the menu) =====
export const toMenuCocktail = (cocktail: Cocktail): MenuCocktail | null => {
    const category = getMenuCategory(cocktail.strCategory);
    if (!category) return null;

    const name = cocktail.strDrink.trim();
    if (EXCLUDED_NAMES.has(name.toLowerCase())) return null;
    if ((cocktail.strInstructions ?? "").trim().length < MIN_INSTRUCTIONS_LENGTH) return null;

    const ingredients = getCocktailIngredients(cocktail).map((ingredient) => capitalize(ingredient.name));
    const ingredientKeys = ingredients.map((ingredient) => ingredient.toLowerCase());
    if (ingredientKeys.some((key) => EXCLUDED_INGREDIENTS.has(key))) return null;

    return {
        id: cocktail.idDrink,
        name,
        thumb: cocktail.strDrinkThumb,
        categorySlug: category.slug,
        categoryLabel: category.label,
        strengthSlug: getStrengthOption(cocktail.strAlcoholic)?.slug ?? STRENGTH_OPTIONS[0].slug,
        glass: normaliseGlass(cocktail.strGlass ?? ""),
        isIbaClassic: Boolean(cocktail.strIBA),
        ingredients,
        ingredientKeys,
        spiritSlugs: SPIRIT_GROUPS.filter((group) => ingredientKeys.some((key) => group.pattern.test(key))).map(
            (group) => group.slug
        ),
    };
};

// ===== filtering =====
type GroupRule = {
    // "any": drink matches one of the ticked options (OR); "all": drink has every ticked option (AND)
    mode: "any" | "all";
    matches: (cocktail: MenuCocktail, value: string) => boolean;
};

const groupRules: Record<FilterGroupKey, GroupRule> = {
    [FilterGroupKey.Category]: { mode: "any", matches: (cocktail, value) => cocktail.categorySlug === value },
    [FilterGroupKey.Spirit]: { mode: "any", matches: (cocktail, value) => cocktail.spiritSlugs.includes(value) },
    [FilterGroupKey.Strength]: { mode: "any", matches: (cocktail, value) => cocktail.strengthSlug === value },
    [FilterGroupKey.Glass]: { mode: "any", matches: (cocktail, value) => cocktail.glass === value },
    // "lime + mint" should mean drinks with both
    [FilterGroupKey.Ingredient]: { mode: "all", matches: (cocktail, value) => cocktail.ingredientKeys.includes(value) },
};

const matchesSearch = (cocktail: MenuCocktail, search: string) => {
    const query = search.trim().toLowerCase();
    if (!query) return true;

    return cocktail.name.toLowerCase().includes(query) || cocktail.ingredientKeys.some((key) => key.includes(query));
};

const matchesGroup = (cocktail: MenuCocktail, key: FilterGroupKey, values: string[]) => {
    if (!values.length) return true;

    const rule = groupRules[key];
    if (rule.mode === "any") return values.some((value) => rule.matches(cocktail, value));

    return values.every((value) => rule.matches(cocktail, value));
};

const matchesFilters = (cocktail: MenuCocktail, filters: MenuFilters, skippedGroup?: FilterGroupKey) => {
    if (!matchesSearch(cocktail, filters.search)) return false;
    if (filters.ibaOnly && !cocktail.isIbaClassic) return false;

    return FILTER_GROUP_KEYS.every((key) => key === skippedGroup || matchesGroup(cocktail, key, filters[key]));
};

const compareByName = (a: MenuCocktail, b: MenuCocktail) => a.name.localeCompare(b.name);

const menuSorters: Record<MenuSort, (a: MenuCocktail, b: MenuCocktail) => number> = {
    [MenuSort.Recommended]: (a, b) => Number(b.isIbaClassic) - Number(a.isIbaClassic) || compareByName(a, b),
    [MenuSort.NameAsc]: compareByName,
    [MenuSort.NameDesc]: (a, b) => compareByName(b, a),
    [MenuSort.FewestIngredients]: (a, b) => a.ingredients.length - b.ingredients.length || compareByName(a, b),
};

export const filterMenu = (menu: MenuCocktail[], filters: MenuFilters) =>
    menu.filter((cocktail) => matchesFilters(cocktail, filters)).sort(menuSorters[filters.sort]);

// ===== facets (sidebar options with live counts) =====
type OptionSource = {
    value: string;
    label: string;
};

// unique values across the menu, most common first
const collectOptions = (menu: MenuCocktail[], getEntries: (cocktail: MenuCocktail) => OptionSource[]) => {
    const options = new Map<string, OptionSource & { frequency: number }>();

    menu.forEach((cocktail) =>
        getEntries(cocktail).forEach((entry) => {
            const existing = options.get(entry.value);
            options.set(entry.value, { ...entry, frequency: (existing?.frequency ?? 0) + 1 });
        })
    );

    return [...options.values()].sort((a, b) => b.frequency - a.frequency);
};

export const buildFacets = (menu: MenuCocktail[], filters: MenuFilters): Facet[] => {
    const buildFacet = (key: FilterGroupKey, label: string, sources: OptionSource[], isSearchable: boolean): Facet => {
        const rule = groupRules[key];
        // OR groups ignore their own ticks, so each count shows what ticking that option would add
        const base = menu.filter((cocktail) => matchesFilters(cocktail, filters, rule.mode === "any" ? key : undefined));

        // a value that came in via URL but isn't on the menu (e.g. an ingredient link) still gets a removable option
        const unknownSelections = filters[key]
            .filter((value) => !sources.some((source) => source.value === value))
            .map((value) => ({ value, label: capitalize(value) }));

        const options = [...unknownSelections, ...sources]
            .map((source) => ({
                ...source,
                count: base.filter((cocktail) => rule.matches(cocktail, source.value)).length,
                isSelected: filters[key].includes(source.value),
            }))
            .filter((option) => option.count > 0 || option.isSelected);

        return { key, label, options, isSearchable };
    };

    const ingredientSources = collectOptions(menu, (cocktail) =>
        cocktail.ingredients.map((ingredient, index) => ({ value: cocktail.ingredientKeys[index], label: ingredient }))
    );
    const glassSources = collectOptions(menu, (cocktail) => [{ value: cocktail.glass, label: cocktail.glass }]);

    return [
        buildFacet(
            FilterGroupKey.Category,
            "Category",
            MENU_CATEGORIES.map((category) => ({ value: category.slug, label: category.label })),
            false
        ),
        buildFacet(
            FilterGroupKey.Spirit,
            "Base spirit",
            SPIRIT_GROUPS.map((group) => ({ value: group.slug, label: group.label })),
            false
        ),
        buildFacet(
            FilterGroupKey.Strength,
            "Strength",
            STRENGTH_OPTIONS.map((option) => ({ value: option.slug, label: option.label })),
            false
        ),
        buildFacet(FilterGroupKey.Ingredient, "Ingredient", ingredientSources, true),
        buildFacet(FilterGroupKey.Glass, "Glass", glassSources, true),
    ];
};

export const countIbaClassics = (menu: MenuCocktail[], filters: MenuFilters) =>
    menu.filter((cocktail) => cocktail.isIbaClassic && matchesFilters(cocktail, { ...filters, ibaOnly: false })).length;

// ===== URL <-> filters =====
const isMenuSort = (value: string | null): value is MenuSort =>
    Object.values(MenuSort).includes(value as MenuSort);

export const parseMenuFilters = (params: URLSearchParams): MenuFilters => {
    const sortParam = params.get(SORT_PARAM);

    return {
        search: params.get(SEARCH_PARAM) ?? "",
        ibaOnly: params.get(IBA_PARAM) === "1",
        sort: isMenuSort(sortParam) ? sortParam : MenuSort.Recommended,
        [FilterGroupKey.Category]: params.getAll(FilterGroupKey.Category),
        [FilterGroupKey.Spirit]: params.getAll(FilterGroupKey.Spirit),
        [FilterGroupKey.Strength]: params.getAll(FilterGroupKey.Strength),
        [FilterGroupKey.Glass]: params.getAll(FilterGroupKey.Glass),
        [FilterGroupKey.Ingredient]: params.getAll(FilterGroupKey.Ingredient).map((value) => value.toLowerCase()),
    };
};

export const menuParamNames = { search: SEARCH_PARAM, ibaOnly: IBA_PARAM, sort: SORT_PARAM };

export const countActiveFilters = (filters: MenuFilters) =>
    FILTER_GROUP_KEYS.reduce((total, key) => total + filters[key].length, 0) + Number(filters.ibaOnly);

// link to the menu with one filter applied - used by the details page tags and ingredients
export const getMenuLink = (key: FilterGroupKey, value: string) =>
    `/recipes?${new URLSearchParams({ [key]: key === FilterGroupKey.Ingredient ? value.toLowerCase() : value })}`;
