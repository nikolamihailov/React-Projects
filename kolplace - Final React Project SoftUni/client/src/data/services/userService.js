const USERS_URL = "/users";
import { request } from "../requester";

const userEndpoints = {
    register: USERS_URL + "/register",
    login: USERS_URL + "/login",
    logout: USERS_URL + "/logout",
};

export const register = async (data) => {
    return await request.post(userEndpoints.register, data);
};

export const login = async (data) => {
    return await request.post(userEndpoints.login, data);
};