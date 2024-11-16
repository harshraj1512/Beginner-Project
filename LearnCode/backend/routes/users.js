var express = require("express");
var router = express.Router();
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var userModel = require("../models/userModels");
var projectModel = require("../models/projectModel");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

const secret = "secret"; // secret for jwt

router.post("/signUp", async (req, res) => {
  let { username, name, email, password } = req.body;
  let emailcon = await userModel.findOne({ email: email });
  if (emailcon) {
    res.json({ success: false, message: "Email already exist" });
  } else {
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, function (err, hash) {
        let user = userModel.create({
          username: username,
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
    bcrypt.compare(password, user.password, function (err, isMatch) {
      if (isMatch) {
        let token = jwt.sign({ email: user.email, userId: user._id}, secret)
        return res.json({ success: true, message: "User logged in successfully", token: token, userId: user._id });
      } else {
        return res.json({ success: false, message: "Invalid email and Password" });
      }
    });
  } else {
    return res.json({ success: false, message: "User not found" });
  }
});

router.post("/getUserDetails", async (req, res) => {
   let {userId} = req.body;
   let user = await userModel.findOne({ _id: userId});
   if(user){
    return res.json({ success: true, message: "User details fetched successfully", user: user });
   } else {
    return res.json({ success: false, message: "User not found" });
   }
});

router.post("/createProject", async (req, res) => {
  let {userId, title} = req.body;
  let user = await userModel.findOne({ _id: userId });
  if (user) {
    let project = await projectModel.create({
      title: title,
      createdBy: userId
    });
    return res.json({ success: true, message: "Project Created Successfully", projectId: project._id });
  } else {
    return res.json({ success: false, message: "User not Found" });
  }
});

router.post("/getProject", async (req, res) => {
  let {userId} = req.body;
  let user = await userModel.findOne ({ _id: userId });
  if (user) {
    let project = await projectModel.find({ createdBy: userId });
    return res.json({ success: true, message: "Project Fetched", project: project })
  } else {
    return res.json({ success: false, message: "User not Found" });
  }
});

router.post("/deleteProject", async (req, res) => {
  let {userId, projId} = req.body;
  let user = await userModel.findOne({ _id: userId });
  if (user) {
    let project = await projectModel.findOneAndDelete({ _id: projId });
    return res.json({ success: true, message: "Project Deleted Successfully"});
  } else {
    return res.json({ success: false, message: "User Not found"});
  }
});

router.post("/getProject", async (req, res) => {
  let {userId, projId} = req.body;
  let user = await userModel.findOne({ _id: userId });
  if (user) {
    let project = await projectModel.findOne({ _id: projId });
    return res.json({ success: true, message: "Project fetched Successfully", project: project });
  } else {
    return res.json({ success: false, message: "User not Found!"});
  }
});

router.post("/updateProject", async (req, res) => {
  let { userId, htmlCode, cssCode, jsCode, projId } = req.body;
  let user = await userModel.findOne({ _id: userId });

  if (user) {
    let project = await projectModel.findOneAndUpdate(
      { _id: projId },
      { htmlCode: htmlCode, cssCode: cssCode, jsCode: jsCode },
      { new: true } // This option returns the updated document
    );

    if (project) {
      return res.json({ success: true, message: "Project updated successfully" });
    } else {
      return res.json({ success: false, message: "Project not found!" });
    }
  } else {
    return res.json({ success: false, message: "User not found!" });
  }
});

module.exports = router;
