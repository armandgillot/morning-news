var mongoose = require("mongoose");

var wishlistShema = mongoose.Schema({
  name: String,
  description: String,
  language: String,
  country: String,
});

var wishlistModel = mongoose.model("users", wisthlitShema);

module.exports = wishlistModel;