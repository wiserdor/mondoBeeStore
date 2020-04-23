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
    console.log(new Date());
    throw err.stack;
  }
};

exports.getToken = async (token) => {
  try {
    console.log(token);
    const res = await pool.query(
      "SELECT token FROM auth_token where token='" + token + "'"
    );
    return res;
  } catch (err) {
    throw err.stack;
  }
};

exports.addToCatalog = async (item) => {
  try {
    pool.query(
      "INSERT INTO catalog(name, price, count_step, unit_name, img_path, description,unit_count,discount_total,discount_per_unit) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9)",
      [
        item.name,
        item.price,
        item.count_step,
        item.unit_name,
        item.img_path,
        item.description,
        item.unit_count,
        item.discount_total,
        item.discount_per_unit
      ]
    );
  } catch (err) {
    console.log(err);
    throw err.stack;
  }
};

exports.editItemFromCatalog = async (item) => {
  try {
    pool.query(
      `UPDATE catalog 
        SET name='${item.name}', price=${item.price}, count_step=${
        item.count_step
      }, 
        img_path='${item.img_path || ""}',
        description='${item.description || ""}',
        unit_name='${item.unit_name || ""}'
        ${item.unit_count ? ",unit_count=" + item.unit_count : ""}
        ${item.discount_total ? ",discount_total=" + item.discount_total : ""}
        ${
          item.discount_per_unit
            ? ",discount_per_unit=" + item.discount_per_unit
            : ""
        } where id=${item.id}`
    );
  } catch (err) {
    console.log(err);
    throw err.stack;
  }
};

exports.deleteItemFromCatalog = async (item) => {
  try {
      console.log(item)
    pool.query("DELETE FROM catalog WHERE id = $1", [item.id]);
  } catch (err) {
    console.log(err);
    throw err.stack;
  }
};
