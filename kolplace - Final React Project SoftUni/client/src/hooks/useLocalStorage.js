import { useCallback, useState } from "react";

const useLocalStorage = (lsKey, initialState) => {
    const [user, setUser] = useState(() => {
        const userDataJSON = localStorage.getItem(lsKey);
        if (userDataJSON) return JSON.parse(userDataJSON);
        return initialState;
    });

    const setStorageState = useCallback((data) => {
        setUser(data);

        localStorage.setItem(lsKey, JSON.stringify(data));
    }, [lsKey]);

    return [user, setStorageState];
};

export default useLocalStorage;