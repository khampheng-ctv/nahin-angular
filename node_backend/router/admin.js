const fs = require("fs");
const bcrypt = require("bcrypt");
const UserModel = require("./../model/UserModel");
const auth = require('./../middleware/auth');

//check auth in admin page
const adminPage = (app) => {
  app.post("/admin", auth, (req, res) => {
    if (req.user.status == "admin") {
      res.status(200).json(req.user);
    } else {
      res.status(401).send("Unauthentication");
    }
  });

  app.post("/admin/***", auth, (req, res, next) => {
    if (req.user.status !== "admin")
      return res.status(401).send("Unauthentication");

    return next();
  });

  app.put("/admin/***", auth, (req, res, next) => {
    if (req.user.status !== "admin")
      return res.status(401).send("Unauthentication");

    return next();
  });

  app.get("/admin/***/:token", auth, (req, res, next) => {
    if (req.user.status !== "admin")
      return res.status(401).send("Unauthentication");

    return next();
  });

  app.delete("/admin/***/:token", auth, (req, res, next) => {
    if (req.user.status !== "admin")
      return res.status(401).send("Unauthentication");

    return next();
  });
};

//add new user
const addUser = (app) => {
  app.post("/admin/adduser", async (req, res) => {
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
    } = req.body.user;

    try {
      let hashPass = await bcrypt.hashSync(password, 5);
      const user = await UserModel.create({
        username,
        firstName,
        lastName,
        gender,
        email,
        tel,
        password: hashPass,
        img,
        status,
      });
      res.status(201).json(user);
    } catch (error) {
      res.status(400).send("Can't create user");
    }
  });
};

//get all users
const getUsers = (app) => {
  app.get("/admin/users/:token", async (req, res) => {
    const user = await UserModel.find({});
    res.json(user);
  });
};

//get one user
const getUser = (app) => {
  app.get("/admin/user/:id/:token", async (req, res) => {
    const user = await UserModel.findById(req.params.id);
    res.json(user);
  });
};

//edit user
const editUser = (app) => {
  app.put("/admin/edituser", async (req, res) => {
    let {
      _id,
      username,
      firstName,
      lastName,
      gender,
      email,
      tel,
      password,
      status,
    } = req.body.user;

    let data = { username, firstName, lastName, gender, email, tel, status };
    let hashPassword = await bcrypt.hashSync(password, 5);
    // if (req.file) data.img = req.file.filename;
    if (password) data.password = hashPassword;

    const user = await UserModel.findByIdAndUpdate({ _id }, data);
    if (!user) return res.status(400).send("Can't edit user");

    res.status(201).json(user);
  });
};

//delete one user
const deleteUser = (app) => {
  app.delete("/admin/deleteuser/:id/:token", async (req, res) => {
    UserModel.deleteOne({ _id: req.params.id })
      .then((result) => {
        res.status(200).json({ msg: "delete" });
      })
      .catch((error) => {
        res.status(400).send("delete error");
      });
  });
};

module.exports = {
  adminPage,
  addUser,
  getUser,
  getUsers,
  editUser,
  deleteUser,
};
