const userAccountRegisterRouter = require('./user');
const productsRouter = require('./product');
const cartsRouter = require('./cart');
const loginRouter = require('./login')
const {pool} = require('../config')


const express = require('express');
const res = require('express/lib/response');
const router = express();



router.use('/userRegister', userAccountRegisterRouter);
router.use('/product', productsRouter);
router.use('/cart', cartsRouter);
router.use('/login', loginRouter);

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