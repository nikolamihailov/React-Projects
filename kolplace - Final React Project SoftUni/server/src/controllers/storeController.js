const storeController = require("express").Router();
const { isAdmin } = require("../middlewares/isAdmin");
const { trimBody } = require("../middlewares/trimBody");
const storeService = require("../services/storeService");
const { extractErrors } = require("../utils/errParse");

storeController.get("/stores", async (req, res) => {
    try {
        if (req.decToken) {
            return res.status(401).json({ expMessage: "Your session has expired, you have to login again!" });
        }
        const allStores = await storeService.getAllStores();
        res.status(200).json(allStores);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

storeController.post("/stores", isAdmin, trimBody, async (req, res) => {
    try {
        if (req.decToken) {
            return res.status(401).json({ expMessage: "Your session has expired, you have to login again!" });
        }
        const newStore = await storeService.createStore({ ...req.body });
        res.status(201).json(newStore);
    } catch (error) {
        const errors = extractErrors(error);
        res.status(400).json({ errors });
    }
});

module.exports = storeController;