const mongoose = require("mongoose");
const CONN_STR = process.env.MONGO_DB_URL;
const DB_NAME = process.env.DB_NAME;

const connectDb = () => {
    try {
        mongoose.connect(CONN_STR + DB_NAME);
        console.log("Database connected, let's gooo!");
    } catch (error) {
        console.log("DB connect fail, LOL!");
    }
};

module.exports = connectDb;

