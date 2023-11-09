import { useState } from "react";

export const useDropdown = (initialState = false) => {
    const [isOpen, setIsOpen] = useState(initialState);
    const mouseEnter = () => setIsOpen(true);
    const mouseLeave = () => setIsOpen(false);
    return {
        isOpen,
        mouseEnter,
        mouseLeave
    };
};
