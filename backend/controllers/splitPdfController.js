const path = require("path");
const fs = require("fs");
const { v4: uuid } = require("uuid");

const {
    splitPdf
} = require("../services/splitPdfService");

async function split(req, res) {

    try {

        const file = req.file;

        const page = Number(req.body.page);

        if (!file) {

            return res.status(400).json({

                error: "Nenhum PDF enviado."

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

        const outputPath = path.join(

            outputDir,

            `${uuid()}.pdf`

        );

        await splitPdf(

            file.path,

            page,

            outputPath

        );

        if (!fs.existsSync(outputPath)) {

            throw new Error("O PDF não foi gerado.");

        }

        res.download(outputPath, () => {

            if (fs.existsSync(file.path)) {

                fs.unlinkSync(file.path);

            }

            if (fs.existsSync(outputPath)) {

                fs.unlinkSync(outputPath);

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

    split

};