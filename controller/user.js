var userService = require("../service/user");

/**
 * Function to create the user in user collection.
 */
exports.create = function(req, res, next) {
  var body = new User(req.body);
  if (!body.username) {
    res.type("json").json({
      status: false,
      message: "username is missing."
    });
    return;
  }
  if (!body.email) {
    res.type("json").json({
      status: false,
      message: "email is missing."
    });
    return;
  }

  //check whether email adddress is valid
  const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  if (!emailRegexp.test(body.email)) {
    res.type("json").json({
      status: false,
      message: "invalid email."
    });
    return;
  }

  if (!body.birthday) {
    res.type("json").json({
      status: false,
      message: "birthday is missing."
    });
    return;
  }

  if (!body.password) {
    res.type("json").json({
      status: false,
      message: "password is missing."
    });
    return;
  }

  if (!req.body.repeatPassword) {
    res.type("json").json({
      status: false,
      message: "repeat password is missing."
    });
    return;
  }

  if (!(req.body.repeatPassword === body.password)) {
    res.type("json").json({
      status: false,
      message: "confirm passwrd did not matched with password."
    });
    return;
  }

  userService.createUser(body, function(error, response) {
    if (response) {
      res.type("json").json({
        status: true,
        message: "User data created successfully."
      });
    } else if (error) {
      res.status(200).json({
        status: false,
        message: error
      });
    }
  });
};

/**
 * Function to find user from user collection.
 */
exports.find = function(req, res) {
  var query = {
    username: req.session.loggedInUser
  };
  console.log("User find: " + JSON.stringify(query));
  if (!query) {
    res.status(400).send("Bad Request");
    return;
  }
  userService.findUser(query, function(error, response) {
    if (error) {
      res.status(404).send(error);
      return;
    }
    if (response) {
      res.type("json").json({
        status: true,
        message: { username: response.username, birthday: response.birthday }
      });
      return;
    }
    if (!response) {
      res.type("json").json({
        status: false,
        message: "no user logged in yet"
      });
      return;
    }
  });
};

/**
 * Function to update the user data  by their ID.
 */
exports.updateById = function(req, res) {
  var body = req.body;

  if (!body.id) {
    res.status(400).send("Id is missing");
    return;
  }
  var updateData = body.data || {};
  userService.updateUserById(body.id, updateData, (err, response) => {
    if (response) {
      res.status(200).send(response);
    } else if (err) {
      res.status(400).send(err);
    }
  });
};

/**
 * Function to update the user data by filter condition.
 */
exports.update = function(req, res) {
  var body = req.body;
  var query = body.query;
  var data = body.data;
  var options = body.options;
  if (!query) {
    res.status(400).send("Bad request");
    return;
  }

  userService.updateUser(query, data, options, (err, response) => {
    if (response) {
      res.status(200).send(response);
    } else if (err) {
      res.status(400).send(err);
    }
  });
};

/**
 * Function to delete the user from collection.
 */
exports.delete = function(req, res) {
  var body = req.body || {};
  var query = body.query;
  if (!query) {
    res.status(400).send("Bad Request");
    return;
  }
  userService.deleteUser(query, function(error, response) {
    if (error) {
      res.status(400).send(error);
      return;
    }
    if (response) {
      if (response.n === 1 && response.ok === 1) {
        res.status(202).send(body);
      }
      if (response.n === 0 && response.ok === 1) {
        res.status(204).send({
          message: "No data found"
        });
      }
    }
  });
};

exports.authenticate = function(req, res) {
  if (!req.body.username) {
    res.type("json").json({
      status: false,
      message: "username is missing."
    });
    return;
  }
  var query = {
    username: req.body.username
  };
  if (!query) {
    res
      .type("json")
      .status(200)
      .json({
        status: false,
        message: "Bad Request."
      });
    return;
  }

  userService.findUser(query, function(error, response) {
    if (error) {
      res
        .type("json")
        .status(200)
        .json({
          status: false,
          message: error
        });
      return;
    }
    if (response) {
      var user = response;
      if (!(user.password === req.body.password)) {
        res
          .type("json")
          .status(200)
          .json({
            status: false,
            message: "Username or password is invalid."
          });
        return;
      }

      //included session code
      req.session.loggedInUser = req.body.username;
      req.session.email = user.email;

      //login session
      console.log("from login: ", req.session);
      res
        .type("json")
        .status(200)
        .json({
          status: true,
          message: "you are logged in",
          data: { username: req.body.username, email: response.email }
        });
      return;
    }
    if (!response) {
      res
        .type("json")
        .status(200)
        .json({
          status: false,
          message: "Username is invalid"
        });
    }
  });
};

//logout session
exports.logout = function(req, res) {
  req.session.destroy();
  res
    .type("json")
    .status(200)
    .json({
      status: true,
      message: "logout success"
    });
};

class User {
  constructor(userData) {
    this.username = userData.username || "";
    this.birthday = userData.birthday || "";
    this.email = userData.email || "";
    this.password = userData.password || "";
  }
}
