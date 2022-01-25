const express = require("express");
const Router = require("express-promise-router");

const router = new Router()

const userRouter = require("./user");
const productRouter = require("./product");
const cartRouter = require("./cart");
const authRouter = require('./auth')


router.use("/users", userRouter);
router.use("/product", productRouter);
router.use("/cart", cartRouter);
router.use("/auth", authRouter);

// checking the connection

module.exports = router;
