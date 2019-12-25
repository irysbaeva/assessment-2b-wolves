const express = require("express");

const router = express.Router();
const bcrypt = require("bcrypt");
const { sessionChecker } = require("../middleware/auth");
const User = require("../models/user");
const saltRounds = 10;

router.get("/registration", sessionChecker, function(req, res, next) {
  res.render("registration");
});

router.post("/success", async function(req, res, next) {
  try {
    const name = req.body.name;
    let user = await User.findOne({ name });

    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, saltRounds)
    });

    if (!user) {
      await newUser.save();
      req.session.user = newUser;
  
      res.render(`success`, {
        newUser
      });
    } else {
      res.redirect("/login");
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
