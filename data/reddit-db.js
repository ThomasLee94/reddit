/* Mongoose Connection */
const mongoose = require('mongoose');
assert = require('assert');

/* Checking or mongoose connection */
const db = mongoose.connection;
db.on('connected', () => {
  console.log('Success: connected to MongoDB');
})

const url = process.env.MONGODB_URI;
mongoose.Promise = global.Promise;
mongoose.connect(
  url,
  { useNewUrlParser: true },
  function(err, db) {
    assert.equal(null, err);
    console.log('Connected successfully to database');

    // db.close(); turn on for testing
  }
);

db.on('error', console.error.bind(console, 'MongoDB connection Error:'));
mongoose.set('debug', true);

module.exports = mongoose.connection;