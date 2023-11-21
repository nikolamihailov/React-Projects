const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Product name is required!"],
        minLength: [5, "Product name must be at least 5 characters!"],
        maxLength: [60, "Product name must not be more than 60 characters!"],
        unique: true,
        validator: async function (name) {
            if (this.isModified('name') || this.isNew) {
                const product = await Product.findOne({ name });
                return !product;
            }
            return true;
        },
        message: 'Product with this name already exists!',
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
    hasPromoPrice: {
        type: Boolean,
    },
    promoPrice: {
        type: Number,
    },
    description: {
        type: String,
        required: [true, "Product description is required!"],
        minLength: [30, "Product description must be at least 30 characters!"],
        maxLength: [2000, "Product description must not be more than 2000 characters!"],
    },
    mainImage: {
        type: String,
        required: [true, "Product image is required!"],
        match: [/^https?:\/\/.+/, "Provide valid image link!"]
    },
    imageTwo: {
        type: String,
        match: [/^https?:\/\/.+/, "Provide valid image 2 link!"]
    },
    imageThree: {
        type: String,
        match: [/^https?:\/\/.+/, "Provide valid image 3 link!"]
    },
    imageFour: {
        type: String,
        match: [/^https?:\/\/.+/, "Provide valid image 4 link!"]
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