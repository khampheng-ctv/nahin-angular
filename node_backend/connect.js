const mongoose = require("mongoose");
const connect = () => {
  mongoose.connect("mongodb://localhost:27017/nahin", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
};
module.exports = { connect };