const express = require("express");

const multer = require("multer");

const { convert } = require("../controllers/pdfToWordController");

const router = express.Router();

const upload = multer({

    dest: "uploads/"

});

router.post(

    "/pdftoword",

    upload.single("pdf"),

    convert

);

module.exports = router;