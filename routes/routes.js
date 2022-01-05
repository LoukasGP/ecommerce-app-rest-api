const userAccountRouter = require("./user");
const productsRouter = require("./product");
const cartsRouter = require("./cart");
const { pool } = require("../config");

const express = require("express");
const res = require("express/lib/response");
const router = express();

router.use("/users", userAccountRouter);
router.use("/product", productsRouter);
router.use("/cart", cartsRouter);

// router.get('/', (req, res) => {
//     res.send('Hello World!')
//   })

// checking the connection
router.get("/", (req, res) => {
  pool.query("SELECT * FROM users", (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
});

module.exports = router;
