// loads all the products
// checks if the product exists
// loads individual product
// checks quantity to see if they can add it to the cart
const addItem = (id, name, description, quantity) => {
  return {
    text: "INSERT INTO product(id, name, description, quantity) VALUES($1, $2, $3, $4)",
    values: [id, name, description, quantity],
  };
};

const validateEntry = (req, res, next) => {};

//check the product they're adding is unique for the post request
const productIsUnique = (req, res, next) => {
  const { id } = req.body;
  pool.query("SELECT * FROM product WHERE id = $1 ", [id], (err, data) =>
    console.log(err)
  );
};

const findByIDTwo = async (id, table, database) => {
  try {

  }
  catch(err) {
    console.log(err)
  }
}


const findByID = async (id, table, database) => {
  try {
    const statement = `SELECT * FROM ${table} WHERE id = $1`;
    const values = [id];
    const result = await database.query(statement, values);
    if (result.rows?.length) return result.rows[0]
    return null;
  } catch (err) {
    console.log(err.stack);
  }
};

module.exports = {addItem, findByID};
