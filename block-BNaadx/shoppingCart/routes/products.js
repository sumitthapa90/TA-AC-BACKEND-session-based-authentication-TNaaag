var express = require("express");
var router = express.Router();
var User = require("../model/user");
var Product = require("../model/product");

/* GET users listing. */

router.get("/", (req, res, next) => {
  res.render("products");
});

module.exports = router;
