const bcrypt = require("bcrypt");
const UserModel = require("./../model/UserModel");

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
  app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const findUsername = await UserModel.findOne({ username: username });
    const findEmail = await UserModel.findOne({ email: username });
    if (!findUsername && !findEmail) {
      res.sendStatus(401);
    } else if (findUsername) {
      comparePassword(password, findUsername.password);
    } else if (findEmail) {
      comparePassword(password, findEmail.password);
    }

    async function comparePassword(passwordTxt, hashPassword) {
      const result = await bcrypt.compare(passwordTxt, hashPassword);
      if (result) {
        res.sendStatus(200);
      } else {
        res.sendStatus(401);
      }
    }
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
