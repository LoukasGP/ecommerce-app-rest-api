const userAccountRouter = require('./user');
const productsRouter = require('./product');
const cartsRouter = require('./cart');
const {pool} = require('../config')


const express = require('express');
const res = require('express/lib/response');
const router = express();



router.use('/users', userAccountRouter);
router.use('/product', productsRouter);
router.use('/cart', cartsRouter);

// router.get('/', (req, res) => {
//     res.send('Hello World!')
//   })

  // checking the connection
 


module.exports = router