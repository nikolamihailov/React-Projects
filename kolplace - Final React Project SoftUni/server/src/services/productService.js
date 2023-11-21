
// !!!!!!!!!!!!!!!!!!
// when using do not forget - const populatedProduct = await Product.findById(productId).populate('reviews').populate('category');

const Product = require("../models/Product");

exports.addProduct = (data) => Product.create(data);