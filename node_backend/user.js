const bcrypt = require("bcrypt");
const multer = require("multer");
const UserModel = require("./model/UserModel");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const upload = multer({
  storage: multer.diskStorage({
    destination: path.join(__dirname, "images/profile/"),
    filename: (req, file, cb) => {
      cb(null, uuidv4() + path.extname(file.filename));
    },
  }),
});

//register
const register = (app) => {
  app.post("/register", async (req, res) => {
    const { username, firstName, lastName, gender, email, tel, password } =
      req.body;
    const hashPassword = await bcrypt.hashSync(password, 5);
    const data = {
      username,
      firstName,
      lastName,
      gender,
      email,
      tel,
      password: hashPassword,
      status: "user",
    };

    UserModel.create(data, (error, data) => {
      if (error) {
        res.sendStatus(400);
      } else {
        res.sendStatus(201);
      }
    });
  });
};

//login
const login = (app) => {
  app.post("/login", (req, res) => {
    const { username, password } = req.body;
    UserModel.findOne({ username: username }, (error, data) => {
      if (data) {
        bcrypt.compare(password, data.password).then((result) => {
          if (result) {
            res.sendStatus(200);
          } else {
            res.sendStatus(401);
          }
        });
      } else {
          res.sendStatus(404);
      }
    });
  });
};

//update
const editAccount = (app) => {
  app.put("/editAccount", async (req, res) => {
    const { _id, username, firstName, lastName, gender, email, tel, password } =
      req.body;
    let data = {
      username,
      firstName,
      lastName,
      gender,
      email,
      tel,
    };
    if (password) data.password = await bcrypt.hashSync(password, 5);
  });
};

//delete
const deleteAccount = (app) => {
  app.delete("/deleteAccount/:id", (req, res) => {
    //
  });
};

module.exports = { register, login, editAccount, deleteAccount };
