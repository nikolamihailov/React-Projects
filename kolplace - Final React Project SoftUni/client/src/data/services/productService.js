const PRODUCTS_URL = "/products";
import { request } from "../requester";

const productEndpoints = {
    createProduct: PRODUCTS_URL + "",
};

export const createProduct = async (data) => {
    return await request.post(productEndpoints.createProduct, data);
};

