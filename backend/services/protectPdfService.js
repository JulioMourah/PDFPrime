const { execFile } = require("child_process");

const QPDF =
    process.platform === "win32"
        ? "C:\\Program Files\\qpdf 12.3.2\\bin\\qpdf.exe"
        : "qpdf";

function protectPdf(inputPath, outputPath, password) {

    return new Promise((resolve, reject) => {

        execFile(

            QPDF,

            [

                "--encrypt",

                password,

                password,

                "256",

                "--",

                inputPath,

                outputPath

            ],

            (error) => {

                if (error) {

                    return reject(error);

                }

                resolve();

            }

        );

    });

}

module.exports = {

    protectPdf

};