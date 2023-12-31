const ORDERS_URL = "/orders";
import { request } from "../requester";

const orderEnpoints = {
    getAll: ORDERS_URL + "/",
    getAllAdmin: ORDERS_URL + "/admin",
    getOne: ORDERS_URL + "/details/",
    createOrder: ORDERS_URL + "",
};

export const getOneOrder = async (id) => {
    return await request.get(orderEnpoints.getOne + id);
};

export const getAllMineOrders = async (id) => {
    return await request.get(orderEnpoints.getAll + id);
};

export const createOrder = async (data) => {
    return await request.post(orderEnpoints.createOrder, data);
};

export const getAllOrdersAdmin = async () => {
    return await request.get(orderEnpoints.getAllAdmin);
};

