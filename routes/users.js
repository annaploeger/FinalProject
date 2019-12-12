var express = require("express");
var router = express.Router();
var user = require("../controller/user");

router.get("/", function(req, res, next) {
  res.send("respond with a resource");
});

/**
 * TO create the new user
 */
router.post("/create", user.create);

/**
 * TO get the single user by their username eg.email
 */
router.get("/get", user.find);

/**
 * TO check whether user is registered to login
 */
router.post("/authenticate", user.authenticate);

/**
 * TO get user data for profile
 */
router.get("/getUser", user.find);

/**
 * TO update the user data by filter condition
 */
router.put("/update", user.update);

/**
 * TO logout the user
 */
router.get("/logout", user.logout);

module.exports = router;
