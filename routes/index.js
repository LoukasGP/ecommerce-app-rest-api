const userAccountRouter = require('./users/users');
const productsRouter = require('./products/products');
const cartsRouter = require('./carts/carts');

const express = require('express');
const router = express();

router.use('/users', userAccountRouter);
router.use('/product', productsRouter);
router.use('/cart', cartsRouter);

router.get('/', (req, res) => {
    res.send('Hello World!')
  })

module.exports = router