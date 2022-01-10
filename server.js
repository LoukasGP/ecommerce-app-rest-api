require("dotenv").config();
// console.log(process.env.PGHOST);
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const routerIndex = require("./routes/routes");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const router = require("./routes/routes");
require("./config");
require("./db/database");

app.use("/", router);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  process.env.NODE_ENV === "development"
    ? console.log(`Development App listening at http://localhost:${port}`)
    : console.log(`Production App listening at ${port}`);
});
