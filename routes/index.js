const userAccountRouter = require('./user');
const productRouter = require('./product');
const cartRouter = require('./cart');
const orderRouter = require('./order');

const express = require('express');
const router = express();

router.use('/user', userAccountRouter);
router.use('/product', productRouter);
router.use('/cart', cartRouter);
router.use('/order', orderRouter);

router.get('/', (req, res) => {
    res.send('Hello World!')
  })

module.exports = router