const express = require("express");
const orderRouter = express.Router();

orderRouter.get("/", (req, res) => {
  res.send("orders");
});

module.exports = orderRouter;

//They can look at all orders
// They can look at a single order
