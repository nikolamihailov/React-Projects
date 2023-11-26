const SHOPPINGCART_URL = "/shopping-cart";
import { request } from "../requester";

const shoppingCartEndpoints = {
    getById: SHOPPINGCART_URL + "/",
    addToCart: SHOPPINGCART_URL + "/",

};

export const getCart = async (id) => {
    return await request.get(shoppingCartEndpoints.getById + id);
};

export const addToCart = async (id, data) => {
    return await request.post(shoppingCartEndpoints.addToCart + id, data);
};




