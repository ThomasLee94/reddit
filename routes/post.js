/* eslint-disable no-console */
const Post = require('../models/post');
const User = require('../models/user');
const express = require('express');

const router = express.Router();

// AUTH CUSTOM MIDDLEAWARE
const checkAuth = require('../lib/checkAuth');

// RENDER NEW-POST PAGE
router.get('/new', (req, res) => {
  const currentUser = req.user; 
  res.render('new-post', { currentUser });
}); 

// CREATE NEW POST
// ONLY USERS WHO HAVE LOGGED IN MAY POST
router.post('/new', checkAuth, (req,res) => {
  const currentUser = req.user; 
  // IF USER IS LOGGED IN AND FILLED ALL FIELDS
  if (req.body.title && req.body.url && req.body.summary && req.user) {
    // INSTANTIATE INSTANCE OF POST MODEL
    const post = new Post(req.body);
    post.author = req.user._id
    // SAVE INSTANCE OF POST MODEL TO DB
    post
      .save()
      .then((post) => { return User.findById(req.user._id) })
      .then((user) => {
        user.posts.unshift(post);
        user.save();
        // REDIRECT TO NEW POST
        res.redirect(`/posts/${post._id}`)
      })
      .catch((err) => {
        console.log(err.message); 
      })
  } else {
    // UNAUTHORISED
    return res.status(401);
  }
});

// SEE INDIVIDUAL POST AND NESTED COMMENTS
router.get('/:id', checkAuth, (req, res) => {
  // LOOK UP POST
  const currentUser = req.user; 
  console.log(currentUser)
  Post.findById(req.params.id).populate('comments').lean()
    .then((post) => {
      console.log(post)
      res.render('posts-show', { post, currentUser });
    })
    .catch((err) => { console.log(err.message); });
});

module.exports = router; 
