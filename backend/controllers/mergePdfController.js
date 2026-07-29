const path = require("path");
const fs = require("fs");
const { v4: uuid } = require("uuid");

const {
    mergePdfs
} = require("../services/mergePdfService");

async function mergePdf(req, res) {

    try {

        const files = req.files;

        if (!files || files.length < 2) {

            return res.status(400).json({

                error: "Selecione pelo menos dois PDFs."

            });

        }

        const outputName = `${uuid()}.pdf`;

        const outputPath = path.join(

            __dirname,
            "..",
            "output",
            outputName

        );

        await mergePdfs(

            files,

            outputPath

        );

        res.download(outputPath, () => {

            files.forEach(file => {

                if (fs.existsSync(file.path)) {

                    fs.unlinkSync(file.path);

                }

            });

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

    mergePdf

};