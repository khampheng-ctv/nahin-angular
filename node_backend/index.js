const express = require("express");
const app = express();
const port = 3000;

const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Users = require("./model/users.js");
const fs = require("fs");
const path = require("path");

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
mongoose.connect("mongodb://localhost:27017/nahin", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

//multer
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./users/img/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

//get all user
app.get("/users", (req, res, next) => {
  Users.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

//get user by id
app.get("/user/:id", (req, res, next) => {
  Users.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

//add user (admin)
app.post("/admin/addUser", async (req, res, next) => {
  let {
    username,
    firstName,
    lastName,
    gender,
    email,
    tel,
    password,
    img,
    status,
  } = await req.body;
  let hashPass = await bcrypt.hashSync(password, 5);
  Users.create(
    {
      username,
      firstName,
      lastName,
      gender,
      email,
      tel,
      password: hashPass,
      img,
      status,
    },
    (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.sendStatus(200);
      }
    }
  );
});

//update user (admin)
app.put("/admin/editUser", async (req, res, next) => {
  let {
    _id,
    username,
    firstName,
    lastName,
    gender,
    email,
    tel,
    password,
    img,
    status,
  } = await req.body;

  if (password) {
    let hashPassword = await bcrypt.hashSync(password, 5);
    let obj = {
      username,
      firstName,
      lastName,
      gender,
      email,
      tel,
      password: hashPassword,
      img,
      status,
    };
    updateUser(obj);
  } else {
    //password null
    let obj = {
      username,
      firstName,
      lastName,
      gender,
      email,
      tel,
      password,
      img,
      status,
    };
    updateUser(obj);
  }

  function updateUser(obj) {
    Users.findByIdAndUpdate({ _id }, obj, (error, result) => {
      if (error) return next(error);
      else {
        res.sendStatus(200);
      }
    });
  }
});

//delete only user
app.delete("/deleteUserOne/:id", (req, res, next) => {
  Users.deleteOne(
    {
      _id: req.params.id,
    },
    (error) => {
      if (error) {
        return next(error);
      } else {
        res.sendStatus(200);
      }
    }
  );
});

//create server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
