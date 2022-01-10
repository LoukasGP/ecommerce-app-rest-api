// loads all the products
// checks if the product exists
// loads individual product
// checks quantity to see if they can add it to the cart

const validateProduct = (req, res, next) => {};

//check the product they're adding is unique for the post request
const productIsUnique = (req, res, next) => {
  const { id } = req.body;
  pool.query("SELECT * FROM product WHERE id = $1 ", [id], (err, data) =>
    console.log(err)
  );
};

module.exports = { validateProduct, productIsUnique };
