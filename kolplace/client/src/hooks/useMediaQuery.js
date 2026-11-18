import { useEffect, useState } from "react";

// True while the media query matches. Use the same em breakpoints as the CSS
// so JS and stylesheets switch layouts at the same width, also when the user
// has a larger default font size.
const useMediaQuery = (query) => {
    const [matches, setMatches] = useState(() => window.matchMedia(query).matches);

    useEffect(() => {
        const list = window.matchMedia(query);
        const onChange = () => setMatches(list.matches);
        onChange();
        list.addEventListener("change", onChange);
        return () => list.removeEventListener("change", onChange);
    }, [query]);

    return matches;
};

export default useMediaQuery;
