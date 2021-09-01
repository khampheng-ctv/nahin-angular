const mongoose = require("mongoose");
require('./../db/database').connect() //connected database
const Schema = mongoose.Schema;

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
