const express = require("express");

const multer = require("multer");

const {

    remove

} = require("../controllers/removePagesController");

const router = express.Router();

const upload = multer({

    dest: "uploads/"

});

router.post(

    "/removepages",

    upload.single("pdf"),

    remove

);

module.exports = router;