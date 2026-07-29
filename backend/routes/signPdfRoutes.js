const express = require("express");
const multer = require("multer");

const {

    sign

} = require("../controllers/signPdfController");

const router = express.Router();

const upload = multer({

    dest: "uploads/"

});

router.post(

    "/signpdf",

    upload.fields([

        {

            name: "pdf",

            maxCount: 1

        },

        {

            name: "signature",

            maxCount: 1

        }

    ]),

    sign

);

module.exports = router;