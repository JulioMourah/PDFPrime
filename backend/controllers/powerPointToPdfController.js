const path = require("path");
const fs = require("fs");

const {

    convertPowerPointToPdf

} = require("../services/powerPointToPdfService");

async function powerPointToPdf(req, res) {

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

        if (!fs.existsSync(outputDir)) {

            fs.mkdirSync(outputDir, { recursive: true });

        }

        const pdfPath = await convertPowerPointToPdf(

            file.path,

            outputDir

        );

        if (!fs.existsSync(pdfPath)) {

            throw new Error("O PDF não foi gerado.");

        }

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

    powerPointToPdf

};