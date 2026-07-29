const pdf = require("pdf-poppler");
const path = require("path");
const fs = require("fs");

async function convertPdfToJpg(pdfPath, outputPath) {

    const outputDir = path.dirname(outputPath);

    const outputFile = path.basename(outputPath, ".jpg");

    const options = {

        format: "jpeg",
        out_dir: outputDir,
        out_prefix: outputFile,
        page: 1

    };

    await pdf.convert(pdfPath, options);

    const generatedFile = path.join(

        outputDir,

        `${outputFile}-1.jpg`

    );

    if (!fs.existsSync(generatedFile)) {

        throw new Error("Falha ao gerar a imagem.");

    }

    fs.renameSync(

        generatedFile,

        outputPath

    );

}

module.exports = {

    convertPdfToJpg

};