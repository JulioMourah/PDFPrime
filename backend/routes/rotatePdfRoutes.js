const express = require("express");
const multer = require("multer");

const {

    rotate

} = require("../controllers/rotatePdfController");

const router = express.Router();

const upload = multer({

    dest: "uploads/"

});

router.post(

    "/rotatepdf",

    upload.single("pdf"),

    rotate

);

module.exports = router;