const { execFile } = require("child_process");
const path = require("path");
const fs = require("fs");

async function convertPdfToPng(pdfPath, outputPath) {

    return new Promise((resolve, reject) => {

        const outputDir = path.dirname(outputPath);

        const outputPrefix = path.join(

            outputDir,

            path.basename(outputPath, ".png")

        );

        execFile(

            "pdftoppm",

            [

                "-png",
                "-f", "1",
                "-singlefile",
                pdfPath,
                outputPrefix

            ],

            (error) => {

                if (error) {

                    return reject(error);

                }

                const generatedFile = `${outputPrefix}.png`;

                if (!fs.existsSync(generatedFile)) {

                    return reject(new Error("Falha ao gerar PNG."));

                }

                fs.renameSync(

                    generatedFile,

                    outputPath

                );

                resolve();

            }

        );

    });

}

module.exports = {

    convertPdfToPng

};