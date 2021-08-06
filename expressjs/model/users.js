const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Users = new Schema(
  {
    firstName: String,
    lastName: String,
    username: {
      type: String,
      index: true,
      unique: true,
    },
    email: {
      type: String,
      index: true,
      unique: true,
    },
    gender: String,
    password: String,
    tel: String,
    img: String,
  },
  {
    collection: "users",
  }
);
module.exports = mongoose.model("Users", Users);
