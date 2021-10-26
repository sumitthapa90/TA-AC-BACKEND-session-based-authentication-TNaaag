var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var commentSchema = new Schema(
  {
    content: { type: String, required: true },
    articleId: { type: Schema.Types.ObjectId, required: true, ref: "Article" },
  },
  { timestamps: true }
);
var Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
