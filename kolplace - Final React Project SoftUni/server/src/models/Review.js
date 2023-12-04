const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    text: {
        type: String,
        minLength: [2, "Review length cannot be less than 2 characters!"],
        maxLength: [200, "Review length cannot be more than 200 characters!"],
        required: [true, "Review text is required!"]
    },
    rating: {
        type: Numbere,
        required: [true, "Rating is required!"],
        validate: {
            validator: function (value) {
                return value >= 1 && value <= 5;
            },
            message: 'Rating must be 1-5!'
        }
    },
    product: {
        type: mongoose.Types.ObjectId,
        ref: "Product"
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true });

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;