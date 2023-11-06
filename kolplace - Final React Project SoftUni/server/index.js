const express = require("express");
// required for .env variables as well as npm i dotenv
require('dotenv').config();
const PORT = process.env.PORT || 3030;

const app = express();

app.get("/", (req, res) => {
    res.send("Started");
});

app.listen(PORT, () => console.log("Server is listening on port " + PORT));