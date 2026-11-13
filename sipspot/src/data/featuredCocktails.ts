import cosmopolitanImg from "/cosmopolitan.webp";
import daiquiriImg from "/daiquiri.webp";
import mojitoImg from "/mojito.webp";
import strawberryMargaritaImg from "/strawberryMargarita.webp";

export type FeaturedCocktail = {
    id: string;
    name: string;
    imgSrc: string;
    notes: string;
};

// ids are TheCocktailDB drinks, so each card opens the full recipe
export const featuredCocktails: FeaturedCocktail[] = [
    { id: "11007", name: "Margarita", imgSrc: strawberryMargaritaImg, notes: "Tequila · lime · salted rim" },
    { id: "11006", name: "Daiquiri", imgSrc: daiquiriImg, notes: "White rum · lime · sugar" },
    { id: "11000", name: "Mojito", imgSrc: mojitoImg, notes: "Rum · fresh mint · soda" },
    { id: "17196", name: "Cosmopolitan", imgSrc: cosmopolitanImg, notes: "Citrus vodka · cranberry · lime" },
];
