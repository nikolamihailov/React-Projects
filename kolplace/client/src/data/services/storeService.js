const STORES_URL = "/stores";
import { request } from "../requester";

const storeEndpoints = {
    getAll: STORES_URL + "",
    getAllAdmin: STORES_URL + "/admin",
    getOne: STORES_URL + "/",
    createStore: STORES_URL + "",
    updateStore: STORES_URL + "/",
};

export const getAll = async () => {
    return await request.get(storeEndpoints.getAll);
};

export const getAllStoresAdmin = async () => {
    return await request.get(storeEndpoints.getAllAdmin);
};

export const getOne = async (id) => {
    return await request.get(storeEndpoints.getOne + id);
};

export const createStore = async (data) => {
    return await request.post(storeEndpoints.createStore, data);
};

export const updateStore = async (id, data) => {
    return await request.put(storeEndpoints.updateStore + id, data);
};

export const deleteStore = async (id) => {
    return await request.delete(storeEndpoints.updateStore + id);
};

