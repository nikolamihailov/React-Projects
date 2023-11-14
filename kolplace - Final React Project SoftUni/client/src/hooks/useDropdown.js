import { useCallback, useState } from "react";

export const useDropdown = (initialState = false) => {
    const [isOpen, setIsOpen] = useState(initialState);
    const mouseEnter = useCallback(() => setIsOpen(true), []);
    const mouseLeave = useCallback(() => setIsOpen(false), []);
    return {
        isOpen,
        mouseEnter,
        mouseLeave
    };
};
