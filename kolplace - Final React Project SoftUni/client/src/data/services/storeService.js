const STORES_URL = "/stores";
import { request } from "../requester";

const storeEndpoints = {
    getAll: STORES_URL + "",
    createStore: STORES_URL + "",
};

export const getAll = async () => {
    console.log(storeEndpoints.getAll);
    return await request.get(storeEndpoints.getAll);
};

export const createStore = async (data) => {
    return await request.post(storeEndpoints.createStore, data);
};
