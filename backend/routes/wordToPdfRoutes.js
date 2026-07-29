const express = require("express");
const multer = require("multer");

const {

    wordToPdf

} = require("../controllers/wordToPdfController");

const router = express.Router();

const upload = multer({

    dest: "uploads/"

});

router.post(

    "/wordtopdf",

    upload.single("word"),

    wordToPdf

);

module.exports = router;