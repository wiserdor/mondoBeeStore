const { getCatalog, addToCatalog } = require("../db");

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