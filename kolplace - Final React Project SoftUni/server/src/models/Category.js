const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({

});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;