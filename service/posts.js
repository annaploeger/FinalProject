(function() {
  var mongoose = require("mongoose");
  var post = mongoose.model("Posts");
  /**
   * Function to execute the create query to create the posts.
   * @param {*} data post data
   * @param {*} callback callback function.
   */
  exports.createPosts = function(data, callback) {
    post.create(data).then(
      response => {
        callback(null, response);
      },
      error => {
        callback(error, null);
      }
    );
  };

  exports.findAll = function(query, callback) {
    post.find(query, callback);
  };
})();
