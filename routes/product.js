const express = require("express");
const productRouter = express.Router();
const { pool } = require("../config");
const addItem = require("../services/productServices");
const { findByID } = require("../services/productServices");
productRouter.use(express.json({ extended: false }));

// Create, read, update and delete

//TODO ADD CREATED AND MODIFIED FIELDS
productRouter.post("/", (req, res) => {
  const { id, name, description, quantity } = req.body;
  pool.query(
    "INSERT INTO product(id, name, description, quantity) VALUES($1, $2, $3, $4)",
    [id, name, description, quantity]
  );
});

//READ

productRouter.get("/:id", (req, res) => {
  pool.query(
    "SELECT * FROM product WHERE id = $1",
    [req.params.id],
    (err, data) => {
      if (err) res.status(400).send(err);
      if (data.rowCount > 0) res.status(200).send(data);
      return res.status(422).json({
        error: {
          attemptedProductID: `Requested Product: ${req.params.id}`,
          status: 417,
          data: "No product with this id",
        },
      });
    }
    );
  });
  
  //TODO - FIX ERROR HEADER SET ALREADY
  productRouter.get("/", (req, res) => {
    pool.query("SELECT * FROM product WHERE quantity > 0;", (err, data) => {
      if (err) res.status(400).send(err);
      if (data.rowCount > 0) res.status(200).send(data);
      return res.status(422).json({
        error: {
          status: 417,
          data: "No Products to show",
        },
      });
    });
  });
  
  
  //UPDATE
  productRouter.put('/:id', (req, res) => {
  const productIndex = getIndexById(req.params.id, expressions);
  if (productIndex !== -1) {
    updateElement(req.params.id, req.query, expressions);
    res.send(expressions[productIndex]);
  } else {
    res.status(404).send();
  }

    
  productRouter.put("/:id", (req, res) => {
    const { id, name, description, quantity } = req.body;

    pool.query(
      "INSERT INTO product(id, name, description, quantity) VALUES($1, $2, $3, $4)",
      [id, name, description, quantity]
    );
  });
  
  //DELETE
productRouter.delete('/expressions/:id', (req, res, next) => {
  const expressionIndex = getIndexById(req.params.id, expressions);
  if (expressionIndex !== -1) {
    expressions.splice(expressionIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).send();
  }
});

  


module.exports = productRouter;