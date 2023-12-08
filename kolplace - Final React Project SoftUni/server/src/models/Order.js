const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First name is required!"]
    },
    lastName: {
        type: String,
        required: [true, "Last name is required!"]
    },
    email: {
        type: String,
        required: [true, "Email is required!"]
    },
    city: {
        type: String,
        required: [true, "City is required!"]
    },
    deliveryType: {
        type: String,
        required: [true, "Delivery is required!"]
    },
    address: {
        type: String,
        required: [true, "Address is required!"]
    },
    paymentMethod: {
        type: String,
        required: [true, "Payment method is required!"]
    },
    products: [{
        product: {
            type: mongoose.Types.ObjectId,
            ref: "Product"
        },
        quantity: {
            type: Number
        }
    }],
    totalPrice: {
        type: Number,
        required: [true, "Total price is required!"]
    },
    maker: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }

}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
