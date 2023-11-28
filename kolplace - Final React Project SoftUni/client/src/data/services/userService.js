const USERS_URL = "/users";
import { request } from "../requester";

const userEndpoints = {
    register: USERS_URL + "/register",
    login: USERS_URL + "/login",
    logout: USERS_URL + "/logout",
    getFavouriteProducts: USERS_URL + "/",
    addProductToFavourites: USERS_URL + "/",
    removeProductFromFavourites: USERS_URL + "/",
};

export const register = async (data) => {
    return await request.post(userEndpoints.register, data);
};

export const login = async (data) => {
    return await request.post(userEndpoints.login, data);
};

export const getFavouriteProducts = async (userId) => {
    return await request.get(userEndpoints.getFavouriteProducts + userId);
};

export const addProductToFavourites = async (userId, data) => {
    return await request.post(userEndpoints.addProductToFavourites + userId, data);
};

export const removeProductFromFavourites = async (userId, data) => {
    return await request.put(userEndpoints.removeProductFromFavourites + userId, data);
};