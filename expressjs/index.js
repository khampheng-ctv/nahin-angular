const express = require("express");
const app = express();
const port = 3000;

const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const Users = require("./model/users.js");

//create server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

//CORS & bodyParser
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
mongoose.connect("mongodb://localhost:27017/nahin", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


//get all user
app.get('/users', (req, res, next) => {
  Users.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  })
})

//get only user
app.get('/user/:id', (req, res, next) => {
  Users.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  })
})

//add user
app.post('/addUser', (req, res, next) => {
  Users.create(req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.sendStatus(200);
    }
  })
})

//delete only user
app.delete('/deleteUserOne/:id', (req, res, next) => {
  Users.deleteOne({_id: req.params.id}, error => {
    if (error) {
      return next(error);
    } else {
      res.sendStatus(200);
    }
  })
})