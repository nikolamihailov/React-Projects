const Category = require("../models/Category");

exports.getAllCategories = () => Category.find();

exports.createCategory = (data) => Category.create(data);