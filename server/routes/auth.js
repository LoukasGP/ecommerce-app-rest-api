const express = require("express");
const Router = require("express-promise-router");
const authRouter = new Router();

const { validateSignUp, validateLogin } = require("./validation/validation");

const { auth } = require("../controllers");

const bcrypt = require("bcrypt");
const getPwdHash = async (pwd) => {
  const hash = await bcrypt.hash(pwd, 10);
  return hash;
};

authRouter
  .post("/auth/signup", validateSignUp, auth.signupUser) //Adds a user and creates a cart for the user
  .post("/auth/login", validateLogin, auth.loginUser) //Logs user in and sends a JWT back in cookie
  .post("/auth/logout", auth.logoutUser); //Deletes httpOnly cookie to logout

module.exports = {
  getPwdHash,
  authRouter
};
