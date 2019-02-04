/* eslint-disable no-console */
const Post = require('../models/post');
const express = require('express');

const router = express.Router();

// RENDER NEW-POST PAGE
router.get('/new', (req, res) => {
  const currentUser = req.user; 
  res.render('new-post', { currentUser });
}); 

// CREATE NEW POST
router.post('/new', (req,res) => {
  const currentUser = req.user; 
  // IF USER IS LOGGED IN AND FILLED ALL FIELDS
  if (req.body.title && req.body.url && req.body.summary && req.user) {
    // INSTANTIATE INSTANCE OF POST MODEL
    const post = new Post(req.body);
    // SAVE INSTANCE OF POST MODEL TO DB
    post.save((err, post) => res.redirect('/', { currentUser }));
  } else {
    // UNAUTHORISED
    return res.status(401);
  }
});

// SEE INDIVIDUAL POST 
router.get('/:id', (req, res) => {
  // LOOK UP POST
  Post.findById(req.params.id).populate('comment').then((post) => {
    console.log(post)
    res.render('posts-show', { post });
  })
    .catch((err) => { console.log(err.message); });
});

module.exports = router; 
