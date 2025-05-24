import { CocktailsResults } from "../../types/cocktails/CocktailsResults";
import { axiosInstance } from "../config/axiosConfig";

const cocktailsEndpoints = {
    searchByName: "/s=",
};

export const getCocktailByName = async (name: string) => {
    const res = await axiosInstance.get<CocktailsResults>(cocktailsEndpoints.searchByName + name);
    return res.data;
};
