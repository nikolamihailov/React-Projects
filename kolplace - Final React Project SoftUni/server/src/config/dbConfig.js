const mongoose = require("mongoose");
//const CONN_STR = process.env.MONGO_DB_URL; // mongodb://127.0.0.1:27017/
const CONN_STR = process.env.MONGO_DB_URL_SEC; // mongodb://127.0.0.1:27017/
const DB_NAME = process.env.DB_NAME; // your-name-db

const connectDb = async () => {
    try {
        await mongoose.connect(CONN_STR + DB_NAME);
        console.log("Database connected, let's gooo!");
    } catch (error) {
        console.log("DB connect fail, LOL!", error);
        process.exit(1);
    }
};

module.exports = connectDb;

