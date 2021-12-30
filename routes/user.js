const express = require("express");
const userAccountRouter = express.Router();
const bodyParser = require('body-parser');

/*
I think you can avoid using body-parser for parsing the body of POST request since that can also be done using the express module as well.
app.use(express.json())

If you don't want to use seperate npm package body-parser, latest express (4.16+) has built-in body-parser middleware and can be used like this,

const app = express();
app.use(express.json({ limit: '100mb' }));
p.s. Not all functionalities of body parse are present in the express. Refer documentation for full usage here

*/

userAccountRouter.get('/', (req,res) => {
    res.send('users')
});


module.exports = userAccountRouter;