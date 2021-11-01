var express = require("express");
var router = express.Router();

var User = require("../model/user");

/* GET users listing. */
router.get("/", function (req, res, next) {
  User.find({}, (err, user) => {
    if (err) return next(err);
    res.render("users");
  });
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", (req, res, next) => {
  console.log(req.body);
  User.create(req.body, (err, user) => {
    if (err) return next(err);
    res.redirect("/users/login");
  });
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", (req, res, next) => {
  var { email, password } = req.body;
  if (!email || !password) {
    return res.redirect("/users/login");
  }

  User.findOne({ email }, (err, user) => {
    console.log(req.body, user);
    if (err) return next(err);
    if (!user) {
      return res.redirect("/users/login");
    }
    user.verifyPassword(password, (err, result) => {
      console.log(err, result, "same");
      if (err) return next(err);
      if (!result) {
        return res.redirect("/users/login");
      }
      console.log("yes it is");
      req.session.userId = user.id;
      res.redirect("/dashboard");
    });
  });
});

router.get("/logout", (req, res, next) => {
  req.session.destroy();
  res.redirect("/users/login");
});

module.exports = router;
