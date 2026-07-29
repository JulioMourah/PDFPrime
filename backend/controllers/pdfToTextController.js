const fs = require("fs");
const path = require("path");

const { pdfToText } = require("../services/pdfToTextService");

async function convert(req, res) {

    try {

        if (!req.file) {

            return res.status(400).send("PDF não enviado.");

        }

        const outputDir = path.join(
            __dirname,
            "..",
            "output"
        );

        if (!fs.existsSync(outputDir)) {

            fs.mkdirSync(outputDir);

        }

        const outputFile = path.join(

            outputDir,

            path.parse(req.file.originalname).name + ".txt"

        );

        console.log("================================");
        console.log("PDF recebido:", req.file.path);
        console.log("Arquivo de saída:", outputFile);
        console.log("================================");

        await pdfToText(

            req.file.path,

            outputFile

        );

        res.download(outputFile, () => {

            if (fs.existsSync(req.file.path)) {

                fs.unlinkSync(req.file.path);

            }

            if (fs.existsSync(outputFile)) {

                fs.unlinkSync(outputFile);

            }

        });

    }

    catch (err) {

        console.error(err);

        res.status(500).send(err.toString());

    }

}

module.exports = {

    convert

};