var express = require("express");
var router = express.Router();
var usersModel = require("../models/usersSchema");
var uid2 = require("uid2");
var bcrypt = require("bcrypt");

/* sign-up */
router.post("/sign-up", async (req, res, next) => {
  if (
    (await usersModel.findOne({ email: req.body.emailUp })) ||
    req.body.emailUp == "" ||
    req.body.passwordUp == "" ||
    req.body.passwordUp == ""
  ) {
    res.json({ result: false });
  } else {
    const hash = bcrypt.hashSync(req.body.passwordUp, 10);
    var newUser = new usersModel({
      username: req.body.usernameUp,
      email: req.body.emailUp,
      password: hash,
      token: uid2(32),
      language: "fr",
    });
    var userSaved = await newUser.save();
    res.json({ result: true, token: newUser.token });
  }
});

/* sign-in */
router.post("/sign-in", async (req, res, next) => {
  var user = await usersModel.findOne({ email: req.body.emailIn });
  var password = req.body.passwordIn;
  if (user) {
    if (bcrypt.compareSync(password, user.password)) {
      res.json({ result: true, user, token: user.token });
    } else {
      res.json({ result: false });
    }
  } else {
    res.json({ result: false });
  }
});

module.exports = router;
