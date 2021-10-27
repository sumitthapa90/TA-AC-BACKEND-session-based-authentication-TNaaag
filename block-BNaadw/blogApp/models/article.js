var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var articleSchema = new Schema(
  {
    title: { type: String },
    description: { type: String },
    tags: [String],
    author: { type: String },
    likes: { type: Number, default: 0 },
    comments: [{ type: Schema.Types.ObjectId, required: true, ref: "Comment" }],
  },
  { timestamps: true }
);
var Article = mongoose.model("Article", articleSchema);

module.exports = Article;
