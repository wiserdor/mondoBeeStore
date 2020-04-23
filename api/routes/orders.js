const express = require("express");
const ordersControllers = require("../controllers/orders-controller.js");
const { verifyToken } = require("../middleware/auth");

// Create express router
const router = express.Router();

router.get("/", verifyToken, ordersControllers.orders);
router.post("/send", ordersControllers.send);

module.exports = router;
