const fs = require("fs");
const { PDFDocument, degrees } = require("pdf-lib");

async function rotatePdf(inputPath, outputPath, angle) {

    const bytes = fs.readFileSync(inputPath);

    const pdf = await PDFDocument.load(bytes);

    const pages = pdf.getPages();

    pages.forEach(page => {

        page.setRotation(degrees(angle));

    });

    const output = await pdf.save();

    fs.writeFileSync(outputPath, output);

}

module.exports = {

    rotatePdf

};