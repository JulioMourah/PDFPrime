const express = require("express");
const cors = require("cors");

const imageToPdfRoutes = require("./routes/imageToPdfRoutes");
const pdfToJpgRoutes = require("./routes/pdfToJpgRoutes");
const pdfToPngRoutes = require("./routes/pdfToPngRoutes");
const mergePdfRoutes = require("./routes/mergePdfRoutes");
const splitPdfRoutes = require("./routes/splitPdfRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", imageToPdfRoutes);
app.use("/api", pdfToJpgRoutes);
app.use("/api", pdfToPngRoutes);
app.use("/api", mergePdfRoutes);
app.use("/api", splitPdfRoutes);

app.get("/", (req, res) => {
    res.json({
        status: "API funcionando"
    });
});

module.exports = app;