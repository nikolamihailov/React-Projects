const userController = require("express").Router();
const userService = require("../services/userService");

userController.post("/login", (req, res) => {
    res.json({ "login": "ok" });
});

userController.post("/register", async (req, res) => {
    const user = await userService.register({ ...req.body });
    res.json(user);
});

module.exports = userController;