const REVIEWS_URL = "/reviews";
import { request } from "../requester";

const reviewEnpoints = {
    getAll: REVIEWS_URL + "",
    getOne: REVIEWS_URL + "/",
    createReview: REVIEWS_URL + "",
    deleteReview: REVIEWS_URL + "/"
};

export const getOne = async (id) => {
    return await request.get(reviewEnpoints.getOne + id);
};

export const createReview = async (data) => {
    return await request.post(reviewEnpoints.createReview, data);
};

export const getAllWithFilters = async (page = "", filter = "") => {
    return await request.get(reviewEnpoints.getAll + `?page=${page}&filter=${filter}`);
};

export const deleteReview = async (id) => {
    return await request.delete(reviewEnpoints.deleteReview + id);
};

