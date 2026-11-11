export type NavItem = {
    label: string;
    to: string;
};

export const navLinks: NavItem[] = [
    { label: "Home", to: "/" },
    { label: "Recipes", to: "/recipes" },
    { label: "Gallery", to: "/gallery" },
    { label: "About us", to: "/about-us" },
];
