var express = require("express");
var router = express.Router();
var bcrypt = require("bcryptjs");
var userModel = require("../models/userModels");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/signUp", async (req, res) => {
  let { username, name, email, password } = req.body;
  let emailcon = await userModel.findOne({ email: email });
  if (emailcon) {
    res.json({ success: false, message: "Email already exist" });
  } else {
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, function (err, hash) {
        let user = userModel.create({
          userName: username,
          name: name,
          email: email,
          password: hash,
        });
        res.json({ success: true, message: "new user created" });
      });
    });
  }
});

router.post("/login", async (req, res) => {
  let { email, password } = req.body;
  let user = await userModel.findOne({ email: email });
  if (user) {
    bcrypt.compare(password, user.password, function (err, res) {
      if (res) {
        res.json({ success: true, message: "User logged in successfully" });
      } else {
        res.json({ success: false, message: "Invalid email and Password" });
      }
    });
  } else {
    res.json({ success: false, message: "User not found" });
  }
});
module.exports = router;
