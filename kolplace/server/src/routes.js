const router = require("express").Router();
const userController = require("./controllers/userController");
const categoryController = require("./controllers/categoryController");
const productController = require("./controllers/productController");
const shoppingCartController = require("./controllers/shoppingCartController");
const storeController = require("./controllers/storeController");
const reviewController = require("./controllers/reviewController");
const orderController = require("./controllers/orderController");


router.use("/users", userController);
router.use(productController);
router.use(categoryController);
router.use(shoppingCartController);
router.use(storeController);
router.use(reviewController);
router.use(orderController);

module.exports = router;