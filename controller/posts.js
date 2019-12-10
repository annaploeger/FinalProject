var postsService = require("../service/posts");
//make js file and inclue here to check session
//checkSession(req)
//if username is not empty (return true or false)

/**
 * Function to create the post in posts collection.
 */
exports.create = function(req, res, next) {
  if (req.session.email) {
    var body = new Post(req.body);

    body["username"] = req.session.loggedInUser;

    if (!body.headline) {
      res.type("json").json({
        status: false,
        message: "headline is missing."
      });
      return;
    }
    if (!body.keywords) {
      res.type("json").json({
        status: false,
        message: "keywords are missing."
      });
      return;
    }

    if (!body.textposts) {
      res.type("json").json({
        status: false,
        message: "Your text is missing."
      });
      return;
    }

    postsService.createPosts(body, function(error, response) {
      if (response) {
        res.type("json").json({
          status: true,
          message: "Post created successfully."
        });
      } else if (error) {
        res.status(200).json({
          status: false,
          message: error
        });
      }
    });
  } else {
    res.type("json").json({
      status: false,
      message: "you are not logged in."
    });
    return;
  }
};

exports.findAll = function(req, res, next) {
  postsService.findAll({}, function(err, posts) {
    if (posts) {
      res.type("json").json({
        status: true,
        message: posts
      });
    } else {
      res.status(200).json({
        status: false,
        message: err
      });
    }
  });
};

//TODO:
// Model.find()
// Model.findById()

class Post {
  constructor(postData) {
    this.headline = postData.headline || "";
    this.keywords = postData.keywords || "";
    this.textposts = postData.textposts || "";
  }
}
