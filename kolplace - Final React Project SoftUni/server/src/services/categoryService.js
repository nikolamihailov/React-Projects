const Category = require("../models/Category");

exports.getAllCategories = () => Category.find();

exports.getAllWithPagination = async (itemsPerPage = 3, page) => {

    const categoryCount = await Category.estimatedDocumentCount();

    const pageCount = Math.ceil(categoryCount / itemsPerPage);
    const skip = itemsPerPage * (page - 1);

    const categories = await Category.find().skip(skip).limit(itemsPerPage);

    return { categories, pageCount };

};
exports.getOneCategory = (id) => Category.findById(id);

exports.createCategory = (data) => Category.create(data);

exports.editCategory = (id, data) => Category.findByIdAndUpdate(id, data, { runValidators: true });


