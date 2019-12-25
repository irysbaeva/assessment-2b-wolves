const express = require("express");
const bcrypt = require("bcrypt");
const { sessionChecker } = require("../middleware/auth");
const User = require("../models/user");
const router = express.Router();



router.get("/logout", async (req, res, next) => {
  if (req.session.user) {
    try {
      await req.session.destroy();
      res.clearCookie("user_sid");
      res.redirect("/login");
    } catch (error) {
      next(error);
    }
  } else {
    res.redirect("/login");
  }
});

module.exports = router;