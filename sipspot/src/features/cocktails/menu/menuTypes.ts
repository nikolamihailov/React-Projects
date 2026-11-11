// A drink as the menu uses it: the API record flattened into what cards and filters need
export type MenuCocktail = {
    id: string;
    name: string;
    thumb: string;
    categorySlug: string;
    categoryLabel: string;
    strengthSlug: string;
    glass: string; // normalised, e.g. "Collins glass"
    isIbaClassic: boolean;
    ingredients: string[]; // display names, e.g. "Lime juice"
    ingredientKeys: string[]; // lower-cased for matching
    spiritSlugs: string[];
};

export enum MenuSort {
    Recommended = "recommended",
    NameAsc = "name-asc",
    NameDesc = "name-desc",
    FewestIngredients = "fewest-ingredients",
}

// each multi-select filter group, also used as its URL param name
export enum FilterGroupKey {
    Category = "category",
    Spirit = "spirit",
    Strength = "strength",
    Glass = "glass",
    Ingredient = "ingredient",
}

export type MenuFilters = {
    search: string;
    ibaOnly: boolean;
    sort: MenuSort;
} & Record<FilterGroupKey, string[]>;

export type FacetOption = {
    value: string;
    label: string;
    count: number;
    isSelected: boolean;
};

export type Facet = {
    key: FilterGroupKey;
    label: string;
    options: FacetOption[];
    // long lists (glass, ingredient) start collapsed and get a search box
    isSearchable: boolean;
};
