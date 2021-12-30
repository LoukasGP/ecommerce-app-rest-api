const express = require("express");
const cartRouter = express.Router();

cartRouter.get('/', (req,res) => {
    res.send('carts')
});

// View their cart
// View cart items
// Checkout


module.exports = cartRouter;