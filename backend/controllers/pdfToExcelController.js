const fs = require("fs");
const path = require("path");

const {
    pdfToExcel
} = require("../services/pdfToExcelService");

async function convert(req, res) {

    try {

        if (!req.file) {
            return res.status(400).send("PDF não enviado.");
        }

        const outputDir = path.join(__dirname, "..", "output");

        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        const outputFile = path.join(
            outputDir,
            path.parse(req.file.originalname).name + ".xlsx"
        );

        await pdfToExcel(
            req.file.path,
            outputFile
        );

        res.download(outputFile, () => {

            if (fs.existsSync(req.file.path))
                fs.unlinkSync(req.file.path);

            if (fs.existsSync(outputFile))
                fs.unlinkSync(outputFile);

        });

    } catch (err) {

        console.error("========== PDF -> EXCEL ==========");
        console.error(err);
        console.error(err.stdout);
        console.error(err.stderr);
        console.error("==================================");

        res.status(500).send(err.stderr || err.toString());

    }

}

module.exports = {
    convert
};