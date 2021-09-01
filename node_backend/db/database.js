const mongoose = require("mongoose");
require('dotenv').config({path: './../config/.env'});
const database = () => {
  mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
};
module.exports = { database };