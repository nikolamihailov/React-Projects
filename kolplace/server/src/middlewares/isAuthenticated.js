exports.isAuthenticated = (req, res, next) => {
    if (req.user?.data.user._id) {
        next();
    } else {
        if (req.decToken) {
            return res.status(401).json({ expMessage: "Your session has expired, you have to login again!" });
        }
        res.status(401).json({ unathorized: "You have no power here!" });
    }
};