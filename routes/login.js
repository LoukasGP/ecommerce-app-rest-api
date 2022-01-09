const express = require('express');
const loginRouter = express.Router();
const {pool} = require('../config');
const bcrypt = require('bcrypt');
// login imports
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

// express session


passport.use('login',new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
},
function (req, email , password, done) {
    // console.log(password);
    // console.log(email);
    pool.query('SELECT * FROM users WHERE email = $1; ', [email], 
      function(err, data){
          // console.log(data.rows)
          // console.log('got here')
          if (err) {
           console.log(err)
           return done(null,false, {message:"There was a problem logging in"})
        } else {
          if (data.rowCount === 0) {
              return done(null, false, {message:"Incorrect Email or Password"});
          } 
          // console.log(password)
          // console.log(data.rows[0].password)
          bcrypt.compare(password , data.rows[0].password , function (err ,result ){
            // console.log(password)
            // console.log(data.rows[0].password)
            // console.log(result)
            if (err){
              console.log(err);
            }
            if(result !== true){
              // console.log("wrong email or password")
              return done(null, false, {message:"Incorrect Email or Password"});
            } else {
              return done(null, data.rows[0], {message:"Login Successful"})
            }
          })
        }
    }
    )  
  }
))

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});


// logging out
loginRouter.get('/logout' , (req,res) => {
  req.session.destroy()
  res.redirect('/')
})

loginRouter.post('/', function(req, res, next) {
    passport.authenticate('login', function(err, user, info) {
      if (err) { return next(err); }
      if (!user) { 
          res.status(401);
          res.end(info.message);
          return;
      }
      req.login(user,function(err){
        if(err){
          console.log(err)
          return res.status(500).json({
            err: 'Could not log in user'
        })
        }
        req.session.id
        req.session.cookie
        res.send(info.message)
      })
      })(req, res, next);
  });
  





module.exports = loginRouter;