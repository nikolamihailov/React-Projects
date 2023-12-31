const User = require("../models/User");
const mongoose = require('mongoose');
const ShoppingCart = require("../models/ShoppingCart");
const jwt = require("../utils/jwt");
const bcrypt = require("bcrypt");
const SECRET = process.env.JWT_SECRET; // some secret

exports.register = async (data) => {
    const { email } = data;
    const userEx = await User.findOne({ email });
    if (userEx) throw new Error("Email already exits!");

    let user = await User.create(data);
    const shoppingCart = await ShoppingCart.create({});
    user = await User.findByIdAndUpdate(user._id, { shoppingCart: shoppingCart._id }, { new: true });

    if (user) {
        const payload = {
            user: {
                _id: user._id,
                email: user.email,
                role: user.role,
                shoppingCart: user.shoppingCart
            },
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
        user: {
            _id: user._id,
            email: user.email,
            role: user.role,
            shoppingCart: user.shoppingCart
        },
    };
    const token = await generateToken(payload);
    return {
        ...payload,
        token
    };

};

exports.getUserInfo = (id) => User.findById(id);

// exports.updateUserInfo = (id, data) => User.findByIdAndUpdate(id, data, { new: true, runValidators: true });

exports.updateUserInfo = async (id, data) => {
    const { email } = data;
    const obj = new mongoose.Types.ObjectId(id);
    const userWithNewEmail = await User.findOne({ email, _id: { $ne: obj } });
    if (userWithNewEmail) {
        throw new Error("Email already exists!");
    }

    const user = await User.findByIdAndUpdate(id, data, { new: true, runValidators: true });

    return user;
};

async function generateToken(data) {
    return await jwt.sign({ data }, SECRET, { expiresIn: "1d" });
    // return await jwt.sign({ data }, SECRET, { expiresIn: "15s" });
}

// exports.getFavouriteProducts = (id) => User.findById(id).populate("favouriteProducts");

exports.getFavouriteProducts = (id) => User.findById(id).populate({
    path: "favouriteProducts",
    populate: [
        {
            path: "category",
            model: "Category"
        },
        {
            path: "reviews",
            model: "Review"
        }
    ]
});

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
    ).populate({
        path: "favouriteProducts",
        populate: [
            {
                path: "category",
                model: "Category"
            },
            {
                path: "reviews",
                model: "Review"
            }
        ]
    });

    return user;
};

exports.getAllUsers = () => User.find();

exports.getAllWithFilters = async (itemsPerPage, page, filter) => {
    const query = {};
    if (filter) {
        if (filter.includes("firstName")) query.firstName = filter.split("-")[1];
        if (filter.includes("createdAt")) query.createdAt = filter.split("-")[1];
        if (filter === "admins") query.role = "admin";
    }

    let users;
    if (query.role) users = await User.find(query);
    else if (Object.keys(query).length > 0) users = await User.find().sort(query).collation({ locale: 'en', strength: 3 });
    else users = await User.find();

    const usersCount = users.length;
    let pageCount = Math.ceil(usersCount / Number(itemsPerPage));
    let skip = Number(itemsPerPage) * (Number(page) - 1);

    if (usersCount <= Number(itemsPerPage)) {
        skip = 0;
        pageCount = 1;
    }

    users = users.slice(skip, skip + Number(itemsPerPage));
    return { users, pageCount, usersCount };
};

exports.deleteUser = async (id) => {
    const user = await User.findById(id);
    await ShoppingCart.findByIdAndDelete(user.shoppingCart);
    return User.findByIdAndDelete(id);
};

exports.getAllCount = () => User.estimatedDocumentCount();
