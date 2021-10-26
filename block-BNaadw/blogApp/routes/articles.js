var express = require("express");
var router = express.Router();

var Article = require("../models/article");
var Comment = require("../models/comment");

/* GET users listing. */
router.get("/", function (req, res, next) {
  Article.find({}, (err, articles) => {
    if (err) return next(err);
    res.render("articles", { articles });
  });
});

router.get("/new", (req, res) => {
  res.render("AddBlog");
});

// router.get("/:id", (req, res, next) => {
//   var id = req.params.id;
//   Article.findById(id, (err, articles) => {
//     if (err) return next(err);
//     res.render("singleDetail", { articles: articles });
//   });
// });

router.get("/:id", (req, res, next) => {
  var id = req.params.id;
  Article.findById(id, (err, articles) => {
    console.log(err, articles);
    if (err) return next(err);
    Comment.find({ articleId: id }, (err, comments) => {
      console.log(err, comments);
      res.render("singleDetail", { articles, comments });
    });
  });
});

router.get("/:id/edit", (req, res, next) => {
  var id = req.params.id;
  Article.findById(id, (err, articles) => {
    console.log(err, articles);
    if (err) return next(err);
    res.render("editForm", { articles });
  });
});

router.post("/", (req, res, next) => {
  req.body.tags = req.body.tags.trim("").split(" ");
  Article.create(req.body, (err, articles) => {
    console.log(err, articles);
    if (err) return next(err);
    res.redirect("/articles");
  });
});

router.post("/:id", (req, res, next) => {
  var id = req.params.id;
  Article.findByIdAndUpdate(id, req.body, (err, updated) => {
    if (err) return next(err);
    res.redirect("/articles/" + id);
  });
});

router.get("/:id/delete", (req, res, next) => {
  var id = req.params.id;
  Article.findByIdAndDelete(id, (err, articles) => {
    if (err) return next(err);
    res.redirect("/articles");
  });
});

router.get("/:id/likes", (req, res, next) => {
  var id = req.params.id;
  Article.findByIdAndUpdate(id, { $inc: { likes: 1 } }, (err, articles) => {
    console.log(err, articles);
    res.redirect("/articles/" + id);
  });
});

//add comments

module.exports = router;
