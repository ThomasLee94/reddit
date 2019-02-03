/* eslint-disable no-console */
const Post = require('../models/post');
const express = require('express');
const router = express.Router();

// RENDER NEW-POST PAGE
router.get('/posts/new', (req, res) => {
  res.render('new-post');
}); 

// CREATE NEW POST
router.post('/posts/new', (req,res) => {
  // Checking if user has filled all fields before posting
  if (req.body.title && req.body.url && req.body.summary) {
    // INSTANTIATE INSTANCE OF POST MODEL
    const post = new Post(req.body);
    // SAVE INSTANCE OF POST MODEL TO DB
    post.save((err, post) => res.redirect('/'));
  } else {
    res.render('create-post-error');
  }
});

// SEE INDIVIDUAL POST 
router.get('/post/:id', (req, res) => {
  // LOOK UP POST
  Post.findById(req.params.id).populate('comment').then((post) => {
    console.log(post)
    res.render('posts-show', { post });
  })
    .catch((err) => { console.log(err.message); });
});

// SUBREDDIT
router.get('/r/:subreddit', (req, res) => {
  Post.find({ subreddit: req.params.subreddit })
    .then((posts) => { res.render('post-index', { posts }); })
    .catch((err) => { console.log(err); });
});

module.exports = router; 
