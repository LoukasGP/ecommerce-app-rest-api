const userAccountRouter = require('./routes/userAccounts/userAccounts');
const productsRouter = require('./routes/products/products');
const cartsRouter = require('./routes/carts/carts');

const express = require('express')
const app = express();

app.use('/users', userAccountRouter);
app.use('/product', productsRouter);
app.use('/cart', cartsRouter);

app.get('/', (req, res) => {
  res.send('Hello World!')
})


const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})