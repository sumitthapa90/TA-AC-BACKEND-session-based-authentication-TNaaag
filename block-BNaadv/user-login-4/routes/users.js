var express = require("express");
var router = express.Router();
var User = require("../model/user");

/* GET users listing. */
router.get("/", function (req, res, next) {
  console.log(req.session);
  res.render("users");
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", (req, res, next) => {
  User.create(req.body, (err, user) => {
    console.log(err, user);
    if (err) return next(err);
    res.redirect("/users/login");
  });
});

router.get("/login", (req, res) => {
  var error = req.flash("error")[0];
  res.render("login", { error });
});

router.post("/login", (req, res, next) => {
  var { email, password } = req.body;
  console.log(req.body);
  if (!email || !password) {
    req.flash("error", "Email/Password required");
    return res.redirect("/users/login");
  }
  User.findOne({ email }, (err, user) => {
    console.log(err, user, "yes it is");
    if (err) return next(err);
    if (!user) {
      return res.redirect("/users/login");
    }
    //compare
    user.verifyPassword(password, (err, result) => {
      if (err) return next(err);
      if (!result) {
        return res.redirect("/users/login");
      }
      req.session.userId = user.id;
      res.redirect("/dashboard");
    });
  });
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/users/login");
});
module.exports = router;
