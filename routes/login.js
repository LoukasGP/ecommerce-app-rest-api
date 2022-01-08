const express = require('express');
const loginRouter = express.Router();
const {pool} = require('../config');
const bcrypt = require('bcrypt');
// login imports
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const res = require('express/lib/response');
// const JwtStrategy = require('passport-jwt').Strategy;
// const ExtractJWT = require('passport-jwt').ExtractJwt;

passport.use('login',new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
},
function (req, email , password, done) {
  pool.query('SELECT * FROM users WHERE email = $1 ', [email], 
    function(err, data){
        // console.log(data)
        if (err) {
         console.log(err)
         return done(null,false, {message:"There was a problem logging in"})
      } else {
        if (data.rowCount === 0) {
            return done(null, false, {message:"Incorrect Email or Password"});
        } else if (!bcrypt.compare(password,data.rows[0].password)){
            return done(null, false, {message:"Incorrect Email or Password"});
        } else {
            done(null , data.rows[0], {message:"Logged in Successfully"})
        }
      }
  }
  )  
}
))


loginRouter.post('/',
  passport.authenticate('login',
  {
    failureRedirect:'/'
  }
  ),
  function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    res.redirect('/users/' + req.user.username);
  });





module.exports = loginRouter;