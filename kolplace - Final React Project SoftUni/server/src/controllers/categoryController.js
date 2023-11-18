const categoryController = require("express").Router();
const { isAdmin } = require("../middlewares/isAdmin");
const categoryService = require("../services/categoryService");
const { extractErrors } = require("../utils/errParse");

const ITEMS_PER_PAGE = 3;

categoryController.get("/categories", async (req, res) => {
    try {
        if (req.decToken) {
            return res.status(401).json({ expMessage: "Your session has expired, you have to login again!" });
        }
        if (req.query.page) {
            const { page } = req.query;
            const data = await categoryService.getAllWithPagination(ITEMS_PER_PAGE, page);
            res.status(200).json(data);
        } else {
            const allCategories = await categoryService.getAllCategories();
            res.status(200).json(allCategories);
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

categoryController.get("/categories/:id", isAdmin, async (req, res) => {
    try {
        if (req.decToken) {
            return res.status(401).json({ expMessage: "Your session has expired, you have to login again!" });
        }
        const category = await categoryService.getOneCategory(req.params.id);
        res.status(200).json(category);
    } catch (error) {
        const errors = extractErrors(error);
        res.status(400).json({ errors });
    }
});

categoryController.post("/categories", isAdmin, async (req, res) => {
    try {
        if (req.decToken) {
            return res.status(401).json({ expMessage: "Your session has expired, you have to login again!" });
        }
        const newCategory = await categoryService.createCategory({ ...req.body });
        res.status(201).json(newCategory);
    } catch (error) {
        const errors = extractErrors(error);
        res.status(400).json({ errors });
    }
});

categoryController.put("/categories/:id", isAdmin, async (req, res) => {
    try {
        if (req.decToken) {
            return res.status(401).json({ expMessage: "Your session has expired, you have to login again!" });
        }
        const updatedCategory = await categoryService.editCategory(req.params.id, { ...req.body });
        console.log(updatedCategory);
        res.status(201).json(updatedCategory);
    } catch (error) {
        const errors = extractErrors(error);
        res.status(400).json({ errors });
    }
});

module.exports = categoryController;