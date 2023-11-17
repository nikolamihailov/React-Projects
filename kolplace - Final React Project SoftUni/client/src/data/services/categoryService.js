const CATEGORIES_URL = "/categories";
import { request } from "../requester";

const categoryEndpoints = {
    getAll: CATEGORIES_URL + "",
    createCategory: CATEGORIES_URL + "",
};

export const getAll = async () => {
    return await request.get(categoryEndpoints.getAll);
};

export const createCategory = async (data) => {
    return await request.post(categoryEndpoints.createCategory, data);
};

