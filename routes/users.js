var express = require("express");
var router = express.Router();
var user = require("../controller/user");

router.get("/", function(req, res, next) {
  res.send("respond with a resource");
});

/**
 * To create the new user
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
 * To update user data(fields) by user ID
 */
router.put("/updatebyid", user.updateById);

/**
 * To update the user data by filter condition
 */
router.put("/update", user.update);

/**
 * To delete the user by condition
 */
router.get("/logout", user.logout);

module.exports = router;
