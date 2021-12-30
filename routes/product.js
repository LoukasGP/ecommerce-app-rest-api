const express = require("express");
const productsRouter = express.Router();


productsRouter.get('/', (req,res) => {
    res.send('products')
});

//They can look at all products
// They can look at a single product

module.exports = productsRouter;