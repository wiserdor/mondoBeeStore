// Import express
const express = require("express");
const { getToken } = require("../db");

// Import home controller
const homeControllers = require("../controllers/home-controller.js");
const adminRoutes = require("./admin");
function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
    console.log(req.headers)
  if (bearerHeader) {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    const isAuth = getToken(bearerToken);
    console.log(isAuth)
    if (isAuth) {
      req.token = bearerToken;
      next();
    } else res.sendStatus(403);
  } else {
    // Forbidden
    res.sendStatus(403);
  }
}
// Create express router
const router = express.Router();
router.use("/admin", adminRoutes);

// Create rout between homeControllers and '/' endpoint
router.post("/send", homeControllers.send);
router.get("/catalog", homeControllers.catalog);
router.get("/orders", verifyToken, homeControllers.orders);
router.post("/catalog/add", verifyToken, homeControllers.addToCatalog);
// Export router
module.exports = router;
