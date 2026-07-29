const fs = require("fs");
const { PDFDocument } = require("pdf-lib");

async function removePages(inputPath, outputPath, pagesToRemove) {

    const pdfBytes = fs.readFileSync(inputPath);

    const pdfDoc = await PDFDocument.load(pdfBytes);

    const totalPages = pdfDoc.getPageCount();

    const removeSet = new Set(

        pagesToRemove.map(p => Number(p) - 1)

    );

    const newPdf = await PDFDocument.create();

    const pages = await newPdf.copyPages(

        pdfDoc,

        [...Array(totalPages).keys()].filter(

            i => !removeSet.has(i)

        )

    );

    pages.forEach(page => newPdf.addPage(page));

    const bytes = await newPdf.save();

    fs.writeFileSync(outputPath, bytes);

}

module.exports = {

    removePages

};