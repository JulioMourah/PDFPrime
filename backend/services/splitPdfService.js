const fs = require("fs");
const { PDFDocument } = require("pdf-lib");

async function splitPdf(pdfPath, pageNumber, outputPath) {

    const bytes = fs.readFileSync(pdfPath);

    const pdf = await PDFDocument.load(bytes);

    const totalPages = pdf.getPageCount();

    if (pageNumber < 1 || pageNumber > totalPages) {

        throw new Error("Página inválida.");

    }

    const newPdf = await PDFDocument.create();

    const [page] = await newPdf.copyPages(

        pdf,

        [pageNumber - 1]

    );

    newPdf.addPage(page);

    const pdfBytes = await newPdf.save();

    fs.writeFileSync(outputPath, pdfBytes);

}

module.exports = {

    splitPdf

};