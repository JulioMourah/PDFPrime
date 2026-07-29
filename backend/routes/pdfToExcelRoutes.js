const express = require("express");

const multer = require("multer");

const { convert } = require("../controllers/pdfToExcelController");

const router = express.Router();

const upload = multer({

    dest: "uploads/"

});

router.post(

    "/pdftoexcel",

    upload.single("pdf"),

    convert

);

module.exports = router;