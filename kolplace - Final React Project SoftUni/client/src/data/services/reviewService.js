const REVIEW_URL = "/reviews";
import { request } from "../requester";

const reviewEnpoints = {
    createReview: REVIEW_URL + "",
};

export const createReview = async (data) => {
    return await request.post(reviewEnpoints.createReview, data);
};


