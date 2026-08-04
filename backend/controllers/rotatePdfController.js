const path = require("path");
const fs = require("fs");
const { v4: uuid } = require("uuid");

const {
    rotatePdf
} = require("../services/rotatePdfService");

async function rotate(req, res) {

    try {

        const file = req.file;

        const angle = Number(req.body.angle);

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

        await rotatePdf(

            file.path,

            outputPath,

            angle

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

    rotate

};