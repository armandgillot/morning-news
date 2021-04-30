var mongoose = require("mongoose");

var usersShema = mongoose.Schema({
  username: String,
  email: String,
  password: String,
  token: String,
});

var usersModel = mongoose.model("users", usersShema);

module.exports = usersModel;
