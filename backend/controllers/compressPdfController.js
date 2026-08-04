const path = require("path");
const fs = require("fs");
const { v4: uuid } = require("uuid");

const {
    compressPdf
} = require("../services/compressPdfService");

async function compress(req, res) {

    try {

        const file = req.file;

        if (!file) {

            return res.status(400).json({
                error: "Nenhum PDF enviado."
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

        await compressPdf(
            file.path,
            outputPath
        );

        res.download(outputPath, () => {

            if (fs.existsSync(file.path))
                fs.unlinkSync(file.path);

            if (fs.existsSync(outputPath))
                fs.unlinkSync(outputPath);

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
    compress
};