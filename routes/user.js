const express = require("express");
const userAccountRouter = express.Router();
const {UserByEmailExists , validateEmail} = require('./auth');
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


let idArray = [0];

function generateId(idArray) {
  const lastIndex = idArray.length -1;
  const newEntry = idArray[lastIndex] +1 // this would work on an actual server
  idArray.push(newEntry)
  return newEntry;
}

// logic for handling a new user registration
userAccountRouter.post('/' , (req,res) => {
    const {email,first_name,last_name,password } = req.body
    if (UserByEmailExists(email) === true ) {
        return res.status(422).json({
            error: { status: 422, data: "User with this email already exists."}
        })
    } else if (validateEmail(email) === false) {
        return res.status(422).json({
            error: { status: 422, data: "Email address is not valid"}
        }) 
    } else {
        bcrypt.hash(password, 10, function(err, hash) {
            pool.query('INSERT INTO users (email,first_name,last_name,password ,id) VALUES ($1, $2 , $3 , $4 , $5)' , [email, first_name , last_name, hash ,generateId(idArray) ] ,
            (err) => {
                if (err){
                    throw err
                }
                res.status(201).json({ status: 'success', message: 'Account added.' })
            }  )
            
        });
       
        
     }
 })
 

 




userAccountRouter.get('/', (req,res) => {
    res.send('users')
});


module.exports = userAccountRouter;