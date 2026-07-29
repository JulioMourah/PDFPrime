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

        const outputPath = path.join(

            __dirname,

            "..",

            "output",

            `${uuid()}.pdf`

        );

        await rotatePdf(

            file.path,

            outputPath,

            angle

        );

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