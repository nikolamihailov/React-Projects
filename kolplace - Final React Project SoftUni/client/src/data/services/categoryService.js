const CATEGORIES_URL = "/categories";
import { request } from "../requester";

const categoryEndpoints = {
    getAll: CATEGORIES_URL + "",
    getOne: CATEGORIES_URL + "/",
    getAllAdmin: CATEGORIES_URL + "/admin",
    createCategory: CATEGORIES_URL + "",
    editCategory: CATEGORIES_URL + "/",
    deleteCategory: CATEGORIES_URL + "/",
};

export const getAll = async () => {
    return await request.get(categoryEndpoints.getAll);
};

export const getAllWithFilters = async (page = "", filter = "") => {
    return await request.get(categoryEndpoints.getAll + `?page=${page}&filter=${filter}`);
};

export const getAllCategoriesAdmin = async () => {
    console.log(categoryEndpoints.getAllAdmin);
    return await request.get(categoryEndpoints.getAllAdmin);
};

export const getOneCategory = async (id) => {
    return await request.get(categoryEndpoints.getOne + id);
};

export const getOneCategoryByName = async (name) => {
    return await request.get(categoryEndpoints.getOne + name);
};

export const createCategory = async (data) => {
    return await request.post(categoryEndpoints.createCategory, data);
};

export const editCategory = async (id, data) => {
    return await request.put(categoryEndpoints.editCategory + id, data);
};

export const deleteCategory = async (id) => {
    return await request.delete(categoryEndpoints.deleteCategory + id);
};


