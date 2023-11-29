const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    salt: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileImgUrl: {
      type: String,
      default: "/images/profile.png",
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
    },
  },
  {
    timestamps : true
  }
);

const User  = mongoose.model('user',userSchema);

module.exports = User;