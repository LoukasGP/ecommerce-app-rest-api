require("dotenv").config();
const express = require("express");
const app = express();
const router = require("./routes/routes");
require("./config");
// require("./db/database");

app.use("/", router); // middleware

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// 404 // Error

// Client -> http request -> Middleware -> Server  http response
