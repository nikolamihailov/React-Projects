import { CocktailFilter } from "../../types/cocktails/Cocktail";

export const cocktailQueryKeys = {
    all: ["cocktails"] as const,
    search: (name: string) => [...cocktailQueryKeys.all, "search", name] as const,
    detail: (id: string) => [...cocktailQueryKeys.all, "detail", id] as const,
    random: () => [...cocktailQueryKeys.all, "random"] as const,
    menu: () => [...cocktailQueryKeys.all, "menu"] as const,
    filter: (filter: CocktailFilter, value: string) => [...cocktailQueryKeys.all, "filter", filter, value] as const,
    filterOptions: (filter: CocktailFilter) => [...cocktailQueryKeys.all, "filter-options", filter] as const,
};

// Cocktail data barely ever changes, so there is no need to refetch it during a visit
export const COCKTAIL_STALE_TIME = Infinity;
