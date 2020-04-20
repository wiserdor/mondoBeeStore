// Import express
const express = require("express");
var multer = require("multer");

const adminControllers = require("../controllers/admin-controller.js");
// Create express router
const router = express.Router();

const storageA = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./build/images");
  },
  filename: function (req, file, cb) {
    console.log(file);
    cb(null, file.originalname); // here we specify the file saving name . in this case i specified the original file name
  },
});

const storageB = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    console.log(file);
    cb(null, file.originalname); // here we specify the file saving name . in this case i specified the original file name
  },
});

const destA = multer({ storage: storageA });
const destB = multer({ storage: storageB });

function fileUpload(req, res, next) {
  destA.single("file")(req, res, next);
  destB.single("file")(req, res, next);
  next();
}

router.post("/upload", fileUpload, adminControllers.upload);

module.exports = router;
