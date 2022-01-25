const express = require("express");
const userAccountRegisterRouter = express.Router();
const validateEmail = require("./auth");
const { pool } = require("../db");
const bcrypt = require("bcrypt");

// logic for handling a new user registration
userAccountRegisterRouter.post("/", (req, res) => {
  const { email, first_name, last_name, password } = req.body;

  pool.query(
    "SELECT * FROM users WHERE email = $1 ",
    [email],
    function (err, data) {
      console.log(data);
      if (err) {
        console.log(err);
      } else {
        if (data.rowCount > 0) {
          return res.status(422).json({
            error: {
              status: 422,
              data: "User with this email already exists.",
            },
          });
        } else if (validateEmail(email) === false) {
          return res.status(422).json({
            error: { status: 422, data: "Email address is not valid" },
          });
        } else {
          bcrypt.hash(password, 10, function (err, hash) {
            pool.query(
              "INSERT INTO users (email,first_name,last_name,password ) VALUES ($1, $2 , $3 , $4)",
              [email, first_name, last_name, hash],
              (err) => {
                if (err) {
                  throw err;
                }
                res
                  .status(201)
                  .json({ status: "success", message: "Account added." });
              }
            );
          });
        }
      }
    }
  );
});

userAccountRegisterRouter.get("/", (req, res) => {});

module.exports = userAccountRegisterRouter;
