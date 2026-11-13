import { Cocktail, CocktailIngredient, INGREDIENT_NUMBERS } from "@/types/cocktails/Cocktail";

const INGREDIENT_IMAGE_URL = "https://www.thecocktaildb.com/images/ingredients/";

export type DrinkImageSize = "small" | "medium" | "large";

export const getCocktailIngredients = (cocktail: Cocktail): CocktailIngredient[] => {
    return INGREDIENT_NUMBERS.flatMap((number) => {
        const name = cocktail[`strIngredient${number}`]?.trim();
        if (!name) return [];

        return [{ name, measure: cocktail[`strMeasure${number}`]?.trim() ?? "" }];
    });
};

export const getDrinkImage = (thumbUrl: string, size: DrinkImageSize) => `${thumbUrl}/${size}`;

export const getIngredientImage = (ingredientName: string) =>
    `${INGREDIENT_IMAGE_URL}${encodeURIComponent(ingredientName)}-Small.png`;
