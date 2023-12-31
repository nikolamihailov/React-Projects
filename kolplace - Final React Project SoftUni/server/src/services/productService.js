
// !!!!!!!!!!!!!!!!!!
// when using do not forget - const populatedProduct = await Product.findById(productId).populate('reviews').populate('category');

const Product = require("../models/Product");


exports.getAllProducts = () => Product.find().populate("category").populate("reviews");

exports.getAllWithFilters = async (itemsPerPage, page, filter = "", category, onPromotion) => {
    let order = "";
    const query = {};
    if (filter) {
        if (filter.includes("name")) query.name = filter.split("-")[1];
        if (filter.includes("createdAt")) query.createdAt = filter.split("-")[1];
        if (filter.includes("price")) query.price = filter.split("-")[1];
        if (filter.includes("price") && onPromotion) query.promoPrice = filter.split("-")[1];
        order = filter.split("-")[1];
    }

    let products;
    let findQuery = {};

    if (category) findQuery.category = category;
    if (category === "all") findQuery = {};

    // console.log(typeof onPromotion);
    if (onPromotion === "true") {
        findQuery.hasPromoPrice = true;
        if (Object.keys(query).length > 0) {
            products = await Product.find(findQuery).sort(query).collation({ locale: 'en', strength: 3 }).populate("category").populate("reviews");
        } else products = await Product.find(findQuery).populate("category").populate("reviews");

        if (filter === "reviews") {
            products.sort((a, b) => b.reviews.length - a.reviews.length);
        }

        const productsCount = products.length;

        let pageCount = Math.ceil(productsCount / Number(itemsPerPage));
        let skip = Number(itemsPerPage) * (Number(page) - 1);
        if (productsCount <= Number(itemsPerPage)) {
            skip = 0;
            pageCount = 1;
        }

        products = products.slice(skip, skip + Number(itemsPerPage));
        return { products, pageCount, productsCount };
    }

    /* if (Object.keys(query).length > 0) products = await Product.find(findQuery).sort(query).collation({ locale: 'en', strength: 2 });*/
    if (Object.keys(query).length > 0) {
        products = await Product.find(findQuery)
            .sort(query)
            .collation({ locale: 'en', strength: 3 }).populate("category").populate("reviews");
        if (query.price) {
            products.sort((a, b) => {
                const priceA = a.hasPromoPrice ? a.promoPrice : a.price;
                const priceB = b.hasPromoPrice ? b.promoPrice : b.price;
                if (order == "asc") return priceA - priceB;
                if (order == "desc") return priceB - priceA;
            });
        }


    } else products = await Product.find(findQuery).populate("category").populate("reviews");

    if (filter === "reviews") {
        products.sort((a, b) => b.reviews.length - a.reviews.length);
    }

    const productsCount = products.length;
    // console.log("products count", productsCount);
    // console.log("items per page", Number(itemsPerPage));
    let pageCount = Math.ceil(productsCount / Number(itemsPerPage));
    // console.log("page count", pageCount);
    // console.log("page", Number(page));

    let skip = Number(itemsPerPage) * (Number(page) - 1);
    // console.log("skip", skip);


    if (productsCount <= Number(itemsPerPage)) {
        skip = 0;
        pageCount = 1;
    }

    products = products.slice(skip, skip + Number(itemsPerPage));
    // console.log("final", products.length);
    return { products, pageCount, productsCount };

};

exports.getAllFromCategory = (categoryId) => Product.find({ category: categoryId });

exports.getOneProduct = (id) => Product.findById(id).populate("category").populate({
    path: "reviews",
    populate: {
        path: "author",
        model: "User"
    }
});

exports.addProduct = (data) => Product.create(data);

exports.editProduct = (id, data) => Product.findByIdAndUpdate(id, data, { new: true, runValidators: true });

exports.deleteProduct = (id) => Product.findByIdAndDelete(id);

exports.searchedProducts = (name) => Product.find({ name: { $regex: new RegExp(name, 'i') } })
    .collation({ locale: 'en', strength: 3 })
    .populate("category").populate("reviews");


exports.addReview = (id, reviewId) => Product.findByIdAndUpdate(id, { $push: { reviews: reviewId } }, { new: true, runValidators: true })
    .populate({
        path: "reviews",
        populate: {
            path: "author",
            model: "User"
        }
    }).populate("category");

exports.getAllCount = () => Product.estimatedDocumentCount();
