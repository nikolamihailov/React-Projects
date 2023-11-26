const shoppingCartController = require("express").Router();
const shoppingCartService = require("../services/shoppingCartService");

shoppingCartController.get("/shopping-cart/:id", async (req, res) => {
    try {
        const cart = await shoppingCartService.getById(req.params.id);
        res.status(200).json(cart);
    } catch (error) {
        res.status(400).json({ error });
    }
});

shoppingCartController.post("/shopping-cart/:id", async (req, res) => {
    try {
        console.log(req.params.id);
        console.log(req.body);
        const updatedCart = await shoppingCartService.addToCart(req.params.id, req.body);
        console.log(updatedCart);
        res.status(200).json(updatedCart);
    } catch (error) {
        res.status(400).json({ error });
    }
});

module.exports = shoppingCartController;