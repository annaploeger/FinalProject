var express = require("express");
var router = express.Router();

/* GET home page */

router.get("/", function(req, res, next) {
  res.render("index", { title: "Mibo." });
});

router.get("/login", function(req, res, next) {
  if (!req.session.email) {
    res.render("login", { title: "Login." });
  } else {
    res.redirect("/");
  }
});

router.get("/register", function(req, res, next) {
  if (!req.session.email) {
    res.render("register", { title: "Sign Up." });
  } else {
    res.redirect("/");
  }
});

router.get("/profile", function(req, res, next) {
  if (!req.session.email) {
    res.redirect("/");
  } else {
    res.render("profile", { title: "Your Profile." });
  }
});

router.get("/logout", function(req, res, next) {
  if (!req.session.email) {
    res.redirect("/");
  } else {
    res.render("logout", { title: "Logout." });
  }
});

module.exports = router;
