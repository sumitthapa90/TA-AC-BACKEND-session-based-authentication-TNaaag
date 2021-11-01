var mongoose = require("mongoose");
var bcrypt = require("bcrypt");
var Schema = mongoose.Schema;

var productSchema = new Schema(
  {
    name: { type: String },
    description: { type: String },
    quantity: { type: Number },
    price: { type: Number },
    image: { type: String },
    likes: { type: Number, default: 0 },
    comments: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

var Product = mongoose.model("Product", productSchema);

module.exports = Product;
