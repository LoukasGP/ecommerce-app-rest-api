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

router.get('/', (req, res) => {
    pool.query('SELECT id FROM users' ,(err, result) =>{
      if(err){
        throw err;
      }
      res.status(201).json(result.rows)
    })
  })

  // checking the connection
 


module.exports = router