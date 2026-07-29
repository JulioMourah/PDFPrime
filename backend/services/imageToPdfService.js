const fs = require("fs");
const { PDFDocument } = require("pdf-lib");

async function convertImageToPdf(imagePath, mimeType, outputPath) {

    const pdfDoc = await PDFDocument.create();

    const imageBytes = fs.readFileSync(imagePath);

    let image;

    if (mimeType === "image/png") {

        image = await pdfDoc.embedPng(imageBytes);

    } else if (
        mimeType === "image/jpeg" ||
        mimeType === "image/jpg"
    ) {

        image = await pdfDoc.embedJpg(imageBytes);

    } else {

        throw new Error("Formato não suportado.");

    }

    const page = pdfDoc.addPage([

        image.width,
        image.height

    ]);

    page.drawImage(image, {

        x: 0,
        y: 0,
        width: image.width,
        height: image.height

    });

    const pdfBytes = await pdfDoc.save();

    fs.writeFileSync(outputPath, pdfBytes);

}

module.exports = {

    convertImageToPdf

};