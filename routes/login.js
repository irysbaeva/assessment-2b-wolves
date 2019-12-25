const express = require("express");
const bcrypt = require("bcrypt");
const { sessionChecker } = require("../middleware/auth");
const User = require("../models/user");
const router = express.Router();

router.get("/login", sessionChecker, (req, res) => {
  res.render("login");
});

router.post("/login", sessionChecker, async (req, res) => {
  const { name, password } = req.body;

  const user = await User.findOne({ name });

  if (user && (await bcrypt.compare(password, user.password))) {
    req.session.user = user;
    res.redirect("/parties");
  } else {
    res.redirect("/login");
  }
});






module.exports = router;
