// Import express
const express = require("express");
const { verifyToken } = require("../middleware/auth");
const { fileUpload } = require("../middleware/uploadImage");

const adminControllers = require("../controllers/admin-controller.js");
// Create express router
const router = express.Router();

router.post("/upload", [verifyToken, fileUpload], adminControllers.upload);
router.post("/auth", adminControllers.auth);

module.exports = router;
