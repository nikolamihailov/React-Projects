const productController = require("express").Router();
const { isAdmin } = require("../middlewares/isAdmin");
const { trimBody } = require("../middlewares/trimBody");
const productService = require("../services/productService");
const { extractErrors } = require("../utils/errParse");
const mongoose = require('mongoose');
// let ITEMS_PER_PAGE = 8;

productController.get("/products", async (req, res) => {
    try {
        if (Object.keys(req.query).length > 0) {
            /*  if (req.user?.data.user.role === "admin") ITEMS_PER_PAGE = 8;
             else ITEMS_PER_PAGE = 12;
             console.log(ITEMS_PER_PAGE); */
            const { page, filter, category, onPromotion, itemsPerPage } = req.query;
            const data = await productService.getAllWithFilters(itemsPerPage, page, filter, category, onPromotion,);
            res.status(200).json(data);
        } else {
            const allProducts = await productService.getAllProducts();
            res.status(200).json(allProducts);
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

productController.get("/products/:id", async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.isValidObjectId(id)) {
            const categoryName = id.charAt(0).toUpperCase() + id.slice(1);
            const allProducts = await productService.getAllProducts();
            console.log(categoryName);
            const allProductsFiltered = allProducts.filter(p => p.category.name.toLowerCase() === categoryName.toLowerCase());
            return res.status(200).json(allProductsFiltered);
        }
        const product = await productService.getOneProduct(req.params.id);
        res.status(200).json(product);
    } catch (error) {
        const errors = extractErrors(error);
        res.status(400).json({ errors });
    }
});

productController.post("/products", isAdmin, trimBody, async (req, res) => {
    try {
        if (req.decToken) {
            return res.status(401).json({ expMessage: "Your session has expired, you have to login again!" });
        }
        let { promoPrice, ...body } = req.body;
        if (promoPrice) body.promoPrice = promoPrice;
        body.price = Number(body.price);
        if (body.promoPrice >= body.price) throw new Error("Promo price must be a positive number and lower than the regular price!");
        const newProduct = await productService.addProduct(body);
        res.status(201).json(newProduct);
    } catch (error) {
        let errors = extractErrors(error);
        if (error.code === 11000) {
            errors.push('Product with this name already exists!');
        }
        errors = errors.filter(e => e.includes("E11000") ? "" : e);
        res.status(400).json({ errors });
    }
});

productController.put("/products/:id", isAdmin, trimBody, async (req, res) => {
    try {
        if (req.decToken) {
            return res.status(401).json({ expMessage: "Your session has expired, you have to login again!" });
        }
        let { promoPrice, ...body } = req.body;
        if (promoPrice) body.promoPrice = Number(promoPrice);
        body.price = Number(body.price);
        if (body.promoPrice >= body.price) throw new Error("Promo price must be a positive number and lower than the regular price!");
        const updatedProduct = await productService.editProduct(req.params.id, body);
        res.status(200).json(updatedProduct);
    } catch (error) {
        let errors = extractErrors(error);
        console.log(errors);
        if (error.code === 11000) {
            errors.push('Product with this name already exists!');
        }
        errors = errors.filter(e => e.includes("E11000") ? "" : e);
        res.status(400).json({ errors });
    }
});

productController.delete("/products/:id", isAdmin, async (req, res) => {
    try {
        if (req.decToken) {
            return res.status(401).json({ expMessage: "Your session has expired, you have to login again!" });
        }
        const deletedProduct = await productService.deleteProduct(req.params.id);
        res.status(200).json(deletedProduct);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});




module.exports = productController;