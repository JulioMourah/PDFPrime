const express = require("express");
const multer = require("multer");

const {

    powerPointToPdf

} = require("../controllers/powerPointToPdfController");

const router = express.Router();

const upload = multer({

    dest: "uploads/"

});

router.post(

    "/powerpointtopdf",

    upload.single("powerpoint"),

    powerPointToPdf

);

module.exports = router;