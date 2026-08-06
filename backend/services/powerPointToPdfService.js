const { exec } = require("child_process");
const path = require("path");

const SOFFICE =
    process.platform === "win32"
        ? `"C:\\Program Files\\LibreOffice\\program\\soffice.exe"`
        : "soffice";

function convertPowerPointToPdf(inputPath, outputDir) {

    return new Promise((resolve, reject) => {

        const command = `${SOFFICE} --headless --convert-to pdf --outdir "${outputDir}" "${inputPath}"`;

        exec(command, (error) => {

            if (error) {

                return reject(error);

            }

            resolve(
                path.join(
                    outputDir,
                    path.basename(inputPath, path.extname(inputPath)) + ".pdf"
                )
            );

        });

    });

}

module.exports = {

    convertPowerPointToPdf

};