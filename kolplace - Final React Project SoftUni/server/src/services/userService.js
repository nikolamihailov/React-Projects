const User = require("../models/User");
const jwt = require("../utils/jwt");
const bcrypt = require("bcrypt");
const SECRET = process.env.JWT_SECRET;

exports.register = async (data) => {

    const user = await User.create(data);

    if (user) {
        const token = await generateToken(user._id);
        return {
            _id: user._id,
            email: user.email,
            token,
            role: user.role
        };
    }
};

exports.login = async (email, password) => {

    const user = await User.findOne({ email });
    if (!user) throw new Error("Invalid email or password!");

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) throw new Error("Invalid email or password!");

    const token = await generateToken(user._id);
    return {
        _id: user._id,
        email: user.email,
        token,
        role: user.role
    };

};

async function generateToken(id) {
    return await jwt.sign({ id }, SECRET, { expiresIn: "1d" });
}
