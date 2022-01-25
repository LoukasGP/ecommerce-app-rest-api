const { getPwdHash } = require("../services").authService;
const { createUser, fetchUserByEmail } = require("../services").userService;
const { createCart } = require("../services").cartService;
const passport = require("passport");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const isProduction = process.env.NODE_ENV === "production";

const signupUser = async (req, res, next) => {
  const { email, password, first_name, last_name } = req.body;
  //Check if user with this email exists
  const userDb = await fetchUserByEmail(email);
  if (userDb) {
    return res.status(403).send("User with this email already exists.");
  }

  const pwd_hash = await getPwdHash(password);
  const user = {
    email,
    first_name,
    last_name,
    pwd_hash,
    user_role: "customer",
  };
  const newUser = await createUser(user);
  const newCart = await createCart(newUser.id);
  res.status(201).json({ userId: newUser.id, cartId: newCart.id });
  next();
};

const loginUser = async (req, res, next) => {
  //Reject if validation fails
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  passport.authenticate("login", async (err, user, info) => {
    if (err || !user) {
      const error = new Error(info.message);
      return next(error);
    }
    req.login(user, { session: false }, async (error) => {
      if (error) return next(error);

      const body = {
        id: user.id,
        cart_id: user.cart_id,
        email: user.email,
        role: user.user_role,
      };
      const token = jwt.sign({ user: body }, process.env.JWT_KEY);

      res.cookie("A_JWT", token, {
        maxAge: 1000 * 60 * 60 * 24 * 1000,
        httpOnly: true,
        sameSite: isProduction ? "none" : "lax",
        secure: isProduction ? true : false,
      });

      return res.status(200).send(`Login successful.`);
    });
  })(req, res, next);
};

const logoutUser = (req, res, next) => {
  res.clearCookie("A_JWT");
  res.status(200).send();
  next();
};

module.exports = {
  signupUser,
  loginUser,
  logoutUser,
};
