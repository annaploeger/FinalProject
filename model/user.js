var mongoose = require("mongoose");

var schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  birthday: {
    type: Date,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

var user = new mongoose.model("User", schema);

module.exports = user;
