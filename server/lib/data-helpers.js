"use strict";

// Simulates the kind of delay we see with network or filesystem operations
const simulateDelay = require("./util/simulate-delay");
const {
  ObjectId
} = require('mongodb');
// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {
    saveTweet: function(newTweet, callback) {
      db.collection("tweets").insertOne(newTweet);
      callback(null, newTweet);
      //    }); // Saves a tweet to `db`
      // saveTweet: function(newTweet, callback) {
      //   simulateDelay(() => {
      //     db.tweets.push(newTweet);
      //     callback(null, true);
      //   });
    },
    //           
    updatelikes: function(id, count, callback) {
      db.collection("tweets").update({
        _id: ObjectId(id)
      }, {
        $set: {
          count: count
        }
      })
      callback(null, true);
    },
    // Get all tweets in `db`, sorted by newest first
    // getTweets: function(callback) {
    //   simulateDelay(() => {
    //     const sortNewestFirst = (a, b) => a.created_at - b.created_at;
    //     callback(null, db.tweets.sort(sortNewestFirst));
    //   });
    // }

    getTweets: function(callback) {
      db.collection("tweets").find({}).toArray(callback);
      // getTweets: function()
    }

  }
}