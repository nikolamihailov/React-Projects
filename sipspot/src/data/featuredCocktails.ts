import cosmopolitanPng from "/cosmopolitan.png";
import daiquiriPng from "/daiquiri.png";
import mojitoPng from "/mojito.png";
import strawberryMargaritaPng from "/strawberryMargarita.png";

export type FeaturedCocktail = {
    id: string;
    name: string;
    imgSrc: string;
    notes: string;
};

// ids are TheCocktailDB drinks, so each card opens the full recipe
export const featuredCocktails: FeaturedCocktail[] = [
    { id: "11007", name: "Margarita", imgSrc: strawberryMargaritaPng, notes: "Tequila · lime · salted rim" },
    { id: "11006", name: "Daiquiri", imgSrc: daiquiriPng, notes: "White rum · lime · sugar" },
    { id: "11000", name: "Mojito", imgSrc: mojitoPng, notes: "Rum · fresh mint · soda" },
    { id: "17196", name: "Cosmopolitan", imgSrc: cosmopolitanPng, notes: "Citrus vodka · cranberry · lime" },
];
