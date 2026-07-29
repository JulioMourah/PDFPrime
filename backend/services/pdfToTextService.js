const { exec } = require("child_process");
const path = require("path");

function pdfToText(inputPath, outputPath) {

    return new Promise((resolve, reject) => {

        const python = "C:\\Users\\Pedro Santos\\AppData\\Local\\Programs\\Python\\Python313\\python.exe";

        const script = path.join(
            __dirname,
            "..",
            "scripts",
            "pdfToText.py"
        );

        const command = `"${python}" "${script}" "${inputPath}" "${outputPath}"`;

        console.log("================================");
        console.log(command);
        console.log("================================");

        exec(command, (error, stdout, stderr) => {

            console.log(stdout);
            console.log(stderr);

            if (error) {

                reject(error);

                return;

            }

            resolve();

        });

    });

}

module.exports = {

    pdfToText

};