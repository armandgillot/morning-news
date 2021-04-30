var express = require("express");
var router = express.Router();
var request = require("sync-request");
var usersModel = require("../models/usersSchema");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

/* API NEWS SOURCES */
router.get("/news", async (req, res, next) => {
  var user = await usersModel.findOne({ token: req.query.token });

  var language = "fr";
  if (user.language === "gb") {
    language = "en";
  }
  var requete = request(
    "GET",
    `https://newsapi.org/v2/sources?language=${language}&country=${user.language}&apiKey=${process.env.API_KEY}`
  );
  var result = JSON.parse(requete.body);

  res.json({ result: result.sources });
});

router.put("/news", async (req, res, next) => {
  var user = await usersModel.findOne({ token: req.query.token });
  console.log(user.language);
  console.log(req.query.country);
  user.language = req.query.country;
  await user.save();
  res.json(user);
});

/* ARTICLE BY SOURCE */
router.get("/news-bysource", function (req, res, next) {
  var requete = request(
    "GET",
    `https://newsapi.org/v2/top-headlines?sources=${req.query.id}&apiKey=${process.env.API_KEY}`
  );
  var result = JSON.parse(requete.body);

  res.json({ result: result.articles });
});

/* Change Country */
// router.get("/changeCountry", async (req, res, next) => {
//   var user = await usersModel.findOne({ token: req.query.token });
//   var language = user.language;
//   res.json({ language });
// });

module.exports = router;
