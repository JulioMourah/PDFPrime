const path = require("path");
const fs = require("fs");
const { v4: uuid } = require("uuid");

const {

    signPdf

} = require("../services/signPdfService");

async function sign(req, res) {

    try {

        const pdf = req.files.pdf?.[0];

        const signature = req.files.signature?.[0];

        const page = Number(req.body.page || 1);

        if (!pdf) {

            return res.status(400).json({

                error: "PDF não enviado."

            });

        }

        if (!signature) {

            return res.status(400).json({

                error: "Assinatura não enviada."

            });

        }

        const outputPath = path.join(

            __dirname,

            "..",

            "output",

            `${uuid()}.pdf`

        );

        await signPdf(

            pdf.path,

            signature.path,

            outputPath,

            page

        );

        res.download(outputPath, () => {

            [

                pdf.path,

                signature.path,

                outputPath

            ].forEach(file => {

                if (fs.existsSync(file)) {

                    fs.unlinkSync(file);

                }

            });

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

    sign

};