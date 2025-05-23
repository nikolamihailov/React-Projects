import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getCocktailByName } from "../../services/cocktails/cocktailService";

const QUERY_KEY_NAME = "get cocktail by search name";

export const useGetCocktailByNameSearch = (name: string) => {
    return useQuery({
        queryKey: [QUERY_KEY_NAME, name],
        queryFn: async () => {
            try {
                const response = await getCocktailByName(name);
                return response;
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    console.error(error);
                }
            }
        },
        enabled: !!name,
    });
};
