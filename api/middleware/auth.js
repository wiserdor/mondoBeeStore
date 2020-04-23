const { getToken } = require("../db");

exports.verifyToken = async (req, res, next) => {
  console.log("Verifying token");
  const bearerHeader = req.headers["authorization"];
  if (bearerHeader) {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    const isAuth = await getToken(bearerToken);
    console.log(isAuth);
    if (isAuth.rowCount) {
      req.token = bearerToken;
      next();
    } else res.sendStatus(403);
  } else {
    // Forbidden
    res.sendStatus(403);
  }
};
