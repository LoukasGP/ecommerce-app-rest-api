const express = require('express');
const loginRouter = express.Router();
const {pool} = require('../config');
const bcrypt = require('bcrypt');
// login imports
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

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

// express session
let session = require('express-session');
const cookieParser = require("cookie-parser");
const cookieTime = 60000 * 60 * 24;

loginRouter.use(session({
  secret: 'secret',
  resave:true,
  saveUninitialized: false,
  cookie: {
    secure: true,
    maxAge: cookieTime
  }
}))

loginRouter.use(cookieParser()); // access the option to save 

loginRouter.get('/' , (req,res) => {
  session = req.session;
  session.useId = req.body.usernameField
  res.send('Cookies stored')
})

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
      res.send(info.message)
    })(req, res, next);
  });
  





module.exports = loginRouter;