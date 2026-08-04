const path = require("path");
const fs = require("fs");
const { v4: uuid } = require("uuid");

const {

    unlockPdf

} = require("../services/unlockPdfService");

async function unlock(req, res) {

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

        await unlockPdf(

            file.path,

            outputPath,

            password

        );

        if (!fs.existsSync(outputPath)) {

            throw new Error("O PDF desbloqueado não foi gerado.");

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

    unlock

};