const { pool } = require("../config");

const fetchUsersDb = async () => {
  const res = await pool.query(
    `SELECT 
        id, email, first_name, last_name, created, modified
      cart.id AS cart_id FROM users 
      INNER JOIN carts ON users.id = cart.user_id`
  );
  return res.rows;
};

const fetchUserByIdDb = async (id) => {
  const res = await pool.query(
    `SELECT email, first_name, last_name, created, modified
       cart.id AS cart_id FROM users INNER JOIN cart ON user.id = cart.user_id WHERE user.id = $1`,
    [id]
  );
  return res.rows[0];
};

const fetchUserByEmailDb = async (email) => {
  const res = await pool.query(
    `SELECT id, email, first_name, last_name, created, modified
    FROM user INNER JOIN cart ON user.id = cart.user_id WHERE email = $1`,
    [email]
  );
  return res.rows[0];
};

const createUserDb = async ({
  email,
  first_name,
  last_name,
  pwd_hash,
}) => {
  const text = `INSERT INTO user(email, pwd_hash, first_name, last_name, created, modified)
    VALUES($1, $2, $3, $4, $5, $6) RETURNING *`;
  const values = [email, pwd_hash, first_name, last_name, created, modified];
  const res = await pool.query(text, values);
  console.log(res.rows[0]);
  return res.rows[0];
};

const modifyUserDb = async ({
  id,
  email,
  first_name,
  last_name,
  created,
  modified,
}) => {
  const text = `UPDATE user SET email=$2, first_name=$3, last_name=$4
  WHERE id = $1 RETURNING *`;
  const values = [id, email, first_name, last_name, created, modified];
  const res = await pool.query(text, values);
  console.log(res.rows[0]);
  return res.rows[0];
};

const removeUserDb = async (id) => {
  const res = await pool.query(
    "DELETE user WHERE id = $1",
    [id]
  );
  return res.rows;
};

module.exports = {
  fetchUsersDb,
  fetchUserByIdDb,
  fetchUserByEmailDb,
  createUserDb,
  modifyUserDb,
  removeUserDb,
};
