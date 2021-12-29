const express = require("express");
const userAccountRouter = express.Router();


userAccountRouter.get('/', (req,res) => {
    res.send('users')
});

const createUser = (req,res,next) => {};
const updateUser = (req,res,next) => {};
const deleteUser = (req,res,next) => {};
const getAllUsers = (req,res,next) => {};
const getOneUser = (req,res,next) => {};


module.exports = userAccountRouter;