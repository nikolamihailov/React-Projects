const productController = require("express").Router();
const { isAdmin } = require("../middlewares/isAdmin");
const productService = require("../services/productService");
const { extractErrors } = require("../utils/errParse");

productController.post("/products", isAdmin, async (req, res) => {
    try {
        if (req.decToken) {
            return res.status(401).json({ expMessage: "Your session has expired, you have to login again!" });
        }

        let { hasPromoPrice, ...body } = req.body;
        if (!hasPromoPrice) {
            const { promoPrice, hasPromoPrice, ...rest } = req.body;
            body = rest;
        }
        console.log(req.body);
        const newProduct = await productService.addProduct(body);
        res.status(201).json(newProduct);
    } catch (error) {
        const errors = extractErrors(error);
        console.log(errors);
        res.status(400).json({ errors });
    }
});




module.exports = productController;