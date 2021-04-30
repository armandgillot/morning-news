var mongoose = require("mongoose");

var wishlistSchema = mongoose.Schema({
  // name: String, 
  content: String,
  description: String,
  urlToImage: String, 
  // language: String,
  // country: String,
});

var wishlistModel = mongoose.model("articles", wishlistSchema);

module.exports = wishlistModel;