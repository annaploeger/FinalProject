var express = require("express");
var router = express.Router();

/* GET home page */ 
router.get("/", function(req, res, next) {
  res.render("index", { title: "Microblog" });
}); 

router.get("/login", function(req, res, next) {
  res.render("login", { title: "Login" });
});

router.get("/register", function(req, res, next) {
  res.render("register", { title: "Sign Up" });
});

router.get("/profile", function(req, res, next) {
  res.render("profile", { title: "Your Profile" });
});

module.exports = router;
