const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/auth");
const catalogControllers = require("../controllers/catalog-controller.js");

router.get("/", catalogControllers.catalog);
router.post("/add", verifyToken, catalogControllers.addToCatalog);
router.post("/edit", verifyToken, catalogControllers.editItem);
router.post("/delete", verifyToken, catalogControllers.deleteItem);


module.exports = router;
