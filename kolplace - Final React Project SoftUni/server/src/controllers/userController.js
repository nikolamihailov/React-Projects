const userController = require("express").Router();
const userService = require("../services/userService");
const { trimBody } = require("../middlewares/trimBody");
const { isAuthenticated } = require("../middlewares/isAuthenticated");
const { isAdmin } = require("../middlewares/isAdmin");
const { extractErrors } = require("../utils/errParse");
const ITEMS_PER_PAGE = 6;

userController.post("/login", trimBody, async (req, res) => {
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

/* userController.post("/register", trimBody, async (req, res) => {
    try {
        const userData = await userService.register({ ...req.body });
        res.status(201).json(userData);
    } catch (error) {
        const errors = extractErrors(error);
        res.status(400).json({ errors });
    }
}); */

userController.get("/admin", isAdmin, async (req, res) => {
    try {
        if (req.decToken) {
            return res.status(401).json({ expMessage: "Your session has expired, you have to login again!" });
        }
        const usersCount = await userService.getAllCount();
        res.status(200).json(usersCount);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

userController.get("/", isAdmin, async (req, res) => {
    try {
        if (req.decToken) {
            return res.status(401).json({ expMessage: "Your session has expired, you have to login again!" });
        }
        if (Object.keys(req.query).length > 0) {
            const { page, filter } = req.query;
            const data = await userService.getAllWithFilters(ITEMS_PER_PAGE, page, filter);
            res.status(200).json(data);
        } else {
            const userData = await userService.getAllUsers();
            res.status(200).json(userData);
        }
    } catch (error) {
        const errors = extractErrors(error);
        res.status(400).json({ errors });
    }
});

userController.get("/:id", isAuthenticated, async (req, res) => {
    try {
        if (req.decToken) {
            return res.status(401).json({ expMessage: "Your session has expired, you have to login again!" });
        }
        const userData = await userService.getUserInfo(req.params.id);
        res.status(200).json(userData);
    } catch (error) {
        const errors = extractErrors(error);
        res.status(400).json({ errors });
    }
});

userController.put("/:id", isAuthenticated, trimBody, async (req, res) => {
    try {
        if (req.decToken) {
            return res.status(401).json({ expMessage: "Your session has expired, you have to login again!" });
        }
        const userData = await userService.updateUserInfo(req.params.id, { ...req.body });
        res.status(201).json(userData);
    } catch (error) {
        if (error.message === 'The value of "offset" is out of range. It must be >= 0 && <= 17825792. Received 17825794') {
            return res.status(400).json({ errors: ["File size too large! File must be below 15MB!"] });
        }
        const errors = extractErrors(error);
        res.status(400).json({ errors });
    }
});

userController.delete("/:id", isAdmin, async (req, res) => {
    try {
        if (req.decToken) {
            return res.status(401).json({ expMessage: "Your session has expired, you have to login again!" });
        }
        const userData = await userService.deleteUser(req.params.id);
        res.status(200).json(userData);
    } catch (error) {
        const errors = extractErrors(error);
        res.status(400).json({ errors });
    }
});

userController.get("/:id/favourites", isAuthenticated, async (req, res) => {
    try {
        if (req.decToken) {
            return res.status(401).json({ expMessage: "Your session has expired, you have to login again!" });
        }
        const userData = await userService.getFavouriteProducts(req.params.id);
        res.status(201).json(userData.favouriteProducts);
    } catch (error) {
        const errors = extractErrors(error);
        res.status(400).json({ errors });
    }
});

userController.post("/:id/favourites", isAuthenticated, async (req, res) => {
    try {
        if (req.decToken) {
            return res.status(401).json({ expMessage: "Your session has expired, you have to login again!" });
        }
        const userData = await userService.addProductToFavourites(req.params.id, req.body);
        res.status(201).json(userData.favouriteProducts);
    } catch (error) {
        const errors = extractErrors(error);
        res.status(400).json({ errors });
    }
});

userController.put("/:id/favourites", isAuthenticated, async (req, res) => {
    try {
        if (req.decToken) {
            return res.status(401).json({ expMessage: "Your session has expired, you have to login again!" });
        }
        const userData = await userService.removeProductFromFavourites(req.params.id, req.body);
        res.status(201).json(userData.favouriteProducts);
    } catch (error) {
        const errors = extractErrors(error);
        res.status(400).json({ errors });
    }
});






module.exports = userController;