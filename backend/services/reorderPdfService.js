const fs = require("fs");
const { PDFDocument } = require("pdf-lib");

async function reorderPdf(inputPath, outputPath, order) {

    const bytes = fs.readFileSync(inputPath);

    const pdf = await PDFDocument.load(bytes);

    const output = await PDFDocument.create();

    const indices = order.map(n => Number(n) - 1);

    const copiedPages = await output.copyPages(

        pdf,

        indices

    );

    copiedPages.forEach(page => {

        output.addPage(page);

    });

    const result = await output.save();

    fs.writeFileSync(

        outputPath,

        result

    );

}

module.exports = {

    reorderPdf

};