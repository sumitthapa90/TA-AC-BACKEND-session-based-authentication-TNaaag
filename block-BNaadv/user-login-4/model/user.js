var mongoose = require("mongoose");
var bcrypt = require("bcrypt");

var Schema = mongoose.Schema;

var userSchema = new Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, minlength: 4 },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  console.log(this, "sumit");
  if (this.password && this.isModified("password")) {
    bcrypt.hash(this.password, 10, (err, hashed) => {
      if (err) return next(err);
      this.password = hashed;
      return next();
    });
  } else {
    next();
  }
});

userSchema.methods.verifyPassword = function (password, cb) {
  console.log(password);
  bcrypt.compare(password, this.password, (err, result) => {
    if (err) return next(err);
    return cb(err, result);
  });
};

var User = mongoose.model("User", userSchema);

module.exports = User;
