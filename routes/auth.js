const express = require('express');
const router = express.Router();
const {pool} = require('../config')

//Registration - can they register, or do have they already an account

// checking to see if user with that email exists
// might want to add a check to see if it is a legit email

// checking to see if it is a real email
const validateEmail = (email) => {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

const UserByEmailExists =  (email) => {
   pool.query("SELECT COUNT(*) AS cnt FROM users WHERE email = ? ", [email],
    function(err, data){
        if (err){
            console.log(err)
        } else{
            if(data[0].cnt > 0){
                console.log('user already exists. Returning true')
                return true;
            } else {
                return false;
            }
        }
    })
}





//Login - can they login? Do they have an account?



module.exports = {UserByEmailExists ,validateEmail}