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
        admin: false,
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

exports.logOut = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
  });
  res.redirect("/");
};

exports.adminCheckGet = (req, res, next) => {
  res.render("adminForm", { user: req.user });
};

exports.adminCheckPost = asyncHandler(async (req, res, next) => {
  if (req.body.passcode !== process.env.ADMIN_PASSCODE) {
    res.redirect("/users/admin-check");
  }

  const user = new User(req.user);
  user.admin = true;

  if (!user) {
    const err = new Error("User doesn't exist");
    err.status = 404;
    return next(err);
  }

  const result = await User.findByIdAndUpdate(req.user._id, user, {});
  if (result) {
    console.log("Admin role successfully added");
  }
  res.redirect("/messages");
});
