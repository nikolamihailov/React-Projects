const shoppingCartController = require("express").Router();
const shoppingCartService = require("../services/shoppingCartService");
const { isAuthenticated } = require("../middlewares/isAuthenticated");



shoppingCartController.get("/shopping-cart/:id", isAuthenticated, async (req, res) => {
    try {
        if (req.decToken) {
            return res.status(401).json({ expMessage: "Your session has expired, you have to login again!" });
        }
        const cart = await shoppingCartService.getById(req.params.id);
        res.status(200).json(cart);
    } catch (error) {
        res.status(400).json({ error });
    }
});

shoppingCartController.post("/shopping-cart/:id", isAuthenticated, async (req, res) => {
    try {
        if (req.decToken) {
            return res.status(401).json({ expMessage: "Your session has expired, you have to login again!" });
        }
        const updatedCart = await shoppingCartService.addToCart(req.params.id, req.body);
        res.status(200).json(updatedCart);
    } catch (error) {
        res.status(400).json({ error });
    }
});

shoppingCartController.put("/shopping-cart/:id", isAuthenticated, async (req, res) => {
    try {
        if (req.decToken) {
            return res.status(401).json({ expMessage: "Your session has expired, you have to login again!" });
        }
        console.log(req.body);
        const updatedCart = await shoppingCartService.removeProduct(req.params.id, req.body);
        res.status(200).json(updatedCart);
    } catch (error) {
        res.status(400).json({ error });
    }
});

shoppingCartController.delete("/shopping-cart/:id", isAuthenticated, async (req, res) => {
    try {
        if (req.decToken) {
            return res.status(401).json({ expMessage: "Your session has expired, you have to login again!" });
        }
        const updatedCart = await shoppingCartService.emptyCart(req.params.id);
        res.status(200).json(updatedCart);
    } catch (error) {
        res.status(400).json({ error });
    }
});

module.exports = shoppingCartController;