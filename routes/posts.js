// Required libraries
var express = require("express");
var router = express.Router();
var post = require("../controller/posts");

// Get posts page
router.get("/", function(req, res, next) {
  //console.log("------ session -----: " + req.session.email);
  if (!req.session.email) {
    res.redirect("/");
  } else {
    // Just send the array of objects to the browser
    res.render("posts", { title: "Post List" });
  }
});

// Get posts listing
router.get("/getAll", post.findAll);

// Sanitation middleware
router.post("/create", post.create);

module.exports = router;
