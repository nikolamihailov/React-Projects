const PRODUCTS_URL = "/products";
import { request } from "../requester";

const productEndpoints = {
    getAll: PRODUCTS_URL + "",
    getOne: PRODUCTS_URL + "/",
    createProduct: PRODUCTS_URL + "",
    editProduct: PRODUCTS_URL + "/",
    deleteProduct: PRODUCTS_URL + "/",
};


export const getAllWithFilters = async (page = "", filter = "", category) => {
    return await request.get(productEndpoints.getAll + `?page=${page}&filter=${filter}&category=${category}`);
};

export const getOneProduct = async (id) => {
    return await request.get(productEndpoints.getOne + id);
};

export const createProduct = async (data) => {
    return await request.post(productEndpoints.createProduct, data);
};

export const editProduct = async (id, data) => {
    return await request.put(productEndpoints.editProduct + id, data);
};

export const deleteProduct = async (id) => {
    return await request.delete(productEndpoints.deleteProduct + id);
};


