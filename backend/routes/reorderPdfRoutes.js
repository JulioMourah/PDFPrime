const express = require("express");
const multer = require("multer");

const {
    reorder
} = require("../controllers/reorderPdfController");

const router = express.Router();

const upload = multer({

    dest: "uploads/"

});

router.post(

    "/reorderpdf",

    upload.single("pdf"),

    reorder

);

module.exports = router;