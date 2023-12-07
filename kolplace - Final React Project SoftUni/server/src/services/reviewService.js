const Review = require("../models/Review");
const Product = require("../models/Product");

exports.createReview = (data) => Review.create(data);

exports.getAll = () => Review.find().populate("product").populate("author");

exports.getOneReview = (id) => Review.findById(id).populate("product").populate("author");

exports.getAllWithFilters = async (itemsPerPage = 6, page, filter = "") => {
    const query = {};
    if (filter) {
        if (filter.includes("createdAt")) query.createdAt = filter.split("-")[1];
        if (filter.includes("rating")) query.rating = filter.split("-")[1];
    }

    const reviewCount = await Review.estimatedDocumentCount();
    const pageCount = Math.ceil(reviewCount / itemsPerPage);
    const skip = itemsPerPage * (page - 1);

    let reviews;

    if (Object.keys(query).length > 0) reviews = await Review.find().sort(query).collation({ locale: 'en', strength: 2 }).populate("product").populate("author");
    else reviews = await Review.find().populate("product").populate("author");

    reviews = reviews.slice(skip, skip + itemsPerPage);
    return { reviews, pageCount };

};

exports.deleteReview = async (id) => {

    const review = await Review.findById(id).populate("product");

    const product = await Product.findById(review.product._id).populate("reviews");

    //  console.log(review._id.toString());
    product.reviews = product.reviews.filter(r => r._id.toString() !== review._id.toString());

    //console.log("----------------------------------------------");
    //  console.log(product);
    await product.save();

    const deletedReview = await Review.findByIdAndDelete(id).populate("product").populate("author");

    return deletedReview;

};