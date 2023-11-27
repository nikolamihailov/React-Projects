const SHOPPINGCART_URL = "/shopping-cart";
import { request } from "../requester";

const shoppingCartEndpoints = {
    getById: SHOPPINGCART_URL + "/",
    addToCart: SHOPPINGCART_URL + "/",
    removeProduct: SHOPPINGCART_URL + "/",
    emptyCart: SHOPPINGCART_URL + "/",

};

export const getCart = async (id) => {
    return await request.get(shoppingCartEndpoints.getById + id);
};

export const addToCart = async (id, data) => {
    return await request.post(shoppingCartEndpoints.addToCart + id, data);
};

export const removeProduct = async (id, data) => {
    return await request.put(shoppingCartEndpoints.removeProduct + id, data);
};

export const emptyCart = async (id) => {
    return await request.delete(shoppingCartEndpoints.emptyCart + id);
};




