const express = require("express");

const multer = require("multer");

const {

    protect

} = require("../controllers/protectPdfController");

const router = express.Router();

const upload = multer({

    dest: "uploads/"

});

router.post(

    "/protectpdf",

    upload.single("pdf"),

    protect

);

module.exports = router;