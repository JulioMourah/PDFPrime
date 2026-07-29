const express = require("express");
const multer = require("multer");

const {
    pdfToPng
} = require("../controllers/pdfToPngController");

const router = express.Router();

const upload = multer({

    dest: "uploads/"

});

router.post(

    "/pdftopng",

    upload.single("pdf"),

    pdfToPng

);

module.exports = router;