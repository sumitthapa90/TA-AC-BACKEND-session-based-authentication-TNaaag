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

router.get("/:id", (req, res, next) => {
  var id = req.params.id;
  // Article.findById(id, (err, articles) => {
  //   if (err) return next(err);
  //   res.render("singleDetail", { articles: articles });
  // });
  Article.findById(id)
    .populate("comments")
    .exec((err, articles) => {
      if (err) return next(err);
      res.render("singleDetail", {articles});
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
router.post("/:articleId/comments", (req, res, next) => {
  var articleId = req.params.articleId;
  console.log(req.body);
  req.body.articleId = articleId;
  Comment.create(req.body, (err, comment) => {
    if (err) return next(err);
    Article.findByIdAndUpdate(
      articleId,
      { $push: { comments: comment } },
      (err, article) => {
        if (err) return next(err);
        res.redirect("/articles/" + articleId);
      }
    );
  });
});

module.exports = router;
