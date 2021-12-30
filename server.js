const express = require('express')
const app = express();
const router = require('./routes/index')

app.use('/', router)

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})