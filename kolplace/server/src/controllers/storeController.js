const storeController = require("express").Router();
const { isAdmin } = require("../middlewares/isAdmin");
const { trimBody } = require("../middlewares/trimBody");
const storeService = require("../services/storeService");
const { extractErrors } = require("../utils/errParse");

storeController.get("/stores", async (req, res) => {
    try {
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

storeController.get("/stores/admin", isAdmin, async (req, res) => {
    try {
        if (req.decToken) {
            return res.status(401).json({ expMessage: "Your session has expired, you have to login again!" });
        }
        const storesCount = await storeService.getAllCount();
        res.status(200).json(storesCount);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


storeController.get("/stores/:id", async (req, res) => {
    try {
        const store = await storeService.getStoreById(req.params.id);
        res.status(201).json(store);
    } catch (error) {
        const errors = extractErrors(error);
        res.status(400).json({ errors });
    }
});

storeController.put("/stores/:id", isAdmin, trimBody, async (req, res) => {
    try {
        if (req.decToken) {
            return res.status(401).json({ expMessage: "Your session has expired, you have to login again!" });
        }
        const newStore = await storeService.updateStore(req.params.id, { ...req.body });
        res.status(201).json(newStore);
    } catch (error) {
        const errors = extractErrors(error);
        res.status(400).json({ errors });
    }
});

storeController.delete("/stores/:id", isAdmin, async (req, res) => {
    try {
        if (req.decToken) {
            return res.status(401).json({ expMessage: "Your session has expired, you have to login again!" });
        }
        const newStore = await storeService.deleteStore(req.params.id);
        res.status(201).json(newStore);
    } catch (error) {
        const errors = extractErrors(error);
        res.status(400).json({ errors });
    }
});




module.exports = storeController;