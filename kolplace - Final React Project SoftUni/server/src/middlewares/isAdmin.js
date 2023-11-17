exports.isAdmin = (req, res, next) => {
    if (req.user && req.user.data.role === "admin") {
        next();
    } else {
        res.status(401).json({ unathorized: "You have no power here!" });
    }
};