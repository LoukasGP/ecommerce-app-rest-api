const express = require('express');
const router = express.Router();
const {pool} = require('../config')

//Registration - can they register, or do have they already an account

// checking to see if user with that email exists
const UserByEmailExists =  (email) => {
    pool.query("SELECT COUNT(*) AS cnt FROM user WHERE email = ? ", body.email,
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

module.exports = UserByEmailExists