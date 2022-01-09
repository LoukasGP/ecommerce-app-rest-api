const userAccountRegisterRouter = require('./user');
const productRouter = require('./product');
const cartRouter = require('./cart');
const orderRouter = require('./order');
const loginRouter = require('./login')
const passport = require('passport')

const express = require('express');
const { append } = require('express/lib/response');
const router = express();

router.use('/userRegister', userAccountRegisterRouter);
router.use('/product', productRouter);
router.use('/cart', cartRouter);
router.use('/order', orderRouter);
router.use('/login', loginRouter);

//initializing passport
router.use(passport.initialize());
router.use(passport.session());




module.exports = router