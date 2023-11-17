const User = require("../models/User");
const jwt = require("../utils/jwt");
const bcrypt = require("bcrypt");
const SECRET = process.env.JWT_SECRET;

exports.register = async (data) => {

    const user = await User.create(data);

    if (user) {
        const payload = {
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
}
