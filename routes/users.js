var express = require("express");
var router = express.Router();
var user = require("../controller/user");

// Good validation documentation available at https://express-validator.github.io/docs/
const { sanitizeBody } = require("express-validator");

router.get("/", function(req, res, next) {
  res.send("respond with a resource");
});

/**
 * To create the New user
 */
router.post(
  "/create",
  sanitizeBody("*")
    .trim()
    .escape(),
  user.create
);

/**
 * TO get the single user by their username eg.email
 */
router.get("/user/:username", user.find);

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
router.delete("/delete", user.delete);

module.exports = router;
