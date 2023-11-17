const jwt = require("../utils/jwt");

exports.auth = async (req, res, next) => {
    const token = req.header('X-Authorization');

    if (token) {
        try {
            const decToken = await jwt.verify(token, process.env.JWT_SECRET);
            req.user = decToken;
        } catch (error) {
            req.decToken = token;
        }
    }
    next();

};