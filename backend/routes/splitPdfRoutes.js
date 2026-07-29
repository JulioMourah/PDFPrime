const express = require("express");
const multer = require("multer");

const {

    split

} = require("../controllers/splitPdfController");

const router = express.Router();

const upload = multer({

    dest: "uploads/"

});

router.post(

    "/splitpdf",

    upload.single("pdf"),

    split

);

module.exports = router;