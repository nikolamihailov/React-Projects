const USERS_URL = "/users";
import { request } from "../requester";

const userEndpoints = {
    register: USERS_URL + "/register",
    login: USERS_URL + "/login",
    logout: USERS_URL + "/logout",
    getUserInfo: USERS_URL + "/",
    updateUserInfo: USERS_URL + "/",
    getFavouriteProducts: USERS_URL + "/",
    addProductToFavourites: USERS_URL + "/",
    removeProductFromFavourites: USERS_URL + "/",
    getAllUsers: USERS_URL + "/",
    deleteUser: USERS_URL + "/"
};

export const register = async (data) => {
    return await request.post(userEndpoints.register, data);
};

export const login = async (data) => {
    return await request.post(userEndpoints.login, data);
};

export const getProfile = async (userId) => {
    return await request.get(userEndpoints.getUserInfo + userId);
};

export const updateProfile = async (userId, data) => {
    return await request.put(userEndpoints.updateUserInfo + userId, data);
};

export const deleteUser = async (userId) => {
    return await request.delete(userEndpoints.deleteUser + userId);
};

export const getFavouriteProducts = async (userId) => {
    return await request.get(userEndpoints.getFavouriteProducts + userId + "/favourites");
};

export const addProductToFavourites = async (userId, data) => {
    return await request.post(userEndpoints.addProductToFavourites + userId + "/favourites", data);
};

export const removeProductFromFavourites = async (userId, data) => {
    return await request.put(userEndpoints.removeProductFromFavourites + userId + "/favourites", data);
};

export const getAllUsers = async () => {
    return await request.get(userEndpoints.getAllUsers);
};

export const getAllWithFilters = async (page = "", filter = "") => {
    return await request.get(userEndpoints.getAllUsers + `?page=${page}&filter=${filter}`);
};