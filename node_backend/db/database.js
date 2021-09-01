const mongoose = require("mongoose");
require('dotenv').config({path: './../config/.env'});

exports.connect = () => {
  mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }).then(() => {
    console.log('Successfully connected to database');
  }).catch((error) => {
    console.log('Error connecting to database');
  });
}