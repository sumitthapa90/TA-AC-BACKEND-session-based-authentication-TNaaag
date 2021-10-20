var express = require("express");
var router = express.Router();
var User = require("../model/user");

/* GET users listing. */
router.get("/", (req, res, next) => {
  res.render("users");
});

router.get("/register", (req, res, next) => {
  res.render("registerForm");
});

router.post("/register", (req, res, next) => {
  User.create(req.body, (err, users) => {
    console.log(err, users);
    if (err) return next(err);
    res.redirect("/users/login")
  });
});

router.get("/login", (req, res, next) => {
  res.render("login");
});
module.exports = router;
