const mongoose = require("mongoose");

const storeSchema = new mongoose.Schema({
    storeImage: {
        type: String,

        required: [true, "Store image is required!"]
    },
    city: {
        type: String,
        minLength: [5, "City must be at least 5 characters!"],
        maxLength: [60, "City must not be more than 60 characters!"],
        required: [true, "City is required!"]
    },
    phone: {
        type: String,
        required: [true, "Phone is required!"],
        validate: {
            validator: function (value) {
                const regex = /^(?:\+?(?:[0-9] ?){6,14}[0-9]|0[0-9]{9})$/;
                return regex.test(value);
            },
            message: "Invalid phone number!"
        }
    },
    coordinates: {
        type: String,
        validate: {
            validator: function (value) {
                const regex = /^[\d\s.,]+$/;

                console.log("Input value:", value);

                const isValid = regex.test(value);
                console.log("Validation result:", isValid);

                return isValid;
            },
            message: "Invalid coordinates format!"
        },
        minLength: [30, "Coordinates must be at least 5 characters!"],
        maxLength: [200, "Coordinates must not be more than 60 characters!"],
        required: [true, "Coordinates are required!"]
    },
});

const Store = mongoose.model("Store", storeSchema);

module.exports = Store;