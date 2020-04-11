const { Pool } = require("pg");
const pool = new Pool({
  connectionString:
  process.env.DATABASE_URL+"?sslmode=require",
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
      [order.cart,order.details, new Date()]
    );
    console.log(res);
  } catch (err) {
    console.log(err);
  }
};

exports.addToCatalog = async (item) => {
  try {
    const res = await pool.query(
      "INSERT INTO catalog(name, price, step, unit, img_path, description,unit_count) VALUES($1, $2, $3, $4, $5,$6,$7) RETURNING id",
      [
        item.name,
        item.price,
        item.step,
        item.unit,
        item.img_path,
        item.description,
        item.unit_count,
      ]
    );
  } catch (err) {}
};
