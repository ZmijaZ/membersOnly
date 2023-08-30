var express = require("express");
var router = express.Router();

const userController = require("../controller/userController");

/* GET home page. */
router.get("/", (req, res, next) =>
  res.render("index", { title: "Members only", user: res.locals.currentUser })
);

router.get("/sign-up", userController.signUpGet);
router.post("/sign-up", userController.signUpPost);

router.get("/log-in", userController.logInGet);
router.post("/log-in", userController.logInPost);

router.get("/users/admin-check", userController.adminCheckGet);
router.post("/users/admin-check", userController.adminCheckPost);

router.get("/log-out", userController.logOut);

module.exports = router;
