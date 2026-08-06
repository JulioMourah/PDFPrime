const { exec } = require("child_process");
const path = require("path");

const PYTHON =
    process.platform === "win32"
        ? "C:\\Users\\Pedro Santos\\AppData\\Local\\Programs\\Python\\Python313\\python.exe"
        : "python3";

function pdfToExcel(inputPath, outputPath) {

    return new Promise((resolve, reject) => {

        const script = path.join(
            __dirname,
            "..",
            "scripts",
            "pdfToExcel.py"
        );

        const command = `"${PYTHON}" "${script}" "${inputPath}" "${outputPath}"`;

        console.log(command);

        exec(command, (error, stdout, stderr) => {

            console.log(stdout);
            console.log(stderr);

            if (error) {

                return reject(error);

            }

            resolve();

        });

    });

}

module.exports = {

    pdfToExcel

};