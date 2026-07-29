const { exec } = require("child_process");
const path = require("path");

function convertWordToPdf(inputPath, outputDir) {

    return new Promise((resolve, reject) => {

        const soffice = `"C:\\Program Files\\LibreOffice\\program\\soffice.exe"`;

        const command = `${soffice} --headless --convert-to pdf --outdir "${outputDir}" "${inputPath}"`;

        exec(command, (error) => {

            if (error) {

                return reject(error);

            }

            const outputFile = path.join(

                outputDir,

                path.basename(inputPath, path.extname(inputPath)) + ".pdf"

            );

            resolve(outputFile);

        });

    });

}

module.exports = {

    convertWordToPdf

};