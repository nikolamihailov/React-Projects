const orderController = require("express").Router();
const orderService = require("../services/orderService");
const { isAuthenticated } = require("../middlewares/isAuthenticated");
const { trimBody } = require("../middlewares/trimBody");
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


orderController.get("/orders/:id", isAuthenticated, trimBody, async (req, res) => {
    try {
        const orders = await orderService.getAllOrdersForUser(req.params.id);
        res.status(200).json(orders);
    } catch (error) {
        const errors = extractErrors(error);
        res.status(400).json({ errors });
    }
});

orderController.get("/orders/details/:id", isAuthenticated, trimBody, async (req, res) => {
    try {
        const order = await orderService.getOneOrder(req.params.id);
        res.status(200).json(order);
    } catch (error) {
        const errors = extractErrors(error);
        res.status(400).json({ errors });
    }
});
module.exports = orderController;