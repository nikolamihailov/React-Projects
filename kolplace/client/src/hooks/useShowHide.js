import { useCallback, useState } from "react";

export const useShowHide = (initialState = false) => {
    const [isOpen, setIsOpen] = useState(initialState);
    const mouseEnter = useCallback(() => setIsOpen(true), []);
    const mouseLeave = useCallback(() => setIsOpen(false), []);
    const showHide = useCallback(() => setIsOpen(state => !state), []);
    return {
        isOpen,
        mouseEnter,
        mouseLeave,
        showHide
    };
};
