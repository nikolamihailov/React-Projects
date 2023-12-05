const reviewController = require("express").Router();
const { isAuthenticated } = require("../middlewares/isAuthenticated");
const { trimBody } = require("../middlewares/trimBody");
const reviewService = require("../services/reviewService");
const { extractErrors } = require("../utils/errParse");



reviewController.post("/reviews", isAuthenticated, trimBody, async (req, res) => {
    try {
        const review = await reviewService.createReview({ ...req.body });
        res.status(201).json(review);
    } catch (error) {
        const errors = extractErrors(error);
        console.log(errors);
        res.status(400).json({ errors });
    }
});

module.exports = reviewController;