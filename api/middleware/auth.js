const { getToken } = require("../db");

exports.verifyToken = (req, res, next) => {
  console.log("Verifying token");
  const bearerHeader = req.headers["authorization"];
  if (bearerHeader) {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    const isAuth = getToken(bearerToken);
    console.log(isAuth);
    if (isAuth) {
      req.token = bearerToken;
      next();
    } else res.sendStatus(403);
  } else {
    // Forbidden
    res.sendStatus(403);
  }
};
