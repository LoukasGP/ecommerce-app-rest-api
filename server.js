const express = require('express')
const app = express();
const router = require('./routes/routes')
require('dotenv').config() //loads the dotenv package
require('./config')
require('./db/database')

app.use('/', router)

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


