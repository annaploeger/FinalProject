var mongoose = require("mongoose");

// We need to difine the URL
var URL =
  process.env.URL ||
  "mongodb+srv://microblog:admin@cluster0-8c8td.mongodb.net/microblogdb?retryWrites=true&w=majority";

mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);

//Connection establishment
mongoose.connect(URL, {
  useNewUrlParser: true,
  useCreateIndex: true
});

//Models
// require('../model/user');
var db = mongoose.connection;

//We enebled the Listener
db.on("error", () => {
  console.error("Error occured in db connection");
});

db.on("open", () => {
  console.log("DB Connection established successfully");
});
