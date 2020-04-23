const { getToken } = require("../db");

exports.verifyToken = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  console.log(req.headers);
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
