const { exec } = require("child_process");
const path = require("path");

function pdfToPowerPoint(inputPath, outputPath) {

    return new Promise((resolve, reject) => {

        const python = "C:\\Users\\Pedro Santos\\AppData\\Local\\Programs\\Python\\Python313\\python.exe";

        const script = path.join(
            __dirname,
            "..",
            "scripts",
            "pdfToPowerPoint.py"
        );

        const command = `"${python}" "${script}" "${inputPath}" "${outputPath}"`;

        console.log("================================");
        console.log(command);
        console.log("================================");

        exec(command, (error, stdout, stderr) => {

            console.log("STDOUT:");
            console.log(stdout);

            console.log("STDERR:");
            console.log(stderr);

            if (error) {

                console.log(error);

                reject(error);

                return;

            }

            resolve();

        });

    });

}

module.exports = {

    pdfToPowerPoint

};