const orderController = require("express").Router();
const orderService = require("../services/orderService");
const { isAuthenticated } = require("../middlewares/isAuthenticated");
const { isAdmin } = require("../middlewares/isAdmin");
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

orderController.get("/orders/admin", isAdmin, async (req, res) => {
    try {
        if (req.decToken) {
            return res.status(401).json({ expMessage: "Your session has expired, you have to login again!" });
        }
        const orders = await orderService.getAllCount();
        res.status(200).json({ ordersCount: orders.ordersCount, totalPrice: orders.totalPrice });
    } catch (error) {
        res.status(400).json({ error: error.message });
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