const jwt = require("../utils/jwt");

exports.auth = async (req, res, next) => {
    const token = req.header('x-auth');

    if (token) {
        try {
            const decToken = await jwt.verify(token, process.env.JWT_SECRET);
            req.user = decToken;
            next();
        } catch (error) {
            res.status(401).json({
                message: "Unauthorized, sorry!"
            });
        }
    } else {
        next();
    }
};