const path = require("path");
const fs = require("fs");
const { v4: uuid } = require("uuid");

const {

    extractPages

} = require("../services/extractPagesService");

async function extract(req, res) {

    try {

        const file = req.file;

        const pages = req.body.pages
            .split(",")
            .map(page => page.trim());

        if (!file) {

            return res.status(400).json({

                error: "PDF não enviado."

            });

        }

        const outputPath = path.join(

            __dirname,

            "..",

            "output",

            `${uuid()}.pdf`

        );

        await extractPages(

            file.path,

            outputPath,

            pages

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

    extract

};