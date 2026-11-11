import { MenuCocktail } from "./menuTypes";

// TheCocktailDB rate-limits bursts (~70 requests), and one menu load is 36 requests.
// Caching the curated menu in the browser means refreshes and return visits make no API calls at all.
// Bump the version whenever menuConfig curation rules change, so visitors don't keep an old menu.
const STORAGE_KEY = "sipspot:bar-menu:v1";
const MAX_AGE_MS = 24 * 60 * 60 * 1000;

type StoredMenu = {
    savedAt: number;
    menu: MenuCocktail[];
};

export const readStoredMenu = (): MenuCocktail[] | undefined => {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return undefined;

        const stored = JSON.parse(raw) as StoredMenu;
        if (Date.now() - stored.savedAt > MAX_AGE_MS || !Array.isArray(stored.menu)) return undefined;

        return stored.menu;
    } catch {
        // storage blocked (private mode) or corrupted - just fetch again
        return undefined;
    }
};

export const writeStoredMenu = (menu: MenuCocktail[]) => {
    try {
        const stored: StoredMenu = { savedAt: Date.now(), menu };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
    } catch {
        // storage full or blocked - the menu still works, it just won't be cached
    }
};
