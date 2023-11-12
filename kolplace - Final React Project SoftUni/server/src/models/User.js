const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First name is required!"],
        minLength: [3, "First name must be at least 3 characters!"],
        maxLength: [15, "First name must not be more than 15 characters!"],
    },
    lastName: {
        type: String,
        required: [true, "Last name is required!"],
        minLength: [3, "Last name must be at least 3 characters!"],
        maxLength: [15, "Last name must not be more than 15 characters!"],
    },
    email: {
        type: String,
        required: [true, "Email is required!"],
        minLength: [7, "Email must be at least 7 characters!"],
        maxLength: [25, "Email must not be more than 25 characters!"],
        unique: true,
        validate: {
            validator: async function (email) {
                const user = await User.findOne({ email });
                return !user;
            },
            message: 'Email already exists!',
        },
    },
    password: {
        type: String,
        required: [true, "Password is required!"],
        minLength: [6, "Password must be at least 6 characters!"],
        maxLength: [20, "Password must not be more than 20 characters!"],
    },
    role: {
        type: String,
        enum: ['normalUser', 'admin'],
        default: 'normalUser'
    }
});
userSchema.pre("save", async function () {
    const hash = await bcrypt.hash(this.password, 11);
    this.password = hash;
});
const User = mongoose.model("User", userSchema);

module.exports = User;
