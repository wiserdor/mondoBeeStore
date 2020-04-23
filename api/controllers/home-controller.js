const { getCatalog, addToCatalog, addOrder, getToken, getOrders } = require("../db");

const mailjet = require("node-mailjet").connect(
  process.env.MAILJET_API,
  process.env.MAILJET_SECRET
);

exports.catalog = async (req, res) => {
  try {
    const cat = await getCatalog();
    res.status(200).send(cat.rows);
  } catch (err) {
    res.status(500).send("error");
  }
};

exports.addToCatalog = async (req, res) => {
  try {
    const cat = await addToCatalog(req.body);
    res.status(200).send("ok");
  } catch (err) {
    res.status(500).send();
  }
};


