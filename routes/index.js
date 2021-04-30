var express = require("express");
var router = express.Router();
var request = require("sync-request");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

/* API NEWS SOURCES */
router.get("/news", function (req, res, next) {
  var language = "fr";
  if (req.query.country === "gb") {
    language = "en";
  }
  var requete = request(
    "GET",
    `https://newsapi.org/v2/sources?language=${language}&country=${req.query.country}&apiKey=${process.env.API_KEY}`
  );
  var result = JSON.parse(requete.body);

  res.json({ result: result.sources });
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

module.exports = router;


/* ADD AN ARTICLE FROM WISHLIST TO DB */
router.post('/articles_saved', async function (req, res, next) {

  var newWishlist = new wishlistModel({
    content: req.body.content,
    description: req.body.description,
    urlToImage: req.body.urlToImage,

  });
  var articleSaved = await newArticleSaved.save();
  res.json({ result: true, article: newArticleSaved });

})
