const express = require("express");
const cors = require("cors");

// Grupo 1
const imageToPdfRoutes = require("./routes/imageToPdfRoutes");
const pdfToJpgRoutes = require("./routes/pdfToJpgRoutes");
const pdfToPngRoutes = require("./routes/pdfToPngRoutes");
const mergePdfRoutes = require("./routes/mergePdfRoutes");
const splitPdfRoutes = require("./routes/splitPdfRoutes");

// Grupo 2
const compressPdfRoutes = require("./routes/compressPdfRoutes");
const rotatePdfRoutes = require("./routes/rotatePdfRoutes");
const reorderPdfRoutes = require("./routes/reorderPdfRoutes");
const protectPdfRoutes = require("./routes/protectPdfRoutes");
const unlockPdfRoutes = require("./routes/unlockPdfRoutes");
const signPdfRoutes = require("./routes/signPdfRoutes");
const removePagesRoutes = require("./routes/removePagesRoutes");

// Grupo 3
const extractPagesRoutes = require("./routes/extractPagesRoutes");
const pdfToWordRoutes = require("./routes/pdfToWordRoutes");
const pdfToExcelRoutes = require("./routes/pdfToExcelRoutes");
const pdfToPowerPointRoutes = require("./routes/pdfToPowerPointRoutes");
const pdfToTextRoutes = require("./routes/pdfToTextRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Grupo 1
app.use("/api", imageToPdfRoutes);
app.use("/api", pdfToJpgRoutes);
app.use("/api", pdfToPngRoutes);
app.use("/api", mergePdfRoutes);
app.use("/api", splitPdfRoutes);

// Grupo 2
app.use("/api", compressPdfRoutes);
app.use("/api", rotatePdfRoutes);
app.use("/api", reorderPdfRoutes);
app.use("/api", protectPdfRoutes);
app.use("/api", unlockPdfRoutes);
app.use("/api", signPdfRoutes);
app.use("/api", removePagesRoutes);

// Grupo 3
app.use("/api", extractPagesRoutes);
app.use("/api", pdfToWordRoutes);
app.use("/api", pdfToExcelRoutes);
app.use("/api", pdfToPowerPointRoutes);
app.use("/api", pdfToTextRoutes);

app.get("/", (req, res) => {
    res.json({
        status: "API funcionando"
    });
});

module.exports = app;