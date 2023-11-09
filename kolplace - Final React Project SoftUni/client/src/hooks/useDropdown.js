import { useState } from "react";

const useDropdown = (initialState = false) => {
    const [isOpen, setIsOpen] = useState(initialState);
    const mouseEnter = () => setIsOpen(true);
    const mouseLeave = () => setIsOpen(false);

    return {
        isOpen,
        mouseEnter,
        mouseLeave
    };
};

export default useDropdown;