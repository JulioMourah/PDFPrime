const express = require("express");

const multer = require("multer");

const {

    unlock

} = require("../controllers/unlockPdfController");

const router = express.Router();

const upload = multer({

    dest: "uploads/"

});

router.post(

    "/unlockpdf",

    upload.single("pdf"),

    unlock

);

module.exports = router;