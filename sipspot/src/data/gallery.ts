// Interior photos are hotlinked from Unsplash (free licence) - swap in real SipSpot photography when available
const UNSPLASH_BASE = "https://images.unsplash.com/photo-";

// builds a cropped, compressed Unsplash URL at the requested width
export const unsplashUrl = (photoId: string, width: number) =>
    `${UNSPLASH_BASE}${photoId}?auto=format&fit=crop&q=75&w=${width}`;

export type GalleryPhoto = {
    photoId: string;
    title: string;
    caption: string;
};

// order matters - the bento grid in _gallery.scss gives the 1st and 6th photo the large tiles
export const galleryPhotos: GalleryPhoto[] = [
    { photoId: "1572116469696-31de0f17cc34", title: "The main bar", caption: "Brass, back-lit bottles and a dozen walnut stools" },
    { photoId: "1597075687490-8f673c6c17f6", title: "Last call", caption: "A martini waiting on the polished counter" },
    { photoId: "1574096079513-d8259312b785", title: "The back room", caption: "Stained glass and dark wood for quieter nights" },
    { photoId: "1585518419759-7fe2e0fbf8a6", title: "Velvet booths", caption: "Padded walls and soft light for groups" },
    { photoId: "1514933651103-005eec06c04b", title: "Behind the counter", caption: "Where every syrup and bitters is made in-house" },
    { photoId: "1578474846511-04ba529f0b88", title: "The dining room", caption: "White linen, low light and long conversations" },
    { photoId: "1516997121675-4c2d1684aa3e", title: "Private hire", caption: "Set for celebrations of up to forty guests" },
    { photoId: "1543007630-9710e4a00a20", title: "Golden hour", caption: "The room as the first guests arrive" },
    { photoId: "1590846406792-0adc7f938f1d", title: "The lounge", caption: "Deep chairs and a vinyl-only soundtrack" },
    { photoId: "1517248135467-4c7edcad34c4", title: "Tables for two", caption: "Our favourite corner for a quiet evening" },
];

// Story photos come from TheCocktailDB
const IMAGE_BASE = "https://www.thecocktaildb.com/images/media/drink/";

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
