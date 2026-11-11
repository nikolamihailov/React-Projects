// Curation rules that turn TheCocktailDB's catalog into a bar menu that fits a cocktail lounge.

export type MenuCategory = {
    apiName: string; // value of strCategory in the API
    slug: string; // value used in the URL (?category=)
    label: string;
};

// Beer, soft drinks, shakes, shots, party punches etc. are left out on purpose
export const MENU_CATEGORIES: MenuCategory[] = [
    { apiName: "Cocktail", slug: "cocktails", label: "Cocktails" },
    { apiName: "Ordinary Drink", slug: "classics", label: "Classic Drinks" },
    { apiName: "Coffee / Tea", slug: "coffee-tea", label: "Coffee & Tea" },
];

export type SpiritGroup = {
    slug: string;
    label: string;
    pattern: RegExp; // matched against lower-cased ingredient names
};

export const SPIRIT_GROUPS: SpiritGroup[] = [
    { slug: "gin", label: "Gin", pattern: /\bgin\b/ },
    { slug: "vodka", label: "Vodka", pattern: /vodka|absolut/ },
    { slug: "rum", label: "Rum", pattern: /\brum\b|bacardi|malibu/ },
    { slug: "tequila", label: "Tequila & Mezcal", pattern: /tequila|mezcal/ },
    { slug: "whiskey", label: "Whisk(e)y", pattern: /whisk|bourbon|scotch|\brye\b/ },
    { slug: "brandy", label: "Brandy & Cognac", pattern: /brandy|cognac|calvados|pisco/ },
    { slug: "wine", label: "Champagne & Wine", pattern: /champagne|prosecco|\bwine\b/ },
];

export type StrengthOption = {
    apiName: string; // value of strAlcoholic in the API
    slug: string;
    label: string;
};

export const STRENGTH_OPTIONS: StrengthOption[] = [
    { apiName: "Alcoholic", slug: "alcoholic", label: "With alcohol" },
    { apiName: "Non alcoholic", slug: "alcohol-free", label: "Alcohol-free" },
    { apiName: "Optional alcohol", slug: "optional", label: "Alcohol optional" },
];

// drinks built on these are pub drinks, not cocktail-bar drinks (ginger beer stays - it's a mixer)
export const EXCLUDED_INGREDIENTS = new Set([
    "beer",
    "lager",
    "ale",
    "cider",
    "apple cider",
    "hard cider",
    "corona",
    "guinness stout",
    "stout",
    "pilsner",
]);

// party / novelty names that don't belong on a lounge menu (lower-case)
export const EXCLUDED_NAMES = new Set([
    "fuzzy asshole",
    "orgasm",
    "pink panty pulldowns",
    "69 special",
    "flaming lamborghini",
    "pysch vitamin light",
    "radioactive long island iced tea",
    "vodka slime",
    "zippy's revenge",
    "popped cherry",
    "shark attack",
    "zima blaster",
    "irish curdling cow",
]);

// recipes shorter than this are usually one-liners like "pour into a glass" - not worth listing
export const MIN_INSTRUCTIONS_LENGTH = 40;

// the free API key returns at most 25 drinks per first-letter search, so every letter and digit is fetched
export const CATALOG_INITIALS = [..."abcdefghijklmnopqrstuvwxyz0123456789"];
