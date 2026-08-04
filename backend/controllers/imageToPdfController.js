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

        const outputDir = path.join(__dirname, "..", "output");

        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        const outputPath = path.join(
            outputDir,
            `${uuid()}.pdf`
        );

        await convertImageToPdf(
            file.path,
            file.mimetype,
            outputPath
        );

        res.download(outputPath, () => {

            if (fs.existsSync(file.path))
                fs.unlinkSync(file.path);

            if (fs.existsSync(outputPath))
                fs.unlinkSync(outputPath);

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: error.message
        });

    }

}

module.exports = {
    imageToPdf
};