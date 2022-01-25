const express = require("express");
const passport = require("passport");
const Router = require("express-promise-router");
const userRouter = new Router();

const { users } = require("../controllers");

const {
  validatePutUser,
  validateDeleteUser,
} = require("./validation/validation");

userRouter
  .get(
    "/",
    passport.authenticate("jwt-admin", { session: false }),
    users.getAllUsers
  )
  .get(
    "/self",
    passport.authenticate("jwt-customer", { session: false }),
    users.getUserSelf
  ) //Customer can access their user info
  .put(
    "/self",
    validatePutUser,
    passport.authenticate("jwt-customer", { session: false }),
    users.putUserSelf
  ) //Customer can edit their user info
  .delete(
    "/:id",
    validateDeleteUser,
    passport.authenticate("jwt-admin", { session: false }),
    users.deleteUser
  ); //Delete user and associated cart

module.exports = userRouter;
