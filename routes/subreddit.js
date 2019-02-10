const express = require('express');
const router = express.Router();

const Post = require('../models/post');

// SUBREDDIT
router.get('/r/:subreddit', (req, res) => {
  const currentUser = req.user; 
  Post.find({ subreddit: req.params.subreddit }).lean()
    .then((posts) => { res.render('post-index', { posts, currentUser }); })
    .catch((err) => { console.log(err); });
});

module.exports = router; 
