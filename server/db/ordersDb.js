const { pool } = require("../config");

const fetchOrders = async () => {
  const res = await pool.query("SELECT * FROM order");
  return res.rows;
};

const fetchOrderById = async (orderId) => {
  const res = await pool.query(
    `SELECT * FROM order
        INNER JOIN order_item ON order.id = order_item.id
        INNER JOIN product ON order_item.id = product.id
        WHERE order.id = $1`,
    [orderId]
  );
  return res.rows;
};

const fetchOrdersByUserId = async (userId) => {
  const text = `SELECT order.id, total, status, FROM order WHERE user_id = $1`;
  const res = await pool.query(text, userId);
  return res.rows;
};

const createEmptyOrder = async ({ user_id, status }) => {
  const text = `INSERT INTO order (user_id, status) VALUES ($1, $2) RETURNING *`;
  const values = [user_id, status];
  const res = pool.query(text, values);
  return res.rows[0].id;
};

const addOneProductToAnOrder = async ({
  order_id,
  product_id,
  quantity,
  price,
}) => {
  const text = `INSERT INTO order_item (order_id, product_id, quantity, price) VALUES ($1, $2, $3, $4)`;
  const values = [order_id, product_id, quantity, price];
  const res = await pool.query(text, values);
  return res.rows;
};

module.exports = {
  fetchOrders,
  fetchOrderById,
  fetchOrdersByUserId,
  createEmptyOrder,
  addOneProductToAnOrder,
};
