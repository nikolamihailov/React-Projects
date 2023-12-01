exports.isAdmin = (req, res, next) => {
    if (req.user.data.user && req.user?.data.user.role === "admin") {
        next();
    } else {
        res.status(401).json({ unathorized: "You have no power here!" });
    }
};