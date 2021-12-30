const express = require("express");
const userAccountRouter = express.Router();
const bodyParser = require('body-parser');
const {UserByEmailExists} = require('./auth');
const { pool } = require("../config");
const bcrypt = require('bcrypt');


/*
I think you can avoid using body-parser for parsing the body of POST request since that can also be done using the express module as well.
app.use(express.json())

If you don't want to use seperate npm package body-parser, latest express (4.16+) has built-in body-parser middleware and can be used like this,

const app = express();
app.use(express.json({ limit: '100mb' }));
p.s. Not all functionalities of body parse are present in the express. Refer documentation for full usage here

*/

// logic for handling a new user registration
userAccountRouter.post('/' , (res ,req) => {
    const {email,first_name,last_name,password} = req.body
    if (UserByEmailExist(email) === true) {
        return res.status(422).json({
            error: { status: 422, data: "User with this email already exists."}
        })
    } else {
       const hashedPassword = await bcrypt.hash(password, 10);
       pool.query('INSERT INTO users (first_name , last_name, password ,email) VALUES ($1, $2 , $3 , $4 )' , [first_name , last_name, hashedPassword , email ] ,
        (err) => {
            if (err){
                throw err
            }
            response.status(201).json({ status: 'success', message: 'Account added.' })
        }  )
        
    }
})
 




userAccountRouter.get('/', (req,res) => {
    res.send('users')
});


module.exports = userAccountRouter;