const categoryController = require("express").Router();
const { isAdmin } = require("../middlewares/isAdmin");
const categoryService = require("../services/categoryService");
const { extractErrors } = require("../utils/errParse");
const mongoose = require('mongoose');
const ITEMS_PER_PAGE = 3;

categoryController.get("/categories", async (req, res) => {
    try {
        if (req.decToken) {
            return res.status(401).json({ expMessage: "Your session has expired, you have to login again!" });
        }
        if (Object.keys(req.query).length > 0) {
            const { page, filter } = req.query;
            const data = await categoryService.getAllWithFilters(ITEMS_PER_PAGE, page, filter);
            res.status(200).json(data);
        } else {
            const allCategories = await categoryService.getAllCategories();
            res.status(200).json(allCategories);
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

categoryController.get("/categories/:id", async (req, res) => {
    try {
        if (req.decToken) {
            return res.status(401).json({ expMessage: "Your session has expired, you have to login again!" });
        }
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            const name = id.charAt(0).toUpperCase() + id.slice(1);
            console.log(name);
            const category = await categoryService.getOneCategoryByName(name);
            return res.status(200).json(category);
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
        let errors = extractErrors(error);
        if (error.code === 11000) {
            errors.push('Category with this name already exists!');
        }
        errors = errors.filter(e => e.includes("E11000") ? "" : e);
        res.status(400).json({ errors });
    }
});

categoryController.put("/categories/:id", isAdmin, async (req, res) => {
    try {
        if (req.decToken) {
            return res.status(401).json({ expMessage: "Your session has expired, you have to login again!" });
        }
        const updatedCategory = await categoryService.editCategory(req.params.id, { ...req.body });
        res.status(200).json(updatedCategory);
    } catch (error) {
        let errors = extractErrors(error);
        if (error.code === 11000) {
            errors.push('Category with this name already exists!');
        }
        errors = errors.filter(e => e.includes("E11000") ? "" : e);
        res.status(400).json({ errors });
    }
});

categoryController.delete("/categories/:id", isAdmin, async (req, res) => {
    try {
        if (req.decToken) {
            return res.status(401).json({ expMessage: "Your session has expired, you have to login again!" });
        }
        const deletedCategory = await categoryService.deleteCategory(req.params.id);
        res.status(200).json(deletedCategory);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = categoryController;