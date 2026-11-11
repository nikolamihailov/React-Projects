import { useQuery } from "@tanstack/react-query";
import { getRandomCocktail } from "../../services/cocktails/cocktailService";
import { cocktailQueryKeys } from "./cocktailQueryKeys";

export const useRandomCocktail = () => {
    return useQuery({
        queryKey: cocktailQueryKeys.random(),
        queryFn: getRandomCocktail,
        // a new pick on every refetch() call, but not on every window focus
        refetchOnWindowFocus: false,
    });
};
