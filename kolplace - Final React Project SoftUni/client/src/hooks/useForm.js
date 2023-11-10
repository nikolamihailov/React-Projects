import { useState } from "react";

export const useForm = (initialState, submitHandler) => {
    const [values, setValues] = useState(initialState);

    const changeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setValues(state => ({ ...state, [name]: value }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        submitHandler(values);
        setValues(initialState);
    };

    return {
        values,
        changeHandler,
        onSubmit
    };
};