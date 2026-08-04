const fs = require("fs");
const path = require("path");
const { PDFDocument } = require("pdf-lib");

async function mergePdfs(files, outputPath) {

    fs.mkdirSync(path.dirname(outputPath), { recursive: true });

    const mergedPdf = await PDFDocument.create();

    for (const file of files) {

        const bytes = fs.readFileSync(file.path);

        const pdf = await PDFDocument.load(bytes);

        const pages = await mergedPdf.copyPages(
            pdf,
            pdf.getPageIndices()
        );

        pages.forEach(page => mergedPdf.addPage(page));

    }

    const pdfBytes = await mergedPdf.save();

    fs.writeFileSync(outputPath, pdfBytes);

}

module.exports = {
    mergePdfs
};