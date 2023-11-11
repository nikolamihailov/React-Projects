const userController = require("express").Router();

userController.post("/login", (req, res) => {
    res.json({ "login": "ok" });
});

userController.post("/register", (req, res) => {
    res.json({ "register": "ok" });
});

module.exports = userController;