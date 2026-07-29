const fs = require("fs");
const { PDFDocument } = require("pdf-lib");

async function signPdf(

    pdfPath,

    imagePath,

    outputPath,

    pageNumber

) {

    const pdfBytes = fs.readFileSync(pdfPath);

    const pdfDoc = await PDFDocument.load(pdfBytes);

    const imageBytes = fs.readFileSync(imagePath);

    let image;

    if (imagePath.toLowerCase().endsWith(".png")) {

        image = await pdfDoc.embedPng(imageBytes);

    } else {

        image = await pdfDoc.embedJpg(imageBytes);

    }

    const page = pdfDoc.getPage(pageNumber - 1);

    const { width } = page.getSize();

    const imgWidth = 150;

    const imgHeight = image.height * (imgWidth / image.width);

    page.drawImage(image, {

        x: width - imgWidth - 40,

        y: 40,

        width: imgWidth,

        height: imgHeight

    });

    const bytes = await pdfDoc.save();

    fs.writeFileSync(outputPath, bytes);

}

module.exports = {

    signPdf

};