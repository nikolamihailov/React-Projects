exports.isAdmin = (req, res, next) => {
    if (req.user?.data.user && req.user?.data.user.role === "admin") {
        next();
    } else {
        console.log("in");
        if (req.decToken) {
            console.log("in expired");
            return res.status(401).json({ expMessage: "Your session has expired, you have to login again!" });
        }
        res.status(401).json({ unathorized: "You have no power here!" });
    }
};