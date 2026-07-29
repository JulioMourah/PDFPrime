const express = require("express");
const cors = require("cors");

const imageToPdfRoutes = require("./routes/imageToPdfRoutes");
const pdfToJpgRoutes = require("./routes/pdfToJpgRoutes");
const pdfToPngRoutes = require("./routes/pdfToPngRoutes");
const mergePdfRoutes = require("./routes/mergePdfRoutes");
const splitPdfRoutes = require("./routes/splitPdfRoutes");
const compressPdfRoutes = require("./routes/compressPdfRoutes");
const rotatePdfRoutes = require("./routes/rotatePdfRoutes");
const reorderPdfRoutes = require("./routes/reorderPdfRoutes");
const protectPdfRoutes = require("./routes/protectPdfRoutes");
const unlockPdfRoutes = require("./routes/unlockPdfRoutes");
const signPdfRoutes = require("./routes/signPdfRoutes");
const removePagesRoutes = require("./routes/removePagesRoutes");
const extractPagesRoutes = require("./routes/extractPagesRoutes");

const pdfToWordRoutes = require("./routes/pdfToWordRoutes");
const pdfToExcelRoutes = require("./routes/pdfToExcelRoutes");
const pdfToPowerPointRoutes = require("./routes/pdfToPowerPointRoutes");
const pdfToTextRoutes = require("./routes/pdfToTextRoutes");

const wordToPdfRoutes = require("./routes/wordToPdfRoutes");
const excelToPdfRoutes = require("./routes/excelToPdfRoutes");
const powerPointToPdfRoutes = require("./routes/powerPointToPdfRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", imageToPdfRoutes);
app.use("/api", pdfToJpgRoutes);
app.use("/api", pdfToPngRoutes);
app.use("/api", mergePdfRoutes);
app.use("/api", splitPdfRoutes);
app.use("/api", compressPdfRoutes);
app.use("/api", rotatePdfRoutes);
app.use("/api", reorderPdfRoutes);
app.use("/api", protectPdfRoutes);
app.use("/api", unlockPdfRoutes);
app.use("/api", signPdfRoutes);
app.use("/api", removePagesRoutes);
app.use("/api", extractPagesRoutes);

app.use("/api", pdfToWordRoutes);
app.use("/api", pdfToExcelRoutes);
app.use("/api", pdfToPowerPointRoutes);
app.use("/api", pdfToTextRoutes);

app.use("/api", wordToPdfRoutes);
app.use("/api", excelToPdfRoutes);
app.use("/api", powerPointToPdfRoutes);

app.get("/", (req, res) => {

    res.json({

        projeto: "PDFPrime",

        status: "API funcionando 🚀"

    });

});

module.exports = app;