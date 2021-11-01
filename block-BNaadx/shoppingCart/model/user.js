var mongoose = require("mongoose");
var bcrypt = require("bcrypt");
var Schema = mongoose.Schema;

var userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, match: /@/, unique: true },
    password: { type: String, required: true, minlength: 5 },
    isAdmin: { type: String, default: "false" },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  if (this.password && this.isModified("password")) {
    bcrypt.hash(this.password, 10, (err, hashed) => {
      console.log(err, hashed);
      if (err) return next(err);
      this.password = hashed;
      next();
    });
  } else {
    next();
  }
});

userSchema.methods.verifyPassword = function (password, cb) {
  bcrypt.compare(password, this.password, (err, result) => {
    return cb(err, result);
  });
};

userSchema.pre("save", function (next) {
  var Adminemail = ["sumitthapa90gmail.com", "kabir@gmail.com"];
  Adminemail.forEach((email) => {
    console.log({ email });

    if (email === this.email) {
      this.isAdmin = true;
      next();
    } else {
      next();
    }
  });
});

var User = mongoose.model("User", userSchema);

module.exports = User;
