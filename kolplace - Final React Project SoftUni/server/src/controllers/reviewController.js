const reviewController = require("express").Router();
const { isAuthenticated } = require("../middlewares/isAuthenticated");
const { trimBody } = require("../middlewares/trimBody");
const { isAdmin } = require("../middlewares/isAdmin");
const reviewService = require("../services/reviewService");
const { extractErrors } = require("../utils/errParse");

const ITEMS_PER_PAGE = 6;

reviewController.get("/reviews", isAdmin, async (req, res) => {
    try {
        const { page, filter } = req.query;
        const data = await reviewService.getAllWithFilters(ITEMS_PER_PAGE, page, filter);
        res.status(200).json(data);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

reviewController.get("/reviews/:id", isAdmin, async (req, res) => {
    try {
        const data = await reviewService.getOneReview(req.params.id);
        res.status(200).json(data);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


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

reviewController.delete("/reviews/:id", isAdmin, async (req, res) => {
    try {
        console.log("in");
        const review = await reviewService.deleteReview(req.params.id);
        res.status(201).json(review);
    } catch (error) {
        const errors = extractErrors(error);
        console.log(errors);
        res.status(400).json({ errors });
    }
});


module.exports = reviewController;