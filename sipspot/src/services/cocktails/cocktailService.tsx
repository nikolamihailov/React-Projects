import axios from "axios";
import { CocktailsResults } from "../../types/cocktails/CocktailsResults";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const cocktailsEndpoints = {
    searchByName: BASE_URL + `/s=`
}

export const getCocktailByName = async (name: string) => {
    const res = await axios.get<CocktailsResults>(cocktailsEndpoints.searchByName + name);
    return res.data;
}