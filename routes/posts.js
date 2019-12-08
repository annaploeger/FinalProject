// Required libraries
var express = require("express");
var router = express.Router();
var post = require("../controller/posts");

// Get posts page
router.get("/", function(req, res, next) {
  // Retreiving the posts from the global var
  var authors_and_posts = req.app.get("poststore");

  // Just send the array of objects to the browser
  res.render("posts", { title: "Post List", post_list: authors_and_posts });
});

// Get posts listing
router.get("/getAll", post.findAll);

// Sanitation middleware
// See https://express-validator.github.io/docs/sanitization-chain-api.html
// And https://express-validator.github.io/docs/filter-api.html
router.post("/create", post.create);

module.exports = router;
