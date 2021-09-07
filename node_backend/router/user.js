const fs = require('fs');
const path = require('path');
const bcrypt = require("bcrypt");
const UserModel = require("./../model/UserModel");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "./../config/.env" });
const auth = require('./../middleware/auth');

//user page
const userPage = (app) => {
  app.get('/user', auth, (req, res) => {
    res.status(200).json(req.user);
  })
}

//register
const register = (app) => {
  app.post("/register", async (req, res) => {
    try {
      const { username, firstName, lastName, gender, email, tel, password } =
        req.body;
      const hashPassword = await bcrypt.hashSync(password, 5);

      //create user
      const user = await UserModel.create({
        username,
        firstName,
        lastName: lastName.toUpperCase(),
        gender,
        email: email.toLowerCase(),
        tel,
        password: hashPassword,
        status: "user",
      });

      //create token
      const token = jwt.sign(
        {
          user_id: user._id,
          username: user.username,
          firstName: user.firstName,
          status: user.status,
        },
        process.env.TOKEN_KEY,
        {
          expiresIn: "7d",
        }
      );

      //return new user
      res.status(201).json({ token: token });
    } catch (error) {
      res
        .status(401)
        .json({ error: "Can't register account. Please try again" });
    }
  });
};

//login
const login = (app) => {
  app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const findUsername = await UserModel.findOne({ username: username });
    const findEmail = await UserModel.findOne({ email: username });
    if (!findUsername && !findEmail) {
      res.status(401).send("E-mail Or Username is incorrect");
    } else if (findUsername) {
      comparePassword(password, findUsername);
    } else if (findEmail) {
      comparePassword(password, findEmail);
    }

    async function comparePassword(txt, user) {
      const result = await bcrypt.compare(txt, user.password);
      if (result) {
        //create token
        const token = jwt.sign(
          {
            user_id: user._id,
            username: user.username,
            firstName: user.firstName,
            status: user.status,
          },
          process.env.TOKEN_KEY,
          {
            expiresIn: "7d",
          }
        );
        res.status(200).json({ token: token });
      } else {
        res.status(401).send("Password is incorrect");
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

//get user
const myAccount = (app) => {
  app.get("/user/myaccount/:id", async (req, res) => {
    const user = await UserModel.findById(req.params.id);
    res.json(user);
  });
};

//delete
const deleteAccount = (app) => {
  app.delete("/user/delete_account/:id", (req, res) => {
    //
  });
};

//get file/image
const getImage = (app) => {
  app.get('/user/get_image/:filename', async (req, res) => {
    const filename = req.params.filename;
    const content = await fs.readFileSync(`./images/profile/${filename}`, 'base64');
    res.json(content);
  })
}

module.exports = { userPage, register, login, editAccount, deleteAccount, getImage };
