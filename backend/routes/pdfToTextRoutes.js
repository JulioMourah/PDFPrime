const express = require("express");

const multer = require("multer");

const { convert } = require("../controllers/pdfToTextController");

const router = express.Router();

const upload = multer({

    dest: "uploads/"

});

router.post(

    "/pdftotext",

    upload.single("pdf"),

    convert

);

module.exports = router;