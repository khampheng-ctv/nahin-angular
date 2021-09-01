const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const database = require('./../db/database');
database(); //connect db

const UserSchema = new Schema(
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
    status: String,
  },
  {
    collection: "users",
  }
);
module.exports = mongoose.model("UserModel", UserSchema);
