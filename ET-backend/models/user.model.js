const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userName: { type: String, require: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    token: {type: String, default: "NA"},
    isVerified: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

let UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
