const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/auth");
const catalogControllers = require("../controllers/catalog-controller.js");

router.get("/", catalogControllers.catalog);
router.post("/add", verifyToken, catalogControllers.addToCatalog);

module.exports = router;
