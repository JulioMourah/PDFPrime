const fs = require("fs");
const { PDFDocument } = require("pdf-lib");

async function extractPages(inputPath, outputPath, pagesToExtract) {

    const pdfBytes = fs.readFileSync(inputPath);

    const pdfDoc = await PDFDocument.load(pdfBytes);

    const newPdf = await PDFDocument.create();

    const indexes = pagesToExtract.map(page => Number(page) - 1);

    const copiedPages = await newPdf.copyPages(

        pdfDoc,

        indexes

    );

    copiedPages.forEach(page => newPdf.addPage(page));

    const bytes = await newPdf.save();

    fs.writeFileSync(outputPath, bytes);

}

module.exports = {

    extractPages

};