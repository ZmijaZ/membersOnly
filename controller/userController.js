const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const passport = require("passport");

exports.signUpGet = (req, res, next) => {
  res.render("signupForm");
};

exports.signUpPost = asyncHandler(async (req, res, next) => {
  bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
    if (err) {
      console.log(err);
    } else {
      const user = new User({
        username: req.body.username,
        password: hashedPassword,
      });
      const result = await user.save();
      if (result) {
        console.log("User successfully made");
      }

      res.redirect("/log-in");
    }
  });
});

exports.logInGet = (req, res, next) => {
  if (res.locals.currentUser) return res.redirect("/");
  res.render("loginForm");
};

exports.logInPost = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/log-in",
});
