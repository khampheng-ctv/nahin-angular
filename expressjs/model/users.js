const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
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
  password: String,
  tel: String,
});
const UserModule = mongoose.model("Users", userSchema);
module.exports = UserModule;
