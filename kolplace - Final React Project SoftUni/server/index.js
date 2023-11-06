const express = require("express");
const PORT = process.env.PORT || 3030;
const app = express();

app.get("/", (req, res) => {
    res.send("Started");
});

app.listen(PORT, "Server is listening on port " + PORT);