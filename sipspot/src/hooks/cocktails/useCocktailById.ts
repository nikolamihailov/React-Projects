import { useQuery } from "@tanstack/react-query";
import { getCocktailById } from "../../services/cocktails/cocktailService";
import { COCKTAIL_STALE_TIME, cocktailQueryKeys } from "./cocktailQueryKeys";

export const useCocktailById = (id: string | undefined) => {
    return useQuery({
        queryKey: cocktailQueryKeys.detail(id ?? ""),
        queryFn: () => getCocktailById(id ?? ""),
        enabled: !!id,
        staleTime: COCKTAIL_STALE_TIME,
    });
};
