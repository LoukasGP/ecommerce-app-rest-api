const express = require("express");
const Router = require("express-promise-router");
const orderRouter = new Router()

const { orders } = require("../controllers");
const { validateOrder } = require("./validation/validation");

orderRouter
  .get(
    "/",
    passport.authenticate("jwt-admin", { session: false }),
    orders.getAllOrders
  ) //Gets all orders for all users
  .get(
    "/review/:orderId",
    validateOrder,
    passport.authenticate("jwt-admin", { session: false }),
    orders.getOrderById
  ) //Gets one order
  .get(
    "/self",
    passport.authenticate("jwt-customer", { session: false }),
    orders.getOrdersSelf
  ); //Gets all orders for current user

module.exports = orderRouter;
