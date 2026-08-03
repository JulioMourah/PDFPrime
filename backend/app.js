const express = require("express");
const cors = require("cors");

const imageToPdfRoutes = require("./routes/imageToPdfRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", imageToPdfRoutes);

app.get("/", (req, res) => {
    res.json({
        status: "API funcionando"
    });
});

module.exports = app;