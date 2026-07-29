const express = require("express");
const multer = require("multer");

const {

    compress

} = require("../controllers/compressPdfController");

const router = express.Router();

const upload = multer({

    dest: "uploads/"

});

router.post(

    "/compresspdf",

    upload.single("pdf"),

    compress

);

module.exports = router;