var mongoose = require("mongoose");

var usersShema = mongoose.Schema({
  wishlistId: [{type: mongoose.Schema.Types.ObjectId, ref: 'articles'}],
  username: String,
  email: String,
  password: String,
  token: String,
  language: String,
});

var usersModel = mongoose.model("users", usersShema);

module.exports = usersModel;
