const ShoppingCart = require("../models/ShoppingCart");

exports.getById = (id) => ShoppingCart.findById(id).populate("products.product");

/*exports.addToCart = (id, product) => ShoppingCart.findByIdAndUpdate(id, {
    $push: {
        products: product
    }
}, { new: true, runValidators: true }).populate("products.product");*/

exports.addToCart = async (id, product) => {
    let cart = await ShoppingCart.findById(id);
    const hasItem = cart.products.find(p => p.product._id.toString() === product.product);
    if (hasItem) hasItem.quantity = product.quantity;
    else {
        cart.products.push({ product: product.product, quantity: product.quantity });
    }
    await cart.save();
    cart = await ShoppingCart.findById(id).populate("products.product");
    return cart;
};

/* exports.addToCart = async (id, product) => {
    let cart = await ShoppingCart.findById(id).populate("products.product");

    // Find the index of the product in the cart
    const productIndex = cart.products.findIndex(p => p.product._id.toString() === product.product);

    if (productIndex !== -1) {
        // If the product exists, update the quantity
        cart.products[productIndex].quantity = product.quantity;
    } else {
        // If the product does not exist, add it to the cart
        cart.products.push({ product: product.product, quantity: product.quantity });
    }

    // Save the cart
    await cart.save();

    // Populate the products before returning
    cart = await ShoppingCart.findById(id).populate("products.product");

    return cart;
}; */


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
