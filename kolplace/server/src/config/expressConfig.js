const express = require("express");
const { auth } = require("../middlewares/authMiddleware");
const cors = require("../middlewares/cors");

// required for .env variables as well as npm i dotenv
require('dotenv').config();

const routes = require("../routes");

// Builds the app without listening: src/index.js listens locally,
// api/index.js hands it to Vercel.
const createApp = () => {
    const app = express();
    app.use(express.json({ limit: '30mb' }));
    app.use(express.urlencoded({ extended: false, limit: '30mb' }));
    app.use(cors());
    app.get("/", (req, res) => {
        res.send("We are live!");
    });
    app.use(auth);
    app.use(routes);
    return app;
};

module.exports = createApp;
