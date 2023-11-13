import { useState } from "react";

const useLocalStorage = (lsKey, initialState) => {
    const [user, setUser] = useState(() => {
        const userDataJSON = localStorage.getItem(lsKey);
        if (userDataJSON) return JSON.parse(userDataJSON);
        return initialState;
    });

    const setStorageState = (data) => {
        setUser(data);

        localStorage.setItem(lsKey, JSON.stringify(data));
    };

    return [user, setStorageState];
};

export default useLocalStorage;