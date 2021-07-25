const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const Users = require("./users.js");

const app = express();
const port = 3000;
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
mongoose.connect("mongodb://localhost:27017/nahin", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get("/", (req, res) => {
  res.send("Express");
});

//register

app.post("/register", (req, res) => {
  let payload = req.body;
  let users = new Users(payload);
  users
    .save()
    .then(() => res.json({ msg: "Register account success" }))
    .catch((error) => {
      if (error) res.json({ msg: "Sorry can't register account. try again"});
    });
});

//login
app.post("/login", (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  res.json({ username: username, password: password });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
