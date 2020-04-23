// Import express
const express = require("express");
const { verifyToken } = require("../middleware/auth");


// Import home controller
const homeControllers = require("../controllers/home-controller.js");
const adminRoutes = require("./admin");
const ordersRoutes = require("./orders");
const catalogRoutes = require("./catalog");


// Create express router
const router = express.Router();
router.use("/admin", adminRoutes);
router.use("/orders", ordersRoutes);
router.use("/catalog", catalogRoutes);


// Export router
module.exports = router;
