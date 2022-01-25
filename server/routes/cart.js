const express = require("express");
const passport = require("passport");
const Router = require("express-promise-router");

const cartRouter = new Router()

const { carts } = require("../controllers");

const {
  validateCart,
  validateDeleteCartProduct,
} = require("./validation/validation");

cartRouter
  .get(
    "/",
    passport.authenticate("jwt-admin", { session: false }),
    carts.getAllCarts
  ) //Gets all products in all carts
  .post(
    "/self",
    passport.authenticate("jwt-customer", { session: false }),
    carts.syncCartSelf
  ) //Gets products in user's cart and syncs with logged out cart
  .post(
    "/self/product",
    validateCart,
    passport.authenticate("jwt-customer", { session: false }),
    carts.postProductInCartSelf
  ) //Adds a new product to user's cart
  .put(
    "/self/product",
    validateCart,
    passport.authenticate("jwt-customer", { session: false }),
    carts.putCartSelf
  ) //Changes quantity of a product in user's cart
  .delete(
    "/self/product",
    validateDeleteCartProduct,
    passport.authenticate("jwt-customer", { session: false }),
    carts.deleteCartProductSelf
  ) //Deletes a product from user's cart

  .post(
    "/self/checkout",
    passport.authenticate("jwt-customer", { session: false }),
    carts.checkoutCart
  ); //Checks out a user's cart and places an order

module.exports = cartRouter;
