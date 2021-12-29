const express = require("express");
const cartsRouter = express.Router();

cartsRouter.get('/', (req,res) => {
    res.send('carts')
});

module.exports = cartsRouter;