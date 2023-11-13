const userController = require("express").Router();
const userService = require("../services/userService");
const { trimBody } = require("../middlewares/trimBody");
const { extractErrors } = require("../utils/errParse");

userController.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const userData = await userService.login(email, password);
        res.status(200).json(userData);
    } catch (error) {
        const errors = extractErrors(error);
        res.status(401).json({ errors });
    }
});

userController.post("/register", trimBody, async (req, res) => {
    try {
        const userData = await userService.register({ ...req.body });
        res.status(201).json(userData);
    } catch (error) {
        const errors = extractErrors(error);
        res.status(400).json({ errors });
    }
});

module.exports = userController;