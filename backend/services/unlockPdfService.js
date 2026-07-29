const { execFile } = require("child_process");

const QPDF = "C:\\Program Files\\qpdf 12.3.2\\bin\\qpdf.exe";

function unlockPdf(inputPath, outputPath, password) {

    return new Promise((resolve, reject) => {

        execFile(

            QPDF,

            [

                "--password=" + password,

                "--decrypt",

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

    unlockPdf

};