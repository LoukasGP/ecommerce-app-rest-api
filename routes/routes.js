const userAccountRegisterRouter = require('./user');
const productsRouter = require('./product');
const cartsRouter = require('./cart');
const loginRouter = require('./login')


const express = require('express');
const router = express();



router.use('/userRegister', userAccountRegisterRouter);
router.use('/product', productsRouter);
router.use('/cart', cartsRouter);
router.use('/login', loginRouter);

router.get('/', (req, res) => {
    res.send('At Homepage');
  })

  // checking the connection
 


module.exports = router