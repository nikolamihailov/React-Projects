import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { searchCocktailsByName } from "../../services/cocktails/cocktailService";
import { COCKTAIL_STALE_TIME, cocktailQueryKeys } from "./cocktailQueryKeys";

export const useSearchCocktails = (name: string) => {
    const trimmedName = name.trim();

    return useQuery({
        queryKey: cocktailQueryKeys.search(trimmedName),
        queryFn: () => searchCocktailsByName(trimmedName),
        enabled: trimmedName.length > 0,
        staleTime: COCKTAIL_STALE_TIME,
        // keeps the old results on screen while the next search loads
        placeholderData: keepPreviousData,
    });
};
