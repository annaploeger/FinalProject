var MongoClient = require("mongodb").MongoClient;

// This is a singleton type structure for holding the DB connection

const dbname = "sampledb";

var state = {
  db: null
};

exports.connect = function(url, done) {
  if (state.db) return done();

  MongoClient.connect(url, function(err, client) {
    if (err) return done(err);
    // Addition: Connecting to right DB
    state.db = client.db(dbname);
    done();
  });
};

exports.get = function() {
  return state.db;
};

exports.close = function(done) {
  if (state.db) {
    state.db.close(function(err, result) {
      state.db = null;
      state.mode = null;
      done(err);
    });
  }
};
