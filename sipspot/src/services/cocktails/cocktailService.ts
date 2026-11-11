import { Cocktail, CocktailFilter, CocktailSummary, DrinksResponse } from "../../types/cocktails/Cocktail";
import { axiosInstance } from "../config/axiosConfig";

const cocktailsEndpoints = {
    search: "/search.php",
    lookup: "/lookup.php",
    random: "/random.php",
    filter: "/filter.php",
    list: "/list.php",
};

// list.php returns each option under a different key depending on the filter
const filterOptionKeys: Record<CocktailFilter, string> = {
    [CocktailFilter.Category]: "strCategory",
    [CocktailFilter.Ingredient]: "strIngredient1",
    [CocktailFilter.Glass]: "strGlass",
    [CocktailFilter.Alcoholic]: "strAlcoholic",
};

const toDrinksArray = <T>(response: DrinksResponse<T>): T[] => {
    if (!Array.isArray(response.drinks)) return [];

    return response.drinks;
};

export const searchCocktailsByName = async (name: string) => {
    const res = await axiosInstance.get<DrinksResponse<Cocktail>>(cocktailsEndpoints.search, {
        params: { s: name },
    });
    return toDrinksArray(res.data);
};

export const getCocktailById = async (id: string) => {
    const res = await axiosInstance.get<DrinksResponse<Cocktail>>(cocktailsEndpoints.lookup, {
        params: { i: id },
    });
    return toDrinksArray(res.data)[0] ?? null;
};

export const getRandomCocktail = async () => {
    const res = await axiosInstance.get<DrinksResponse<Cocktail>>(cocktailsEndpoints.random);
    return toDrinksArray(res.data)[0] ?? null;
};

export const filterCocktails = async (filter: CocktailFilter, value: string) => {
    const res = await axiosInstance.get<DrinksResponse<CocktailSummary>>(cocktailsEndpoints.filter, {
        params: { [filter]: value },
    });
    return toDrinksArray(res.data);
};

export const getFilterOptions = async (filter: CocktailFilter) => {
    const res = await axiosInstance.get<DrinksResponse<Record<string, string>>>(cocktailsEndpoints.list, {
        params: { [filter]: "list" },
    });
    const optionKey = filterOptionKeys[filter];

    return toDrinksArray(res.data)
        .map((option) => option[optionKey])
        .filter(Boolean);
};
