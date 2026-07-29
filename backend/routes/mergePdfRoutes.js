const express = require("express");
const multer = require("multer");

const {

    mergePdf

} = require("../controllers/mergePdfController");

const router = express.Router();

const upload = multer({

    dest: "uploads/"

});

router.post(

    "/mergepdf",

    upload.array("pdfs"),

    mergePdf

);

module.exports = router;