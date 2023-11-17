const categoryController = require("express").Router();
const { isAdmin } = require("../middlewares/isAdmin");
const categoryService = require("../services/categoryService");
const { extractErrors } = require("../utils/errParse");

categoryController.get("/categories", async (req, res) => {
    try {
        const allCategories = await categoryService.getAllCategories();
        if (req.decToken) {
            return res.status(401).json({ expMessage: "Your session has expired, you have to login again!" });
        }
        res.status(200).json(allCategories);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

categoryController.post("/categories", isAdmin, async (req, res) => {
    try {
        const newCategory = await categoryService.createCategory({ ...req.body });
        if (req.decToken) {
            return res.status(401).json({ expMessage: "Your session has expired, you have to login again!" });
        }
        res.status(201).json(newCategory);
    } catch (error) {
        const errors = extractErrors(error);
        res.status(400).json({ errors });
    }
});

module.exports = categoryController;