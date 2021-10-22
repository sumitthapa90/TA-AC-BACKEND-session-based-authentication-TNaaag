var express = require("express");
var router = express.Router();
var User = require("../model/user");

/* GET users listing. */
router.get("/", function (req, res, next) {
  console.log(req.session);
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
  console.log(email);
  if (!email || !password) {
    res.redirect("/users/login");
  }
  //
  User.findOne({ email }, (err, user) => {
    console.log(user, "yes it is");
    if (err) return next(err);
    if (!user) {
      return res.redirect("/users/login");
    }
    //
    user.verifyPassword(password, (err, result) => {
      console.log(err, result);
      if (err) return next(err);
      if (!result) {
        res.redirect("/users/login");
      }
      //
      req.session.userId = user.id;
      res.redirect("/dashboard");
    });
  });
});

module.exports = router;
