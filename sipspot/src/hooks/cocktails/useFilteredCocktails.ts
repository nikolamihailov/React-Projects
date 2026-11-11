import { useQuery } from "@tanstack/react-query";
import { filterCocktails } from "../../services/cocktails/cocktailService";
import { CocktailFilter } from "../../types/cocktails/Cocktail";
import { COCKTAIL_STALE_TIME, cocktailQueryKeys } from "./cocktailQueryKeys";

export const useFilteredCocktails = (filter: CocktailFilter, value: string | null) => {
    return useQuery({
        queryKey: cocktailQueryKeys.filter(filter, value ?? ""),
        queryFn: () => filterCocktails(filter, value ?? ""),
        enabled: !!value,
        staleTime: COCKTAIL_STALE_TIME,
    });
};
