const path = require("path");
const fs = require("fs");
const { v4: uuid } = require("uuid");

const {

    protectPdf

} = require("../services/protectPdfService");

async function protect(req, res) {

    try {

        const file = req.file;

        const password = req.body.password;

        if (!file) {

            return res.status(400).json({

                error: "Nenhum PDF enviado."

            });

        }

        if (!password) {

            return res.status(400).json({

                error: "Senha obrigatória."

            });

        }

        const outputPath = path.join(

            __dirname,

            "..",

            "output",

            `${uuid()}.pdf`

        );

        await protectPdf(

            file.path,

            outputPath,

            password

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

    protect

};