const express = require("express");
const multer = require("multer");

const {

    imageToPdf

} = require("../controllers/imageToPdfController");

const router = express.Router();

const upload = multer({

    dest: "uploads/"

});

router.post(

    "/imagetopdf",

    upload.single("image"),

    imageToPdf

);

module.exports = router;