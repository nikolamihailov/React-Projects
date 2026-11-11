import { useEffect, useState } from "react";

export const useDebounce = <T>(value: T, delayMs = 400): T => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timeoutId = setTimeout(() => setDebouncedValue(value), delayMs);
        return () => clearTimeout(timeoutId);
    }, [value, delayMs]);

    return debouncedValue;
};
