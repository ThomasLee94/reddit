/* eslint-disable no-console */
const Post = require('../models/post');
const User = require('../models/user');
const express = require('express');
const router = express.Router();

// CUSTOM MIDDLEWARE
const checkAuth = require('../middleware/checkAuth');

// RENDER NEW-POST PAGE
router.get('/new', checkAuth, (req, res) => {
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
    post.upVotes = [];
    post.downVotes = [];
    post.voteScore = 0;
    let id
    // SAVE INSTANCE OF POST MODEL TO DB
    post
      .save()
      .then((post) => { 
        id = post._id
        return User.findById(req.user._id) 
      })
      .then((user) => {
        user.posts.unshift(post._id);
        user.save();
        // REDIRECT TO NEW POST
        res.redirect(`/posts/${id}`)
      })
      .catch((err) => {
        console.log(err.message); 
      })
  } else {
    // UNAUTHORISED
    return res.status(401);
  }
});

router.put('/:id/vote-up', checkAuth, (req, res) => {
  Post.findById(req.params.id).exec((err, post) => {
    post.upVotes.push(req.user._id);
    post.voteScore += 1;
    post.save();

    res.status(200);
  });
});

router.put('/:id/vote-down', checkAuth, (req, res) => {
  Post.findById(req.params.id).exec((err, post) => {
    post.downVotes.push(req.user._id);
    post.voteScore -= 1;
    post.save();

    res.status(200);
  });
});

// SEE INDIVIDUAL POST AND NESTED COMMENTS
router.get('/:id', checkAuth, (req, res) => {
  // LOOK UP POST
  const currentUser = req.user; 
  console.log("hello");
  Post.findById(req.params.id).populate('comments').lean()
    .then((post) => {
      res.render('posts-show', { post, currentUser });
    })
    .catch((err) => { console.log(err.message); });
});

module.exports = router; 
