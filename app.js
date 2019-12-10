var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var bodyParser = require("body-parser");
var session = require("express-session");
//Models
require("./model/user");
require("./model/posts");

//Configs
require("./config/connection");

// Start the app itself - default
var app = express();
var urlPaths = ["posts", "profile"];
//Session
app.use(session({ secret: "Shh!", resave: true, saveUninitialized: true }));

// Configure bodyparser to handle post requests
app.use(cookieParser());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());

// view engine setup  - default
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Use logging and set settings - default
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use((req, res, next) => {
  console.log("----- appp js -----: " + JSON.stringify(req.session));
  // Check if we've already initialised a session
  if (!req.session.initialised) {
    // Initialise our variables on the session object (that's persisted across requests by the same user
    req.session.initialised = true;
    req.session.x = 1;
    req.session.score = 0;
    req.session.difficulty = "";
  }
  next();
});

// Include external files (edit as required)
var indexRouter = require("./routes/index");
var postsRouter = require("./routes/posts");
var usersRouter = require("./routes/users");

// Define routes (edit as required)
app.use("/", indexRouter);
app.use("/posts", postsRouter);
app.use("/api/users", usersRouter);

// Export app to use with www.js - default
module.exports = app;
