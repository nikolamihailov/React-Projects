import { useQuery } from "@tanstack/react-query";
import { getFilterOptions } from "../../services/cocktails/cocktailService";
import { CocktailFilter } from "../../types/cocktails/Cocktail";
import { COCKTAIL_STALE_TIME, cocktailQueryKeys } from "./cocktailQueryKeys";

export const useFilterOptions = (filter: CocktailFilter) => {
    return useQuery({
        queryKey: cocktailQueryKeys.filterOptions(filter),
        queryFn: () => getFilterOptions(filter),
        staleTime: COCKTAIL_STALE_TIME,
    });
};
