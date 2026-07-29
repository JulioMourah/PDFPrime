const path = require("path");
const fs = require("fs");
const { v4: uuid } = require("uuid");

const {
    convertImageToPdf
} = require("../services/imageToPdfService");

async function imageToPdf(req, res) {

    try {

        const file = req.file;

        if (!file) {

            return res.status(400).json({

                error: "Nenhuma imagem enviada."

            });

        }

        const outputName = `${uuid()}.pdf`;

        const outputPath = path.join(

            __dirname,
            "..",
            "output",
            outputName

        );

        await convertImageToPdf(

            file.path,
            file.mimetype,
            outputPath

        );

        res.download(outputPath, () => {

            if (fs.existsSync(file.path)) {
                fs.unlinkSync(file.path);
            }

            if (fs.existsSync(outputPath)) {
                fs.unlinkSync(outputPath);
            }

        });

    } catch (error) {

        console.error("===== ERRO NO BACKEND =====");
        console.error(error);
        console.error("===========================");

        res.status(500).json({

            error: error.message

        });

    }

}

module.exports = {

    imageToPdf

};