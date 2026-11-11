export const INGREDIENT_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15] as const;

type IngredientNumber = (typeof INGREDIENT_NUMBERS)[number];

type CocktailIngredientFields = {
    [K in `strIngredient${IngredientNumber}`]: string | null;
};

type CocktailMeasureFields = {
    [K in `strMeasure${IngredientNumber}`]: string | null;
};

export type Cocktail = {
    idDrink: string;
    strDrink: string;
    strDrinkAlternate: string | null;
    strTags: string | null;
    strCategory: string;
    strIBA: string | null;
    strAlcoholic: string;
    strGlass: string;
    strInstructions: string;
    strDrinkThumb: string;
    strImageSource: string | null;
} & CocktailIngredientFields &
    CocktailMeasureFields;

// Shape returned by filter.php - only the basics, use lookup.php for the full cocktail
export type CocktailSummary = Pick<Cocktail, "idDrink" | "strDrink" | "strDrinkThumb">;

export type CocktailIngredient = {
    name: string;
    measure: string;
};

// TheCocktailDB returns `null` (search) or "no data found" (filter) when nothing matches
export type DrinksResponse<T> = {
    drinks: T[] | null | string;
};

export enum CocktailFilter {
    Category = "c",
    Ingredient = "i",
    Glass = "g",
    Alcoholic = "a",
}
