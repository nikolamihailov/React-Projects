const mongoose = require("mongoose");

let connection = null;

// Reuses one connection per process. On Vercel a warm function instance
// handles many requests, so connecting on every request would exhaust Atlas.
const connectDb = () => {
    if (!connection) {
        // Read env here so dotenv has been loaded by the time this runs.
        const CONN_STR = process.env.MONGO_DB_URL_SEC; // mongodb://127.0.0.1:27017/
        const DB_NAME = process.env.DB_NAME; // your-name-db

        connection = mongoose.connect(CONN_STR + DB_NAME)
            .then(() => console.log("Database connected, let's gooo!"))
            .catch((error) => {
                connection = null; // let the next request retry
                throw error;
            });
    }
    return connection;
};

module.exports = connectDb;
