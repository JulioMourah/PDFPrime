const { exec } = require("child_process");
const path = require("path");

function pdfToExcel(inputPath, outputPath) {

    return new Promise((resolve, reject) => {

        const python = "C:\\Users\\Pedro Santos\\AppData\\Local\\Programs\\Python\\Python313\\python.exe";

        const script = path.join(
            __dirname,
            "..",
            "scripts",
            "pdfToExcel.py"
        );

        const command = `"${python}" "${script}" "${inputPath}" "${outputPath}"`;

        exec(command, (error, stdout, stderr) => {

            if (error) {

                reject(stderr || error.message);

                return;

            }

            resolve(stdout);

        });

    });

}

module.exports = {

    pdfToExcel

};