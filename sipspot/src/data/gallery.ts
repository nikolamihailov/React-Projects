// Photos come from TheCocktailDB (each links to its recipe) - swap in real bar photography when available
const IMAGE_BASE = "https://www.thecocktaildb.com/images/media/drink/";

export type GalleryPhoto = {
    drinkId: string;
    name: string;
    image: string;
    caption: string;
};

export const galleryPhotos: GalleryPhoto[] = [
    { drinkId: "11003", name: "Negroni", image: `${IMAGE_BASE}qgdu971561574065.jpg`, caption: "Equal parts, stirred long and slow" },
    { drinkId: "17212", name: "Espresso Martini", image: `${IMAGE_BASE}n0sx531504372951.jpg`, caption: "Our most-ordered drink after midnight" },
    { drinkId: "17180", name: "Aviation", image: `${IMAGE_BASE}trbplb1606855233.jpg`, caption: "Violet, gin and a pre-Prohibition story" },
    { drinkId: "11001", name: "Old Fashioned", image: `${IMAGE_BASE}vrwquq1478252802.jpg`, caption: "One large cube, one orange twist" },
    { drinkId: "17197", name: "French 75", image: `${IMAGE_BASE}hrxfbl1606773109.jpg`, caption: "Gin and champagne for celebrations" },
    { drinkId: "17186", name: "Clover Club", image: `${IMAGE_BASE}t0aja61504348715.jpg`, caption: "Raspberry, lemon and a silky foam" },
    { drinkId: "11008", name: "Manhattan", image: `${IMAGE_BASE}yk70e31606771240.jpg`, caption: "Rye, sweet vermouth, bitters" },
    { drinkId: "17210", name: "Bramble", image: `${IMAGE_BASE}twtbh51630406392.jpg`, caption: "A London classic over crushed ice" },
    { drinkId: "17247", name: "The Last Word", image: `${IMAGE_BASE}91oule1513702624.jpg`, caption: "Green chartreuse at its finest" },
    { drinkId: "13837", name: "Kir Royale", image: `${IMAGE_BASE}yt9i7n1504370388.jpg`, caption: "Cassis topped with champagne" },
];

export type GalleryStory = {
    eyebrow: string;
    title: string;
    text: string;
    points: string[];
    image: string;
    imageAlt: string;
};

export const galleryStories: GalleryStory[] = [
    {
        eyebrow: "The bar",
        title: "A room made for slow evenings",
        text: "Dark wood, brass rails and warm amber light. Our twelve-seat bar is the heart of SipSpot - pull up a stool and watch every drink being built in front of you.",
        points: ["12-seat walnut bar", "Velvet booths for groups", "Vinyl-only soundtrack"],
        image: `${IMAGE_BASE}vvpxwy1439907208.jpg`,
        imageAlt: "A Sazerac on the bar",
    },
    {
        eyebrow: "The craft",
        title: "Precision behind every pour",
        text: "We cut our own clear ice, squeeze citrus to order and make every syrup in-house. Measured, stirred or shaken - each technique chosen for what the drink needs.",
        points: ["Hand-cut clear ice", "House-made syrups and bitters", "Fresh citrus every night"],
        image: `${IMAGE_BASE}tsssur1439907622.jpg`,
        imageAlt: "A Pisco Sour with a thick foam",
    },
    {
        eyebrow: "The night",
        title: "From golden hour to last call",
        text: "Early evenings are for spritzes and conversation; later, the lights drop and the stirred drinks come out. Whatever the hour, there's a seat and a glass waiting.",
        points: ["Aperitivo from 18:00", "Late nights on weekends", "Private hire for events"],
        image: `${IMAGE_BASE}eaag491504367543.jpg`,
        imageAlt: "A Bellini in a champagne flute",
    },
];
