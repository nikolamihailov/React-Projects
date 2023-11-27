const ShoppingCart = require("../models/ShoppinCart");

exports.getById = (id) => ShoppingCart.findById(id).populate("products.product");

exports.addToCart = (id, product) => ShoppingCart.findByIdAndUpdate(id, {
    $push: {
        products: product
    }
}, { new: true, runValidators: true }).populate("products.product");

exports.removeProduct = async (id, product) => {
    const cart = await ShoppingCart.findById(id).populate("products.product");
    // console.log(cart.products[0].product._id.toString());
    // console.log(product.productId);
    const productsFiltered = cart.products.filter(p => p.product._id.toString() !== product.productId);
    cart.products = productsFiltered;
    await cart.save();
    return cart;
};

exports.emptyCart = (id) => ShoppingCart.findByIdAndUpdate(id, {
    $set: {
        products: []
    }
}, { new: true, runValidators: true });
