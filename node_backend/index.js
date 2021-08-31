const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const cors = require("cors");
app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.get("/", (req, res) => {
  res.send("Welcome to expressjs");
});

//admin
const { addUser, getUser, getUsers, editUser, deleteUser } = require("./router/admin");
addUser(app); //add new user
getUser(app); //get user by id
getUsers(app); //get all user
editUser(app); //edit user
deleteUser(app); //delete user

//user
const { register, login, editAccount, deleteAccount } = require('./router/user');
register(app);
login(app);
editAccount(app);
deleteAccount(app);

//listen
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
