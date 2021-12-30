const express = require("express");
const productsRouter = express.Router();


productsRouter.get('/', (req,res) => {
    res.send('products')
});

const createProduct = (req,res,next) => {};
const updateProduct = (req,res,next) => {};
const deleteProduct = (req,res,next) => {};
const getAllProducts = (req,res,next) => {};
const getOneProduct = (req,res,next) => {};

module.exports = productsRouter;