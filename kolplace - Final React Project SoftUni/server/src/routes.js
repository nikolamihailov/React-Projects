const router = require("express").Router();
const userController = require("./controllers/userController");
const categoryController = require("./controllers/categoryController");

router.use("/users", userController);
router.use(categoryController);

module.exports = router;