const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Product name is required!"],
        minLength: [5, "Product name must be at least 5 characters!"],
        maxLength: [40, "Product name must not be more than 40 characters!"],
    },
    images: [
        {
            type: String,
            required: [true, "Product image is required!"],
            match: [/^https?:\/\/.+/, "Provide valid image link!"]
        }
    ],
    description: {
        type: String,
        required: [true, "Product description is required!"],
        minLength: [30, "Product description must be at least 30 characters!"],
        maxLength: [400, "Product description must not be more than 400 characters!"],
    },
    price: {
        type: Number,
        required: [true, "Product price is required!"],
        validate: {
            validator: function (value) {
                return value > 0 && value < 10000;
            },
            message: 'Price must be positive number and in range (1-9999)!'
        }
    },
    promoPrice: {
        type: Number,
        validate: {
            validator: function (value) {
                return value === undefined || (value > 0 && value < this.price);
            },
            message: 'Promo price must be a positive number and lower than the regular price!'
        }
    },
    reviews: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Review"
        }
    ],
    category: {
        type: mongoose.Types.ObjectId,
        ref: "Category",
        required: [true, "Category is required!"],
    }

}, {
    timestamps: true,
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;