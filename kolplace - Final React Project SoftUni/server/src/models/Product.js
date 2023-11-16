const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({

});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;