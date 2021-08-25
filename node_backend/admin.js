const fs = require("fs");
const bcrypt = require("bcrypt");
const UserModel = require("./model/UserModel");
const multerUpload = require("./multerUpload");

//add new user
const addUser = (app) => {
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
    UserModel.create(
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
};

//get all users
const getUsers = (app) => {
  app.get("/admin/users", (req, res) => {
    UserModel.find((error, data) => {
      if (error) {
        return next(error);
      } else {
        res.json(data);
      }
    });
  });
};

const getUser = (app) => {
  app.get("/admin/user/:id", (req, res, next) => {
    UserModel.findById(req.params.id, (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.json(data);
      }
    });
  });
};

const editUser = (app) => {
  app.put(
    "/admin/editUser",
    multerUpload.singleUpload("images/profile/", "img"),
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
  addUser,
  getUser,
  getUsers,
  editUser,
  deleteUser,
};
