
// !!!!!!!!!!!!!!!!!!
// when using do not forget - const populatedProduct = await Product.findById(productId).populate('reviews').populate('category');

const Product = require("../models/Product");


exports.getAllProducts = () => Product.find();

exports.getAllWithFilters = async (itemsPerPage = 9, page, filter = "", category) => {
    const query = {};
    if (filter) {
        if (filter.includes("name")) query.name = filter.split("-")[1];
        if (filter.includes("createdAt")) query.createdAt = filter.split("-")[1];
        if (filter.includes("price")) query.price = filter.split("-")[1];
    }

    let products;
    let findQuery = {};

    if (category) findQuery.category = category;
    if (category === "all") findQuery = {};

    if (Object.keys(query).length > 0) products = await Product.find(findQuery).sort(query).collation({ locale: 'en', strength: 2 });
    else products = await Product.find(findQuery);

    const categoryCount = products.length;

    let pageCount = Math.ceil(categoryCount / itemsPerPage);
    let skip = itemsPerPage * (page - 1);
    if (categoryCount <= itemsPerPage) {
        skip = 0;
        pageCount = 1;
    }

    products = products.slice(skip, skip + itemsPerPage);
    return { products, pageCount };

};

exports.getOneProduct = (id) => Product.findById(id);

exports.addProduct = (data) => Product.create(data);

exports.editProduct = (id, data) => Product.findByIdAndUpdate(id, data, { new: true, runValidators: true });

exports.deleteProduct = (id) => Product.findByIdAndDelete(id);

