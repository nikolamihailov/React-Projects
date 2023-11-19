const Category = require("../models/Category");

exports.getAllCategories = () => Category.find();

exports.getAllWithFilters = async (itemsPerPage = 3, page, filter = "") => {
    const query = {};
    if (filter) {
        if (filter.includes("name")) query.name = filter.split("-")[1];
        if (filter.includes("createdAt")) query.createdAt = filter.split("-")[1];
    }

    const categoryCount = await Category.estimatedDocumentCount();
    const pageCount = Math.ceil(categoryCount / itemsPerPage);
    const skip = itemsPerPage * (page - 1);

    let categories;

    if (Object.keys(query).length > 0) categories = await Category.find().sort(query).collation({ locale: 'en', strength: 2 });
    else categories = await Category.find();

    categories = categories.slice(skip, skip + itemsPerPage);
    return { categories, pageCount };

};
exports.getOneCategory = (id) => Category.findById(id);

exports.createCategory = (data) => Category.create(data);

exports.editCategory = (id, data) => Category.findByIdAndUpdate(id, data, { new: true, runValidators: true });

exports.deleteCategory = (id) => Category.findByIdAndDelete(id);
