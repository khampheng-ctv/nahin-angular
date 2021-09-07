const express = require("express");
require("dotenv").config({path: './config/.env'});
const app = express();
const { API_PORT } = process.env;
const port = process.env.API_PORT || API_PORT;
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

//admin
const {
  adminPage,
  addUser,
  getUser,
  getUsers,
  editUser,
  deleteUser,
} = require("./router/admin");
adminPage(app);
addUser(app); //add new user
getUser(app); //get user by id
getUsers(app); //get all user
editUser(app); //edit user
deleteUser(app); //delete user

//user
const {
  userPage,
  register,
  login,
  editAccount,
  deleteAccount,
  getImage
} = require("./router/user");
userPage(app);
register(app);
login(app);
editAccount(app);
deleteAccount(app);
getImage(app);

//test header
app.get('/header', (req, res) => {
  res.status(200).json(req.headers['x-access-token']);
})

//listen
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
