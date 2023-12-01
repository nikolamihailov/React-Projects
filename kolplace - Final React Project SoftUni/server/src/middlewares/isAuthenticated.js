exports.isAuthenticated = (req, res, next) => {
    if (req.user?.data.user._id) {
        next();
    } else {
        res.status(401).json({ unathorized: "You have no power here!" });
    }
};