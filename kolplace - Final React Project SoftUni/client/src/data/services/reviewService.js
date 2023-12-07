const REVIEW_URL = "/reviews";
import { request } from "../requester";

const reviewEnpoints = {
    getAll: REVIEW_URL + "",
    getOne: REVIEW_URL + "/",
    createReview: REVIEW_URL + "",
    deleteReview: REVIEW_URL + "/"
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

