const startServer = require("./config/expressConfig");
const connectDB = require("./config/dbConfig");

startServer();
connectDB();