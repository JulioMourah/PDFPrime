const fs = require("fs");
const { PDFDocument } = require("pdf-lib");

async function compressPdf(inputPath, outputPath) {

    const bytes = fs.readFileSync(inputPath);

    const pdfDoc = await PDFDocument.load(bytes);

    const pdfBytes = await pdfDoc.save({

        useObjectStreams: true,
        addDefaultPage: false,
        objectsPerTick: 50

    });

    fs.writeFileSync(outputPath, pdfBytes);

}

module.exports = {

    compressPdf

};
