// Vercel serverless entry point: every request is rewritten here (vercel.json).
const createApp = require("../src/config/expressConfig");
const connectDB = require("../src/config/dbConfig");

const app = createApp();

module.exports = async (req, res) => {
    try {
        await connectDB();
    } catch (error) {
        console.error("DB connect fail", error);
        return res.status(503).json({ error: "Database unavailable, please try again." });
    }
    return app(req, res);
};
