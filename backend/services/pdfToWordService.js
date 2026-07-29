const { exec } = require("child_process");
const path = require("path");

function pdfToWord(inputPath, outputPath) {

    return new Promise((resolve, reject) => {

        const python = "C:\\Users\\Pedro Santos\\AppData\\Local\\Programs\\Python\\Python313\\python.exe";

        const script = path.join(__dirname, "..", "scripts", "pdfToWord.py");

        console.log("================================");
        console.log("Python:", python);
        console.log("Existe script:", script);
        console.log("Input:", inputPath);
        console.log("Output:", outputPath);
        console.log("================================");

        const command = `"${python}" "${script}" "${inputPath}" "${outputPath}"`;

        console.log(command);

        exec(command, (error, stdout, stderr) => {

            console.log("========== STDOUT ==========");
            console.log(stdout);

            console.log("========== STDERR ==========");
            console.log(stderr);

            console.log("========== ERROR ==========");
            console.log(error);

            if (error) {
                reject(error);
                return;
            }

            resolve();

        });

    });

}

module.exports = {
    pdfToWord
};