const express = require("express");
const multer = require("multer");

const {

    excelToPdf

} = require("../controllers/excelToPdfController");

const router = express.Router();

const upload = multer({

    dest: "uploads/"

});

router.post(

    "/exceltopdf",

    upload.single("excel"),

    excelToPdf

);

module.exports = router;