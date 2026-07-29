const express = require("express");
const multer = require("multer");

const {
    pdfToJpg
} = require("../controllers/pdfToJpgController");

const router = express.Router();

const upload = multer({

    dest: "uploads/"

});

router.post(

    "/pdftojpg",

    upload.single("pdf"),

    pdfToJpg

);

module.exports = router;