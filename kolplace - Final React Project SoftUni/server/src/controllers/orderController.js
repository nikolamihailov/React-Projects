const orderController = require("express").Router();
const orderService = require("../services/orderService");
const { isAuthenticated } = require("../middlewares/isAuthenticated");
const { extractErrors } = require("../utils/errParse");


orderController.post("/orders", isAuthenticated, async (req, res) => {
    try {
        const order = await orderService.createOrder(req.body);
        res.status(201).json(order);
    } catch (error) {
        const errors = extractErrors(error);
        res.status(400).json({ errors });
    }
});
module.exports = orderController;