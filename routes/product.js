const express = require("express");
const passport = require("passport");
const Router = require("express-promise-router");
const {
  validateGetProducts,
  validatePostProduct,
  validatePutProduct,
  validateDeleteProduct,
} = require("./validation/validation");
const { products } = require("../controllers");
const productRouter = new Router();

productRouter
  .get("/", products.getAllProducts)
  .get("/:id", validateGetProducts, products.getProductById)
  .post(
    "/",
    validatePostProduct,
    passport.authenticate("jwt-admin", { session: false }),
    products.postProduct
  )
  .put(
    "/:id",
    validatePutProduct,
    passport.authenticate("jwt-admin", { session: false }),
    products.putProduct
  )
  .delete(
    "/:id",
    validateDeleteProduct,
    passport.authenticate("jwt-admin", { session: false }),
    products.deleteProduct
  );

// //TODO ADD CREATED AND MODIFIED FIELDS
// productRouter.post("/", (req, res) => {
//   const { id, name, description, quantity } = req.body;
//   pool.query(
//     "INSERT INTO product(id, npm run devname, description, quantity) VALUES($1, $2, $3, $4)",
//     [id, name, description, quantity]
//   );
//   //TODO what if data is input incorrectly?
// });

// //READ
// productRouter.get("/:id", async (req, res) => {
//   await pool.query(
//     "SELECT * FROM product WHERE id = $1",
//     [req.params.id],
//     (err, data) => {
//       if (err) res.status(400).send(err);
//       if (data.rowCount > 0) res.status(200).send(data);
//       return res.status(422).json({
//         error: {
//           attemptedProductID: `Requested Product: ${req.params.id}`,
//           status: 417,
//           data: "No product with this id",
//         },
//       });
//     }
//   );
// });

// //TODO - FIX ERROR HEADER SET ALREADY
// productRouter.get("/", async (req, res) => {
//   await pool.query("SELECT * FROM product WHERE quantity > 0;", (err, data) => {
//     if (err) res.status(400).send(err);
//     if (data.rowCount > 0) res.status(200).send(data);
//     return res.status(422).json({
//       error: {
//         status: 417,
//         data: "No Products to show",
//       },
//     });
//   });
// });

// //UPDATE
// productRouter.put("/:id", async (req, res) => {
//   const newProduct = req.body;
//   const productId = Number(req.params.id);
//   const products = await pool.query("SELECT * FROM product;");
//   console.log(products);
//   if (!newProduct.id || newProduct.id !== productId) {
//     newProduct.id = productId;
//   }
//   products[productId] = newProduct;
//   res.send(newProduct);
// });

// //DELETE
// productRouter.delete("/:id", async(req, res) => {
//   const productId = Number(req.params.id);
//   const products = await pool.query("SELECT * FROM product;");
//   if (productId !== -1) {
//     products.splice(productId, 1);
//     res.status(204).send();
//   } else {
//     res.status(404).send();
//   }
// });

module.exports = productRouter;
