const express = require("express");

const multer = require("multer");

const {

    extract

} = require("../controllers/extractPagesController");

const router = express.Router();

const upload = multer({

    dest: "uploads/"

});

router.post(

    "/extractpages",

    upload.single("pdf"),

    extract

);

module.exports = router;