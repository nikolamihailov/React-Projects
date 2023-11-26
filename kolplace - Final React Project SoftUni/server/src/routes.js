const router = require("express").Router();
const userController = require("./controllers/userController");
const categoryController = require("./controllers/categoryController");
const productController = require("./controllers/productController");
const shoppingCartController = require("./controllers/shoppingCartController");


router.use("/users", userController);
router.use(productController);
router.use(categoryController);
router.use(shoppingCartController);

module.exports = router;