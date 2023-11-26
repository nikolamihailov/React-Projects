const ShoppingCart = require("../models/ShoppinCart");

exports.getById = (id) => ShoppingCart.findById(id).populate("products.product");

exports.addToCart = (id, product) => ShoppingCart.findByIdAndUpdate(id, {
    $push: {
        products: product
    }
}, { new: true, runValidators: true });
