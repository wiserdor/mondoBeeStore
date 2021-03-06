const multer = require("multer");
const crypto = require("crypto");
const { addAuthToken } = require("../db");

exports.upload = async (req, res) => {
  res.status(200).send("ok");
};

exports.auth = async (req, res) => {
  /**
   * This is a temporary auth
   */
  console.log("/admin/auth");
  const payload = req.body;
  if (payload.password === process.env.ADMIN_PASSWORD) {
    const token = crypto.randomBytes(22).toString("hex");
    addAuthToken(token);
    res.status(200).send({ token: token });
  } else {
    res.status(422).send("Unprocessable Entity");
  }
};
