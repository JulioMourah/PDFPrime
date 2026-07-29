const path = require("path");
const fs = require("fs");

const {

    convertExcelToPdf

} = require("../services/excelToPdfService");

async function excelToPdf(req, res) {

    try {

        const file = req.file;

        if (!file) {

            return res.status(400).json({

                error: "Nenhum arquivo enviado."

            });

        }

        const outputDir = path.join(

            __dirname,

            "..",

            "output"

        );

        const pdfPath = await convertExcelToPdf(

            file.path,

            outputDir

        );

        res.download(pdfPath, () => {

            if (fs.existsSync(file.path)) {

                fs.unlinkSync(file.path);

            }

            if (fs.existsSync(pdfPath)) {

                fs.unlinkSync(pdfPath);

            }

        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            error: error.message

        });

    }

}

module.exports = {

    excelToPdf

};