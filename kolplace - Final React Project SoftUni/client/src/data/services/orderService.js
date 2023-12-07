const ORDERS_URL = "/orders";
import { request } from "../requester";

const orderEnpoints = {
    createOrder: ORDERS_URL + "",
};

export const createOrder = async (data) => {
    return await request.post(orderEnpoints.createOrder, data);
};


