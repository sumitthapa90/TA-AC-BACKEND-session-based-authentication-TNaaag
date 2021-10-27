var express = require("express");
var router = express.Router();

var User = require("../models/user");

router.get("/", (req, res, next) => {
  res.render("users");
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", (req, res, next) => {
  User.create(req.body, (err, user) => {
    console.log(err, user);
    if (err) return next(err);
    res.redirect("/users");
  });
});

module.exports = router;
