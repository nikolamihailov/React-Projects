// Long-running server for local development (and Render until the switch).
const createApp = require("./config/expressConfig");
const connectDB = require("./config/dbConfig");

const PORT = process.env.PORT || 3030;

connectDB()
    .then(() => {
        createApp().listen(PORT, () => console.log("Server is listening on port " + PORT));
    })
    .catch((error) => {
        console.log("DB connect fail, LOL!", error);
        process.exit(1);
    });
