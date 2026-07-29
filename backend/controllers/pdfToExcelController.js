const fs = require("fs");
const path = require("path");

const { pdfToExcel } = require("../services/pdfToExcelService");

async function convert(req, res) {

    try {

        if (!req.file) {

            return res.status(400).send("PDF não enviado.");

        }

        const outputDir = path.join(__dirname, "..", "output");

        if (!fs.existsSync(outputDir)) {

            fs.mkdirSync(outputDir);

        }

        const outputFile = path.join(
            outputDir,
            path.parse(req.file.originalname).name + ".xlsx"
        );

        console.log("================================");
        console.log("PDF recebido:", req.file.path);
        console.log("Arquivo de saída:", outputFile);
        console.log("================================");

        await pdfToExcel(
            req.file.path,
            outputFile
        );

        if (!fs.existsSync(outputFile)) {

            throw new Error("O arquivo XLSX não foi gerado.");

        }

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

        console.error("================================");
        console.error("ERRO PDF → EXCEL");
        console.error(err);
        console.error("================================");

        res.status(500).send(err.toString());

    }

}

module.exports = {

    convert

};