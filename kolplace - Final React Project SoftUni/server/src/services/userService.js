const User = require("../models/User");
const mongoose = require('mongoose');
const ShoppingCart = require("../models/ShoppingCart");
const jwt = require("../utils/jwt");
const bcrypt = require("bcrypt");
const SECRET = process.env.JWT_SECRET;

exports.register = async (data) => {

    const user = await User.create(data);
    const shoppingCart = await ShoppingCart.create({});
    await User.findByIdAndUpdate(user._id, { shoppingCart: shoppingCart._id });

    if (user) {
        const payload = {
            user,
            _id: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role
        };
        const token = await generateToken(payload);
        return {
            ...payload,
            token
        };
    }
};

exports.login = async (email, password) => {

    const user = await User.findOne({ email });
    if (!user) throw new Error("Invalid email or password!");

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) throw new Error("Invalid email or password!");

    const payload = {
        user,
        _id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role
    };
    const token = await generateToken(payload);
    return {
        ...payload,
        token
    };

};

async function generateToken(data) {
    return await jwt.sign({ data }, SECRET, { expiresIn: "1d" });
    // return await jwt.sign({ data }, SECRET, { expiresIn: "15s" });
}

exports.getFavouriteProducts = (id) => User.findById(id).populate("favouriteProducts");

exports.addProductToFavourites = (id, product) => User.findByIdAndUpdate(id, {
    $push: {
        favouriteProducts: product.productId
    }
}, { new: true, runValidators: true }).populate("favouriteProducts");

exports.removeProductFromFavourites = async (id, product) => {

    const obj = new mongoose.Types.ObjectId(product.productId);

    const user = await User.findByIdAndUpdate(
        id,
        { $pull: { favouriteProducts: obj } },
        { new: true }
    ).populate("favouriteProducts");

    return user;
}

