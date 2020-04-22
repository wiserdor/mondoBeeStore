const { Pool } = require("pg");
const pool = new Pool({
  connectionString: process.env.DB_URL,
  ssl: { rejectUnauthorized: false },
});

exports.getCatalog = async () => {
  try {
    const res = await pool.query("SELECT * FROM public.catalog");
    return res;
  } catch (err) {
    console.log(err.stack);
  }
};

exports.addOrder = async (order) => {
  try {
    const res = await pool.query(
      "INSERT INTO public.orders(cart,details, order_date) VALUES($1,$2,$3) RETURNING id",
      [order.cart, order.details, new Date()]
    );
    console.log(res);
  } catch (err) {
    console.log(err);
  }
};

exports.getOrders = async () => {
  try {
    const res = await pool.query("SELECT * FROM orders");
    return res;
  } catch (err) {
    throw err.stack;
  }
};

exports.addAuthToken = async (token) => {
  try {
    const res = await pool.query(
      "INSERT INTO auth_token(token, date) VALUES($1,$2) RETURNING id",
      [token, new Date()]
    );
    console.log(res);
  } catch (err) {
    throw err.stack;
  }
};

exports.getToken = async (token) => {
  try {
    const res = await pool.query(
      "SELECT token FROM auth_token where token=" + token
    );
    return res;
  } catch (err) {
    throw err.stack;
  }
};

exports.addToCatalog = async (items) => {
  try {
    items.forEach((item) => {
      pool.query(
        "INSERT INTO catalog(name, price, count_step, unit_name, img_path, description,unit_count) VALUES($1,$2,$3,$4,$5,$6,$7)",
        [
          item.name,
          item.price,
          item.count_step,
          item.unit_name,
          item.img_path,
          item.description,
          item.unit_count,
        ]
      );
    });
  } catch (err) {
    console.log(err);
    throw err.stack;
  }
};
