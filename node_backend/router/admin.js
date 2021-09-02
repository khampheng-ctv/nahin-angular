const fs = require("fs");
const bcrypt = require("bcrypt");
const UserModel = require("./../model/UserModel");
const { singleUpload } = require("./../middleware/upload");
const auth = require("./../middleware/auth");

//admin page
const adminPage = (app) => {
  app.post("/admin", auth, (req, res) => {
    if (req.user.status == "admin") {
      res.status(200).json(req.user);
    } else {
      res.status(401).send("Unauthentication");
    }
  });

  app.get("/admin/*", auth, (req, res, next) => {
    if (req.user.status !== "admin") {
      return res.status(401).send("Unauthentication");
    }
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
    } = req.body;

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
  app.get("/admin/users", async (req, res) => {
    const user = await UserModel.find({});
    res.json(user);
  });
};

//get one user
const getUser = (app) => {
  app.get("/admin/user/:id", async (req, res) => {
    const user = await UserModel.findById(req.params.id);
    res.json(user);
  });
};

const editUser = (app) => {
  app.put(
    "/admin/editUser",
    singleUpload("images/profile/", "img"),
    async (req, res, next) => {
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
      } = await req.body;

      let data = { username, firstName, lastName, gender, email, tel, status };
      let hashPassword = await bcrypt.hashSync(password, 5);
      if (req.file) data.img = req.file.filename;
      if (password) data.password = hashPassword;

      UserModel.findByIdAndUpdate({ _id }, data, (error, result) => {
        if (error) return next(error);
        else {
          res.sendStatus(200);
        }
      });
    }
  );
};

const deleteUser = (app) => {
  app.delete("/admin/deleteUser/:id", (req, res, next) => {
    UserModel.deleteOne(
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
};

module.exports = {
  adminPage,
  addUser,
  getUser,
  getUsers,
  editUser,
  deleteUser,
};
