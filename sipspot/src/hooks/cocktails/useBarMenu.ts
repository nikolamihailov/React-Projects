import { useQuery } from "@tanstack/react-query";
import { CATALOG_INITIALS } from "@/features/cocktails/menu/menuConfig";
import { readStoredMenu, writeStoredMenu } from "@/features/cocktails/menu/menuStorage";
import { MenuCocktail } from "@/features/cocktails/menu/menuTypes";
import { toMenuCocktail } from "@/features/cocktails/menu/menuUtils";
import { getCocktailsByFirstLetter } from "@/services/cocktails/cocktailService";
import { COCKTAIL_STALE_TIME, cocktailQueryKeys } from "./cocktailQueryKeys";

// one request per first letter (the free key caps each at 25 drinks), then curated into the bar menu
const fetchBarMenu = async () => {
    const drinksByLetter = await Promise.all(CATALOG_INITIALS.map(getCocktailsByFirstLetter));

    const menuById = new Map<string, MenuCocktail>();
    drinksByLetter.flat().forEach((cocktail) => {
        const menuCocktail = toMenuCocktail(cocktail);
        if (menuCocktail) menuById.set(menuCocktail.id, menuCocktail);
    });

    const menu = [...menuById.values()];
    writeStoredMenu(menu);
    return menu;
};

// the whole curated bar menu (~300 drinks): from the browser cache when fresh, otherwise from the API
export const useBarMenu = () => {
    const { data, isPending, isError, refetch } = useQuery({
        queryKey: cocktailQueryKeys.menu(),
        queryFn: fetchBarMenu,
        initialData: readStoredMenu,
        staleTime: COCKTAIL_STALE_TIME,
        // the API answers bursts with 429 - back off 2s, 4s, 8s before giving up
        retry: 3,
        retryDelay: (attempt) => 2000 * 2 ** attempt,
    });

    const retry = () => {
        refetch();
    };

    return { menu: data ?? [], isPending, isError, retry };
};
