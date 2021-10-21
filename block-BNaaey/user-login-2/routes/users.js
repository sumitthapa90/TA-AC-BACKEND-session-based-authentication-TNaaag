var express = require("express");
var router = express.Router();
var User = require("../model/user");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.render("users");
});

router.get("/register", (req, res, next) => {
  res.render("register");
});

router.post("/register", (req, res, next) => {
  User.create(req.body, (err, users) => {
    console.log(err, users);
    if (err) return next(err);
    res.redirect("/users/login");
  });
});

router.get("/login", (req, res, next) => {
  res.render("login");
});

router.post("/login", (req, res, next) => {
  var { email, password } = req.body;
  if (!email || !password) {
    res.redirect("/users/login");
  }
  User.findOne({ email }, (err, user) => {
    if (err) return next(err);
    //no
    if (!user) {
      res.redirect("/users/login");
    }
    //compare password
    user.verifyPassword(password, (err, result) => {
      console.log(err, result);
    });
  });
});

module.exports = router;
