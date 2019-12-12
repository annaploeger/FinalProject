/**
 * Schema for MongoDB
 */
var mongoose = require("mongoose");

var schema = new mongoose.Schema({
  headline: {
    type: String,
    required: true
  },
  keywords: {
    type: String,
    required: true
  },
  textposts: {
    type: String,
    required: true
  },

  username: {
    type: String,
    required: true
  }
});

var posts = new mongoose.model("Posts", schema);

module.exports = posts;
