const router = require("express").Router();
const userController = require("./controllers/userController");
const categoryController = require("./controllers/categoryController");
const productController = require("./controllers/productController");

router.use("/users", userController);
router.use(productController);
router.use(categoryController);

module.exports = router;